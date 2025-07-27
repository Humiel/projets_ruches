<?php
// Simulation d’un message utilisateur
$userMessage = "Je n'aime pas les racistes. Comment formuler cela sans heurter quelqu'un qui est raciste ?";
$page = $_SERVER['REQUEST_URI'] ?? 'index.php'; // ou passer une valeur à la main

// Définir le rôle en fonction de la page
$role = "Tu aides les citoyens à se situer politiquement et à ne pas s'affronter sur des idées clivantes.";

// Construire le payload
$payload = json_encode([
    "model" => "mistral",
    "messages" => [
        ["role" => "system", "content" => $role],
        ["role" => "user", "content" => $userMessage]
    ],
    "stream" => false,
    "temperature" => 0.7
]);

// Préparer la requête cURL
$ch = curl_init("http://localhost:11434/api/chat");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
    CURLOPT_POSTFIELDS => $payload
]);

// Exécuter la requête
$response = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

// Gérer les erreurs ou afficher la réponse
if ($err || !$response) {
    echo "⛔ Erreur de communication avec l'IA : " . htmlspecialchars($err);
} else {
    $data = json_decode($response, true);
    $reply = $data['message']['content'] ?? '❓ Pas de réponse.';
    echo "<strong>Réponse IA :</strong><br><br>" . nl2br(htmlspecialchars($reply));
}
?>
