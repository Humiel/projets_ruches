<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$prompt_user = $input['prompt'] ?? '';

if (!$prompt_user) {
  echo json_encode(['reply' => '❌ Aucune question transmise.']);
  exit;
}

// Prompt global à envoyer
$prompt = <<<PROMPT
Tu es un assistant citoyen intégré à un site de co-écriture constitutionnelle.
Sois clair, synthétique et pédagogique. Réponds à cette question :

Utilisateur : $prompt_user
PROMPT;

// Appel à /api/generate
$response = file_get_contents("http://localhost:11434/api/generate", false, stream_context_create([
  'http' => [
    'method' => 'POST',
    'header' => "Content-Type: application/json",
    'content' => json_encode([
      'model' => 'tinyllama',
      'prompt' => $prompt
    ])
  ]
]));

$data = json_decode($response, true);
$reply = $data['response'] ?? '❌ Erreur dans la réponse.';

echo json_encode(['reply' => $reply]);
