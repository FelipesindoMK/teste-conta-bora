/* =========================================================
   RADAR SKY — SKILLIU
   Dados fiéis ao questionário original (não alterar textos)
   ========================================================= */

const DIMENSIONS = [
  {
    id: 1,
    title: 'Visão e Planejamento Estratégico',
    short: 'Visão',
    icon: 'fa-compass',
    questions: [
      'A instituição possui um plano estratégico de educação tecnológica documentado, com metas claras, indicadores de sucesso e orçamento definido, que seja conhecido por toda a comunidade escolar?',
      'De que forma a liderança escolar promove e apoia ativamente a inovação e o uso de tecnologias digitais como parte integral do projeto político-pedagógico?',
    ],
  },
  {
    id: 2,
    title: 'Infraestrutura e Recursos Digitais',
    short: 'Infraestrutura',
    icon: 'fa-wifi',
    questions: [
      'A infraestrutura de conectividade da escola é suficiente para garantir o uso pedagógico consistente e simultâneo por alunos e professores?',
      'A escola garante acesso equitativo a dispositivos tecnológicos para todos os alunos, incluindo aqueles com necessidades educacionais especiais?',
    ],
  },
  {
    id: 3,
    title: 'Formação Docente e Desenvolvimento Profissional',
    short: 'Formação',
    icon: 'fa-chalkboard-user',
    questions: [
      'A instituição oferece um programa de formação continuada para os professores sobre aplicação pedagógica de tecnologias?',
      'Existem espaços dedicados à colaboração e troca de experiências entre professores sobre uso de tecnologias educacionais?',
    ],
  },
  {
    id: 4,
    title: 'Currículo e Práticas Pedagógicas',
    short: 'Currículo',
    icon: 'fa-book-open',
    questions: [
      'De que maneira o currículo contempla o desenvolvimento de competências digitais como pensamento computacional e letramento midiático?',
      'As práticas pedagógicas incluem atividades que promovam autoria, colaboração, pesquisa e resolução de problemas?',
    ],
  },
  {
    id: 5,
    title: 'Cultura Digital, Cidadania e Ética',
    short: 'Cultura Digital',
    icon: 'fa-globe',
    questions: [
      'A escola desenvolve ações sistemáticas para formação de cidadania digital crítica abordando segurança online e privacidade?',
      'Como a instituição avalia e monitora o desenvolvimento das competências digitais dos alunos?',
    ],
  },
  {
    id: 6,
    title: 'STEAM e Robótica Educacional',
    short: 'STEAM',
    icon: 'fa-robot',
    questions: [
      'A instituição oferece programas estruturados de robótica educacional e atividades STEAM (Ciência, Tecnologia, Engenharia, Artes e Matemática) integradas ao currículo?',
      'Existem espaços dedicados (laboratórios, maker spaces) e recursos (kits de robótica, impressoras 3D) disponíveis para desenvolvimento de projetos STEAM?',
    ],
  },
];

const SCALE_OPTIONS = [
  { value: 1, label: 'Não iniciado', description: 'Nenhuma ação nesta área' },
  { value: 2, label: 'Em desenvolvimento', description: 'Iniciativas pontuais' },
  { value: 3, label: 'Implementado', description: 'Ações estruturadas' },
  { value: 4, label: 'Consolidado', description: 'Prática sistemática' },
  { value: 5, label: 'Avançado', description: 'Excelência e inovação' },
];

const WHATSAPP_NUMERO = '5518996769040';
const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbySiubEg6zcudk7E1SmYiielyDgtiZTupjqrkO4jXlnds48bS5mkv40KVCTxzFs0S8n/exec';

/* Envia dados pro Apps Script sem bloquear a interface (fire-and-forget).
   mode:'no-cors' é necessário pq o Apps Script não devolve cabeçalhos CORS;
   isso significa que não conseguimos ler a resposta, só confiar que foi enviada. */
function enviarParaAppsScript(payload) {
  return fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error('Falha ao enviar para o Apps Script:', err);
  });
}

const state = {
  currentDimIndex: 0,
  responses: {}, // { questionId: value }
  cadastro: null,
};

/* ---------------- Helpers de tela ---------------- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach((el) => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateNavForScreen(id);
}

function updateNavForScreen(id) {
  const btnComecarNav = document.getElementById('btnAbrirCadastroNav');
  const btnCancelarNav = document.getElementById('btnCancelarNav');
  const btnHomeNav = document.getElementById('btnHomeNav');

  if (id === 'screen-hero') {
    btnComecarNav.classList.remove('nav-hidden');
    btnCancelarNav.classList.add('nav-hidden');
    btnHomeNav.classList.add('nav-hidden');
  } else if (id === 'screen-aguarde-email') {
    btnComecarNav.classList.add('nav-hidden');
    btnCancelarNav.classList.remove('nav-hidden');
    btnHomeNav.classList.add('nav-hidden');
  } else {
    btnComecarNav.classList.add('nav-hidden');
    btnCancelarNav.classList.remove('nav-hidden');
    btnHomeNav.classList.remove('nav-hidden');
  }
}

/* =========================================================
   MODAL DE CADASTRO
   ========================================================= */
const modalOverlay = document.getElementById('modalOverlay');
const formCadastro = document.getElementById('formCadastro');

function openModal() {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('btnIniciarHero').addEventListener('click', openModal);
document.getElementById('btnAbrirCadastroNav').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

/* ---------------- Modais de Termos de Uso / Política de Privacidade ---------------- */
function setupLegalModal(overlayId, closeId) {
  const overlay = document.getElementById(overlayId);
  const closeBtn = document.getElementById(closeId);
  const open = () => overlay.classList.add('open');
  const close = () => overlay.classList.remove('open');
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  return open;
}

const abrirModalTermos = setupLegalModal('legalModalTermos', 'legalModalTermosClose');
const abrirModalPrivacidade = setupLegalModal('legalModalPrivacidade', 'legalModalPrivacidadeClose');

document.getElementById('linkAbrirTermos').addEventListener('click', (e) => {
  e.preventDefault();
  abrirModalTermos();
});
document.getElementById('linkAbrirPrivacidade').addEventListener('click', (e) => {
  e.preventDefault();
  abrirModalPrivacidade();
});

/* Máscara de WhatsApp: (00) 00000-0000 */
const inputWhatsapp = document.getElementById('inputWhatsapp');
inputWhatsapp.addEventListener('input', () => {
  let v = inputWhatsapp.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 6) {
    v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
  } else if (v.length > 2) {
    v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  } else if (v.length > 0) {
    v = v.replace(/^(\d{0,2})/, '($1');
  }
  inputWhatsapp.value = v.trim();
});

function setFieldError(inputEl, errorEl, message) {
  if (message) {
    inputEl.classList.add('invalid');
    errorEl.textContent = message;
    errorEl.classList.add('show');
  } else {
    inputEl.classList.remove('invalid');
    errorEl.textContent = '';
    errorEl.classList.remove('show');
  }
}

function validarCadastro() {
  let valido = true;

  const nomeEl = document.getElementById('inputNome');
  const nome = nomeEl.value.trim();
  if (nome.length < 3 || !nome.includes(' ')) {
    setFieldError(nomeEl, document.getElementById('erroNome'), 'Informe seu nome completo.');
    valido = false;
  } else {
    setFieldError(nomeEl, document.getElementById('erroNome'), '');
  }

  const instituicaoEl = document.getElementById('inputInstituicao');
  const instituicao = instituicaoEl.value.trim();
  if (instituicao.length < 2) {
    setFieldError(instituicaoEl, document.getElementById('erroInstituicao'), 'Informe o nome da instituição/escola.');
    valido = false;
  } else {
    setFieldError(instituicaoEl, document.getElementById('erroInstituicao'), '');
  }

  const emailEl = document.getElementById('inputEmail');
  const email = emailEl.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setFieldError(emailEl, document.getElementById('erroEmail'), 'Informe um e-mail válido.');
    valido = false;
  } else {
    setFieldError(emailEl, document.getElementById('erroEmail'), '');
  }

  const profissaoEl = document.getElementById('inputProfissao');
  if (!profissaoEl.value) {
    setFieldError(profissaoEl, document.getElementById('erroProfissao'), 'Selecione uma opção.');
    valido = false;
  } else {
    setFieldError(profissaoEl, document.getElementById('erroProfissao'), '');
  }

  const whatsappDigits = inputWhatsapp.value.replace(/\D/g, '');
  if (whatsappDigits.length < 10) {
    setFieldError(inputWhatsapp, document.getElementById('erroWhatsapp'), 'Informe um WhatsApp válido com DDD.');
    valido = false;
  } else {
    setFieldError(inputWhatsapp, document.getElementById('erroWhatsapp'), '');
  }

  const privacidadeEl = document.getElementById('inputPrivacidade');
  const erroPrivacidade = document.getElementById('erroPrivacidade');
  if (!privacidadeEl.checked) {
    erroPrivacidade.textContent = 'É necessário aceitar a Política de Privacidade para continuar.';
    erroPrivacidade.classList.add('show');
    valido = false;
  } else {
    erroPrivacidade.textContent = '';
    erroPrivacidade.classList.remove('show');
  }

  return valido;
}

formCadastro.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validarCadastro()) return;

  state.cadastro = {
    nome: document.getElementById('inputNome').value.trim(),
    instituicao: document.getElementById('inputInstituicao').value.trim(),
    email: document.getElementById('inputEmail').value.trim(),
    profissao: document.getElementById('inputProfissao').value,
    whatsapp: inputWhatsapp.value.trim(),
  };

  // Início de um novo diagnóstico: zera progresso anterior
  state.currentDimIndex = 0;
  state.responses = {};

  enviarParaAppsScript({
    acao: 'cadastro',
    nome: state.cadastro.nome,
    instituicao: state.cadastro.instituicao,
    email: state.cadastro.email,
    profissao: state.cadastro.profissao,
    whatsapp: state.cadastro.whatsapp,
    aceitePrivacidade: true,
  });

  document.getElementById('nomeUsuarioEmail').textContent = state.cadastro.nome.split(' ')[0];
  document.getElementById('emailUsuarioEmail').textContent = state.cadastro.email;

  closeModal();
  showScreen('screen-aguarde-email');
});

/* ---------------- Navegação do topo (logo / cancelar / home) ---------------- */
document.getElementById('btnLogoHome').addEventListener('click', () => {
  showScreen('screen-hero');
});

document.getElementById('btnHomeNav').addEventListener('click', () => {
  // Volta pra tela de início do diagnóstico, mantendo as respostas já dadas
  showScreen('screen-radar-intro');
});

document.getElementById('btnCancelarNav').addEventListener('click', () => {
  const confirmar = window.confirm('Deseja cancelar esta avaliação? Suas respostas serão perdidas.');
  if (!confirmar) return;
  state.currentDimIndex = 0;
  state.responses = {};
  showScreen('screen-hero');
});

/* =========================================================
   QUESTIONÁRIO
   ========================================================= */
const questionsContainer = document.getElementById('questionsContainer');
const btnAnterior = document.getElementById('btnAnterior');
const btnProximo = document.getElementById('btnProximo');
const TOTAL_QUESTOES = DIMENSIONS.length * 2;

document.getElementById('btnIniciarQuiz').addEventListener('click', () => {
  showScreen('screen-quiz');
  renderDimension();
});

function questionId(dimIndex, qIndex) {
  return dimIndex * 2 + qIndex;
}

function renderDimension() {
  const dim = DIMENSIONS[state.currentDimIndex];
  document.getElementById('dimAtualNum').textContent = state.currentDimIndex + 1;
  document.getElementById('dimTitulo').textContent = dim.title;

  questionsContainer.innerHTML = '';

  dim.questions.forEach((questionText, qIndex) => {
    const qId = questionId(state.currentDimIndex, qIndex);

    const block = document.createElement('div');
    block.className = 'question-block';

    const textRow = document.createElement('div');
    textRow.className = 'question-text';
    textRow.innerHTML = `
      <span class="question-number">${qId + 1}</span>
      <p>${questionText}</p>
    `;
    block.appendChild(textRow);

    const optionsWrap = document.createElement('div');
    optionsWrap.className = 'scale-options';

    SCALE_OPTIONS.forEach((opt) => {
      const label = document.createElement('label');
      label.className = 'scale-option';
      if (state.responses[qId] === opt.value) label.classList.add('selected');

      label.innerHTML = `
        <input type="radio" name="q${qId}" value="${opt.value}" ${state.responses[qId] === opt.value ? 'checked' : ''}>
        <span class="radio-circle"></span>
        <span class="scale-option-text">
          <span class="opt-label">${opt.label}</span>
          <span class="opt-desc">${opt.description}</span>
        </span>
      `;

      label.querySelector('input').addEventListener('change', () => {
        state.responses[qId] = opt.value;
        optionsWrap.querySelectorAll('.scale-option').forEach((o) => o.classList.remove('selected'));
        label.classList.add('selected');
        updateProgress();
        updateNavButtons();
      });

      optionsWrap.appendChild(label);
    });

    block.appendChild(optionsWrap);
    questionsContainer.appendChild(block);
  });

  updateProgress();
  updateNavButtons();
}

function updateProgress() {
  const answered = Object.keys(state.responses).length;
  const pct = (answered / TOTAL_QUESTOES) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressoTexto').textContent = `${answered} de ${TOTAL_QUESTOES} respondidas`;
}

function isDimensionComplete(dimIndex) {
  return [0, 1].every((qIndex) => state.responses[questionId(dimIndex, qIndex)] !== undefined);
}

function updateNavButtons() {
  btnAnterior.disabled = state.currentDimIndex === 0;
  btnProximo.disabled = !isDimensionComplete(state.currentDimIndex);
  btnProximo.innerHTML =
    state.currentDimIndex === DIMENSIONS.length - 1
      ? 'Finalizar <i class="fa-solid fa-check"></i>'
      : 'Próximo <i class="fa-solid fa-arrow-right"></i>';
}

btnAnterior.addEventListener('click', () => {
  if (state.currentDimIndex > 0) {
    state.currentDimIndex -= 1;
    renderDimension();
  }
});

btnProximo.addEventListener('click', () => {
  if (!isDimensionComplete(state.currentDimIndex)) return;

  if (state.currentDimIndex < DIMENSIONS.length - 1) {
    state.currentDimIndex += 1;
    renderDimension();
  } else {
    finalizarAvaliacao();
  }
});

/* =========================================================
   CÁLCULO DE RESULTADOS
   ========================================================= */
function calcularDimensoes() {
  return DIMENSIONS.map((dim, idx) => {
    const q1 = state.responses[questionId(idx, 0)] || 0;
    const q2 = state.responses[questionId(idx, 1)] || 0;
    const score = Math.round(((q1 + q2) / 10) * 100);
    let level;
    if (score >= 80) level = 'high';
    else if (score >= 60) level = 'medium';
    else level = 'low';
    return { ...dim, score, level };
  });
}

function nivelGeral(score) {
  if (score >= 80) return { label: 'Avançado', badge: 'high' };
  if (score >= 60) return { label: 'Consolidado', badge: 'medium' };
  if (score >= 40) return { label: 'Em Desenvolvimento', badge: 'developing' };
  return { label: 'Iniciante', badge: 'low' };
}

const BADGE_LABEL = {
  high: 'Avançado',
  medium: 'Consolidado',
  developing: 'Em Desenvolvimento',
  low: 'Iniciante',
};

function finalizarAvaliacao() {
  const dimensionScores = calcularDimensoes();
  const overallScore = Math.round(dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length);
  const nivel = nivelGeral(overallScore);

  document.getElementById('resultsSchoolName').textContent = state.cadastro
    ? `${state.cadastro.instituicao} · ${state.cadastro.nome}`
    : '';
  document.getElementById('scoreGeral').textContent = overallScore + '%';
  document.getElementById('scoreNivel').textContent = nivel.label;
  document.getElementById('scoreBarFill').style.width = overallScore + '%';
  document.getElementById('scoreDescricao').textContent =
    `Sua instituição está em um nível ${nivel.label.toLowerCase()} de maturidade em educação tecnológica.`;

  renderRadarChart(dimensionScores);
  renderDimensionsSummary(dimensionScores);

  if (state.cadastro && state.cadastro.email) {
    const respostasEmOrdem = [];
    for (let i = 0; i < TOTAL_QUESTOES; i++) {
      respostasEmOrdem.push(state.responses[i] || 0);
    }
    enviarParaAppsScript({
      acao: 'conclusao',
      email: state.cadastro.email,
      respostas: respostasEmOrdem,
    });
  }

  showScreen('screen-results');
}

/* =========================================================
   GRÁFICO RADAR (SVG, sem dependências externas)
   ========================================================= */
function renderRadarChart(dimensionScores) {
  const size = 520;
  const center = size / 2;
  const maxRadius = size / 2 - 130;
  const levels = [20, 40, 60, 80, 100];
  const axisCount = dimensionScores.length;

  function pointFor(index, value) {
    const angle = (Math.PI * 2 * index) / axisCount - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  }

  let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;

  // grades (anéis)
  levels.forEach((lvl) => {
    const pts = dimensionScores.map((_, i) => {
      const p = pointFor(i, lvl);
      return `${p.x},${p.y}`;
    });
    svg += `<polygon points="${pts.join(' ')}" fill="none" stroke="#e2e8f0" stroke-width="1" />`;
  });

  // eixos + labels (quebrados em linhas para não estourar a borda do SVG)
  dimensionScores.forEach((dim, i) => {
    const p = pointFor(i, 100);
    const labelP = pointFor(i, 122);
    svg += `<line x1="${center}" y1="${center}" x2="${p.x}" y2="${p.y}" stroke="#e2e8f0" stroke-width="1" />`;

    let anchor = 'middle';
    if (labelP.x > center + 12) anchor = 'start';
    else if (labelP.x < center - 12) anchor = 'end';

    const words = dim.short.split(' ');
    let textEl = `<text x="${labelP.x}" y="${labelP.y}" text-anchor="${anchor}" font-size="14" font-weight="700" fill="#1e3d6e" font-family="Nunito, sans-serif">`;
    words.forEach((word, wIdx) => {
      const dy = wIdx === 0 ? (words.length > 1 ? '-0.25em' : '0.32em') : '1.15em';
      textEl += `<tspan x="${labelP.x}" dy="${dy}">${word}</tspan>`;
    });
    textEl += '</text>';
    svg += textEl;
  });

  // polígono de dados
  const dataPts = dimensionScores.map((dim, i) => {
    const p = pointFor(i, dim.score);
    return `${p.x},${p.y}`;
  });
  svg += `<polygon points="${dataPts.join(' ')}" fill="#32a557" fill-opacity="0.22" stroke="#32a557" stroke-width="2.5" />`;

  // pontos
  dimensionScores.forEach((dim, i) => {
    const p = pointFor(i, dim.score);
    svg += `<circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#28904a" stroke="#ffffff" stroke-width="2" />`;
  });

  svg += '</svg>';

  document.getElementById('radarChartWrap').innerHTML = svg;
}

/* =========================================================
   RESUMO DAS DIMENSÕES
   ========================================================= */
function renderDimensionsSummary(dimensionScores) {
  const wrap = document.getElementById('dimensionsSummary');
  wrap.innerHTML = '';

  dimensionScores.forEach((dim) => {
    const row = document.createElement('div');
    row.className = 'dim-row';
    row.innerHTML = `
      <div class="dim-row-top">
        <div class="dim-row-left">
          <span class="dim-icon"><i class="fa-solid ${dim.icon}"></i></span>
          <div>
            <div class="dim-name">${dim.title}</div>
            <div class="dim-score">Pontuação: ${dim.score}%</div>
          </div>
        </div>
        <span class="dim-badge ${dim.level}">${BADGE_LABEL[dim.level]}</span>
      </div>
      <div class="dim-bar-track">
        <div class="dim-bar-fill" style="width:${dim.score}%"></div>
      </div>
    `;
    wrap.appendChild(row);
  });
}

/* =========================================================
   AÇÕES FINAIS
   ========================================================= */
document.getElementById('btnReiniciar').addEventListener('click', () => {
  state.currentDimIndex = 0;
  state.responses = {};
  showScreen('screen-hero');
});

document.getElementById('btnConsultoria').addEventListener('click', () => {
  const c = state.cadastro;
  const texto = encodeURIComponent(
    c
      ? `Olá! Sou ${c.nome} (${c.email}) da ${c.instituicao} e concluí o Diagnóstico Radar Sky. Gostaria de saber mais sobre consultoria.`
      : 'Olá! Concluí o Diagnóstico Radar Sky. Gostaria de saber mais sobre consultoria.'
  );
  window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`, '_blank');
});

/* =========================================================
   LINK MÁGICO — retorno do e-mail de confirmação
   Se a URL tiver ?confirmado=1&email=..., pula direto pra
   tela de início do diagnóstico, sem passar pelo modal.
   ========================================================= */
function lerLinkMagico() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('confirmado') !== '1') return;

  const email = params.get('email') || '';
  if (!email) return;

  state.cadastro = {
    nome: params.get('nome') || '',
    instituicao: params.get('instituicao') || '',
    email: email,
    profissao: params.get('profissao') || '',
    whatsapp: params.get('whatsapp') || '',
  };

  const primeiroNome = state.cadastro.nome.split(' ')[0] || 'educador(a)';
  document.getElementById('nomeUsuarioIntro').textContent = primeiroNome;

  showScreen('screen-radar-intro');
}

lerLinkMagico();