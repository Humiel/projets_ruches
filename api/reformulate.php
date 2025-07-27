<?php
header('Content-Type: application/json');
$message = trim($_POST['message'] ?? '');
echo json_encode([
  'reformulation' => "👉 Voici une reformulation : " . ucfirst(strtolower($message))
]);
?>
