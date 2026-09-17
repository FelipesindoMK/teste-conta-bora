const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzhCaGT_625m5JlQ3hdb3Bb9O1LFpJ_X8wNZPc2yNTJzgCN53W5MywujOWEEOjHIeXe/exec';

function mostrarTela(id) {
  document.querySelectorAll('section').forEach(s => s.hidden = true);
  document.getElementById(id).hidden = false;
}

/* ---------- Ao carregar a página: confere se veio do link do e-mail ---------- */
const params = new URLSearchParams(window.location.search);
const confirmado = params.get('confirmado');

if (confirmado === '1') {
  const nome = params.get('nome') || '';
  const email = params.get('email') || '';
  document.getElementById('resumoConfirmado').textContent =
    `Olá, ${nome.split(' ')[0] || 'educador(a)'}! Confirmando o teste pro e-mail ${email}.`;
  mostrarTela('screen-perguntas');

  // guarda o e-mail pra usar na hora de finalizar
  window.__emailTeste = email;
} else {
  mostrarTela('screen-cadastro');
}

/* ---------- Envio do cadastro ---------- */
document.getElementById('btnEnviar').addEventListener('click', () => {
  const nome = document.getElementById('inputNome').value.trim();
  const email = document.getElementById('inputEmail').value.trim();
  const instituicao = document.getElementById('inputInstituicao').value.trim();
  const profissao = document.getElementById('inputProfissao').value.trim();
  const whatsapp = document.getElementById('inputWhatsapp').value.trim();
  const aceite = document.getElementById('inputPrivacidade').checked;
  const erroEl = document.getElementById('erroForm');

  if (!nome || !email || !instituicao) {
    erroEl.textContent = 'Preenche pelo menos nome, e-mail e instituição.';
    return;
  }
  if (!aceite) {
    erroEl.textContent = 'Marca a caixinha de aceite pra continuar.';
    return;
  }
  erroEl.textContent = '';

  const btn = document.getElementById('btnEnviar');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
      acao: 'cadastro',
      nome, email, instituicao, profissao, whatsapp,
      aceitePrivacidade: aceite
    })
  })
    .then(() => mostrarTela('screen-aguardando'))
    .catch(() => {
      erroEl.textContent = 'Erro ao enviar — confere a URL do Apps Script.';
      btn.disabled = false;
      btn.textContent = 'Enviar cadastro de teste';
    });
});

/* ---------- Envio das respostas (conclusão) ---------- */
document.getElementById('btnFinalizar').addEventListener('click', () => {
  const p1 = document.querySelector('input[name="p1"]:checked');
  const p2 = document.querySelector('input[name="p2"]:checked');
  const erroEl = document.getElementById('erroPerguntas');

  if (!p1 || !p2) {
    erroEl.textContent = 'Responde as duas perguntas.';
    return;
  }
  erroEl.textContent = '';

  const btn = document.getElementById('btnFinalizar');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
      acao: 'conclusao',
      email: window.__emailTeste,
      respostas: [Number(p1.value), Number(p2.value)]
    })
  })
    .then(() => mostrarTela('screen-concluido'))
    .catch(() => {
      erroEl.textContent = 'Erro ao salvar — confere a URL do Apps Script.';
      btn.disabled = false;
      btn.textContent = 'Finalizar teste';
    });
});
