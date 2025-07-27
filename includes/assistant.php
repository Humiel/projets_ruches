<?php
// includes/assistant.php
$page = basename($_SERVER['SCRIPT_NAME']);
$role = "Tu es un assistant citoyen qui aide à comprendre et améliorer la démocratie.";

if (str_contains($page, 'constitution')) {
  $role = "Tu aides à explorer, commenter et reformuler des articles de constitution.";
} elseif (str_contains($page, 'boussole')) {
  $role = "Tu aides les citoyens à comprendre leur sensibilité politique.";
} elseif (str_contains($page, 'analyseur')) {
  $role = "Tu analyses des textes pour en améliorer la clarté et la cohérence.";
} elseif (str_contains($page, 'deliberation')) {
  $role = "Tu aides les citoyens à clarifier leurs idées avant de proposer un article.";
}
?>

<!-- Bouton flottant -->
<div id="ia-assistant-toggle" style="position: fixed;
    bottom: 3.8em;
    right: 1em;
    z-index: 9999;">
  <button class="btn btn-primary-custom rounded-circle shadow"
    style="width: 2.5em; height: 2.5em; font-size: 1.5rem;">
    <i class="ri-chat-3-line"></i>
  </button>
</div>

<!-- Fenêtre de l'assistant -->
<div id="ia-assistant" class="card shadow" style="display:none;position:fixed;bottom:90px;right:20px;width:320px;max-height:70vh;z-index:9999;">
  <div class="card-header d-flex justify-content-between align-items-center">
    <strong class="text-primary">Assistant IA</strong>
    <div id="ia-spinner"></div>
    <button id="ia-close" type="button" class="btn-close btn-sm"></button>
  </div>
  <div id="ia-messages" class="card-body overflow-auto" style="font-size:0.9rem;height:200px;"></div>
  <div class="card-footer">
    <form id="ia-form">
      <input type="text" id="ia-input" class="form-control form-control-sm" placeholder="Posez une question..." required autocomplete="off">
    </form>
  </div>
</div>

<script>
  const iaToggle = document.getElementById('ia-assistant-toggle');
  const iaPanel = document.getElementById('ia-assistant');
  const iaClose = document.getElementById('ia-close');
  const iaForm = document.getElementById('ia-form');
  const iaInput = document.getElementById('ia-input');
  const iaMessages = document.getElementById('ia-messages');

  iaToggle.onclick = () => iaPanel.style.display = 'block';
  iaClose.onclick = () => iaPanel.style.display = 'none';

  iaForm.onsubmit = async (e) => {
    e.preventDefault();
    const question = iaInput.value.trim();
    if (!question) return;

    iaMessages.innerHTML += `<div><strong>Vous :</strong> ${question}</div>`;
    iaInput.value = '';
    iaMessages.scrollTop = iaMessages.scrollHeight;

    const response = await fetch('/includes/ia.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: question,
        page: '<?= $page ?>'
      })
    });

    const data = await response.json();
    iaMessages.innerHTML += `<div><strong>IA :</strong> ${data.reply}</div>`;
    iaMessages.scrollTop = iaMessages.scrollHeight;
  };
</script>