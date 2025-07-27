<?php
header('Content-Type: application/json');
$prompt = $_POST['prompt'] ?? '';
if (!$prompt) exit(json_encode(['reponse' => '❌ Aucun texte fourni.']));

$response = file_get_contents("http://localhost:11434/api/generate", false, stream_context_create([
  'http' => [
    'method' => 'POST',
    'header' => 'Content-type: application/json',
    'content' => json_encode([
      'model' => 'mistral',
      'prompt' => $prompt
    ])
  ]
]));

$data = json_decode($response, true);
echo json_encode(['reponse' => $data['response'] ?? '❌ Erreur lors de la réponse.']);
