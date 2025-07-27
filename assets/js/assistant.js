document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('ia-assistant-toggle');
  const assistantBox = document.getElementById('ia-assistant');
  const closeBtn = document.getElementById('ia-close');
  const form = document.getElementById('ia-form');
  const input = document.getElementById('ia-input');
  const messages = document.getElementById('ia-messages');

  if (!toggleBtn || !assistantBox) return;

  toggleBtn.addEventListener('click', () => {
    assistantBox.style.display = 'block';
    input.focus();
  });

  closeBtn.addEventListener('click', () => {
    assistantBox.style.display = 'none';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    messages.innerHTML += `<div><strong>👤 Vous :</strong> ${question}</div>`;
    input.value = '';

    // Spinner
    const spinner = document.createElement('div');
    spinner.id = 'ia-spinner';
    spinner.innerHTML = `<strong>🤖 IA :</strong> ⏳ Je réfléchis...`;
    messages.appendChild(spinner);
    messages.scrollTop = messages.scrollHeight;

    try {
      const response = await fetch('/ia.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: question,
          page: window.location.pathname
        })
      });

      const data = await response.json();
      document.getElementById('ia-spinner')?.remove();
      messages.innerHTML += `<div><strong>🤖 IA :</strong> ${data.reply}</div>`;
    } catch (err) {
      console.error('Erreur IA :', err);
      const s = document.getElementById('ia-spinner');
      if (s) s.outerHTML = `<div><strong>🤖 IA :</strong> ❌ Erreur de connexion.</div>`;
    }

    messages.scrollTop = messages.scrollHeight;
  });
});
