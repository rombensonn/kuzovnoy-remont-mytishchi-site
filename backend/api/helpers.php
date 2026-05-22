<?php

declare(strict_types=1);

function app_config(): array
{
    static $config = null;

    if ($config === null) {
        $config = require __DIR__ . '/../config/config.php';
    }

    return $config;
}

function bootstrap_api(): void
{
    $config = app_config();
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($origin !== '' && in_array($origin, $config['allowed_origins'], true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_set_cookie_params([
            'httponly' => true,
            'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
            'samesite' => 'Lax',
        ]);
        session_start();
    }
}

function json_response(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function request_json(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '', true);

    if (!is_array($data)) {
        json_response(['success' => false, 'message' => 'Некорректный JSON.'], 400);
    }

    return $data;
}

function clean_string(mixed $value, int $maxLength = 500): string
{
    $value = is_string($value) ? trim($value) : '';
    $value = preg_replace('/[[:cntrl:]]/u', '', $value) ?? '';
    return function_exists('mb_substr') ? mb_substr($value, 0, $maxLength) : substr($value, 0, $maxLength);
}

function client_ip(): string
{
    $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];

    foreach ($keys as $key) {
        $value = $_SERVER[$key] ?? '';
        if (filter_var($value, FILTER_VALIDATE_IP)) {
            return $value;
        }
    }

    return '0.0.0.0';
}

function assert_csrf(): void
{
    $header = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $sessionToken = $_SESSION['csrf_token'] ?? '';

    if ($header === '' || $sessionToken === '' || !hash_equals($sessionToken, $header)) {
        json_response(['success' => false, 'message' => 'Сессия устарела. Обновите страницу и попробуйте снова.'], 419);
    }
}

function assert_rate_limit(string $ip): void
{
    $config = app_config();
    $file = $config['storage']['rate_limit_file'];
    $limit = (int) $config['rate_limit']['max_requests'];
    $window = (int) $config['rate_limit']['window_seconds'];
    $now = time();

    $handle = fopen($file, 'c+');
    if ($handle === false) {
        json_response(['success' => false, 'message' => 'Не удалось проверить лимит заявок.'], 500);
    }

    flock($handle, LOCK_EX);
    $contents = stream_get_contents($handle);
    $state = json_decode($contents ?: '{}', true);
    $state = is_array($state) ? $state : [];

    foreach ($state as $storedIp => $item) {
        $resetAt = (int) ($item['reset_at'] ?? 0);
        if ($resetAt < $now) {
            unset($state[$storedIp]);
        }
    }

    $entry = $state[$ip] ?? ['count' => 0, 'reset_at' => $now + $window];
    if ((int) $entry['reset_at'] < $now) {
        $entry = ['count' => 0, 'reset_at' => $now + $window];
    }

    $entry['count'] = (int) $entry['count'] + 1;
    $state[$ip] = $entry;

    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, json_encode($state, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    if ($entry['count'] > $limit) {
        json_response(['success' => false, 'message' => 'Слишком много заявок. Попробуйте позже или позвоните нам.'], 429);
    }
}

function validate_lead(array $data): array
{
    $lead = [
        'name' => clean_string($data['name'] ?? '', 80),
        'phone' => clean_string($data['phone'] ?? '', 32),
        'service' => clean_string($data['service'] ?? '', 120),
        'damage' => clean_string($data['damage'] ?? '', 120),
        'message' => clean_string($data['message'] ?? '', 1200),
        'page' => clean_string($data['page'] ?? '', 500),
        'personalData' => (bool) ($data['personalData'] ?? false),
        'privacy' => (bool) ($data['privacy'] ?? false),
        'company' => clean_string($data['company'] ?? '', 120),
    ];

    $errors = [];

    if ($lead['company'] !== '') {
        $errors['company'] = 'Spam check failed.';
    }

    $nameLength = function_exists('mb_strlen') ? mb_strlen($lead['name']) : strlen($lead['name']);
    if ($nameLength < 2) {
        $errors['name'] = 'Укажите имя.';
    }

    if (!preg_match('/^\+7\d{10}$/', $lead['phone'])) {
        $errors['phone'] = 'Укажите телефон в формате +7.';
    }

    if (!$lead['personalData']) {
        $errors['personalData'] = 'Нужно согласие на обработку данных.';
    }

    if (!$lead['privacy']) {
        $errors['privacy'] = 'Нужно согласие с политикой обработки персональных данных.';
    }

    if ($errors !== []) {
        json_response(['success' => false, 'message' => 'Проверьте поля формы.', 'errors' => $errors], 422);
    }

    unset($lead['company']);
    return $lead;
}

function save_lead(array $lead): void
{
    $config = app_config();
    $file = $config['storage']['leads_file'];
    $payload = array_merge($lead, [
        'id' => bin2hex(random_bytes(8)),
        'ip' => client_ip(),
        'user_agent' => clean_string($_SERVER['HTTP_USER_AGENT'] ?? '', 300),
        'created_at' => date(DATE_ATOM),
    ]);

    $line = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . PHP_EOL;

    if (file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) {
        json_response(['success' => false, 'message' => 'Не удалось сохранить заявку.'], 500);
    }

    notify_email($payload);
    notify_telegram($payload);
}

function notify_email(array $lead): void
{
    $email = app_config()['email'];
    if (empty($email['enabled'])) {
        return;
    }

    $body = "Новая заявка с сайта\n\n"
        . "Имя: {$lead['name']}\n"
        . "Телефон: {$lead['phone']}\n"
        . "Услуга: {$lead['service']}\n"
        . "Повреждение: {$lead['damage']}\n"
        . "Комментарий: {$lead['message']}\n"
        . "Страница: {$lead['page']}\n";

    $headers = 'From: ' . $email['from'] . "\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n";

    @mail($email['to'], $email['subject'], $body, $headers);
}

function notify_telegram(array $lead): void
{
    $telegram = app_config()['telegram'];
    if (empty($telegram['enabled']) || empty($telegram['bot_token']) || empty($telegram['chat_id'])) {
        return;
    }

    $text = "Новая заявка с сайта\n"
        . "Имя: {$lead['name']}\n"
        . "Телефон: {$lead['phone']}\n"
        . "Услуга: {$lead['service']}\n"
        . "Повреждение: {$lead['damage']}\n"
        . "Комментарий: {$lead['message']}";

    $url = 'https://api.telegram.org/bot' . rawurlencode($telegram['bot_token']) . '/sendMessage';
    $payload = json_encode([
        'chat_id' => $telegram['chat_id'],
        'text' => $text,
    ], JSON_UNESCAPED_UNICODE);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 4,
        ],
    ]);

    @file_get_contents($url, false, $context);
}
