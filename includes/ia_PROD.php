<?php
$request = json_decode(file_get_contents('php://input'), true);
$userMessage = $request['user'] ?? '';
$page = $request['page'] ?? 'index.php';

$role = "Tu es un assistant citoyen.";
if (str_contains($page, 'constitution')) {
    $role = "Tu aides à comprendre les articles de constitution et leurs débats.";
} elseif (str_contains($page, 'cartes_clivages')) {
    $role = "Tu aides les citoyens à se situer politiquement.";
} elseif (str_contains($page, 'analyseur')) {
    $role = "Tu aides à améliorer la clarté et la rigueur d’un texte.";
} elseif (str_contains($page, 'deliberation')) {
    $role = "Tu aides à structurer une idée pour en faire une proposition citoyenne.";
}

$payload = json_encode([
    "model" => "nous-hermes2",
    "messages" => [
        ["role" => "system", "content" => $role],
        ["role" => "user", "content" => $userMessage]
    ],
    "stream" => false,
    "temperature" => 0.7
]);

$ch = curl_init("http://localhost:11434/api/chat");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_TIMEOUT => 60 // en cas de latence CPU
]);

$response = curl_exec($ch);
curl_close($ch);

if (!$response) {
    echo json_encode(["reply" => "⛔ Erreur de communication avec l'IA."]);
    exit;
}

$data = json_decode($response, true);
$reply = $data['message']['content'] ?? '❓ Pas de réponse.';
echo json_encode(["reply" => nl2br(htmlspecialchars($reply))]);
