<?php

declare(strict_types=1);

require __DIR__ . '/helpers.php';

bootstrap_api();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

assert_csrf();
assert_rate_limit(client_ip());

$lead = validate_lead(request_json());
save_lead($lead);

json_response([
    'success' => true,
    'message' => 'Заявка принята. Мы свяжемся с вами для уточнения деталей.',
]);
