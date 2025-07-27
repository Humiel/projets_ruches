document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('ia-assistant-toggle');
    const panel = document.getElementById('ia-assistant');
    const close = document.getElementById('ia-close');
    const form = document.getElementById('ia-form');
    const input = document.getElementById('ia-input');
    const messages = document.getElementById('ia-messages');

    toggle.addEventListener('click', () => panel.style.display = 'block');
    close.addEventListener('click', () => panel.style.display = 'none');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const prompt = input.value.trim();
        if (!prompt) return;
        messages.innerHTML += `<div><strong>Vous :</strong> ${prompt}</div>`;
        input.value = '';
        messages.innerHTML += `<div class=\"text-muted\">Assistant : <em>... réponse en cours</em></div>`;
        const res = await fetch('/api/ia.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'prompt=' + encodeURIComponent(prompt)
        });
        const data = await res.json();
        messages.lastChild.innerHTML = `<strong>Assistant :</strong> ${data.reponse}`;
        messages.scrollTop = messages.scrollHeight;
    });
});
