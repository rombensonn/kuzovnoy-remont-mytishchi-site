<?php

declare(strict_types=1);

require __DIR__ . '/helpers.php';

bootstrap_api();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

json_response([
    'success' => true,
    'csrfToken' => $_SESSION['csrf_token'],
]);
