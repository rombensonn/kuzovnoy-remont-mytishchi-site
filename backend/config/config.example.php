<?php

return [
    'site_name' => 'Кузовной ремонт',
    'allowed_origins' => [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
    ],
    'storage' => [
        'leads_file' => __DIR__ . '/../storage/leads.jsonl',
        'rate_limit_file' => __DIR__ . '/../storage/rate-limit.json',
    ],
    'rate_limit' => [
        'max_requests' => 5,
        'window_seconds' => 900,
    ],
    'email' => [
        'enabled' => false,
        'to' => 'owner@example.ru',
        'from' => 'no-reply@example.ru',
        'subject' => 'Новая заявка с сайта кузовного ремонта',
    ],
    'telegram' => [
        'enabled' => false,
        'bot_token' => '',
        'chat_id' => '',
    ],
];
