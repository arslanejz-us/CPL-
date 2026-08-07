<?php
/**
 * Form submission API — accepts JSON POST and returns success/error JSON.
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request body']);
    exit;
}

$email = trim($data['Email'] ?? $data['email'] ?? '');

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'A valid email address is required']);
    exit;
}

$formType = $data['formType'] ?? 'general';
unset($data['formType']);

$logDir = dirname(__DIR__) . '/storage/form-submissions';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0755, true);
}

$entry = [
    'id' => time(),
    'formType' => $formType,
    'submittedAt' => gmdate('c'),
    'data' => $data,
];

@file_put_contents(
    $logDir . '/' . date('Y-m-d') . '.jsonl',
    json_encode($entry) . PHP_EOL,
    FILE_APPEND | LOCK_EX
);

echo json_encode([
    'success' => true,
    'message' => "Form submitted successfully! We'll get back to you soon.",
    'data' => ['id' => $entry['id']],
]);
