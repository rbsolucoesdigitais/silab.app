// ======================================================
// ELEMENTOS
// ======================================================

let microfoneAtivo = false;
const textoEl = document.getElementById("texto");
const botaoEl = document.getElementById("falar");
const pontosEl = document.getElementById("pontos");
const streakEl = document.getElementById("streak");
const micImg = document.getElementById("micImg");
const mascotEl = document.getElementById("mascot");
const cardPalavraEl = document.getElementById("card-palavra");
const resultadoEl = document.getElementById("resultado");

const frasesFeedback = [
  new Audio("/assets/sounds/frase1.ogg"),
  new Audio("/assets/sounds/frase2.ogg"),
  new Audio("/assets/sounds/frase3.ogg"),
  new Audio("/assets/sounds/frase4.ogg"),
  new Audio("/assets/sounds/frase5.ogg"),
  new Audio("/assets/sounds/frase6.ogg"),
  new Audio("/assets/sounds/frase7.ogg"),
  new Audio("/assets/sounds/frase8.ogg")
];
frasesFeedback.forEach(a => {
  a.preload = "auto";
  a.volume = 1.0;
});



// ======================================================
// ÁUDIO
// ======================================================

const audioAcerto = new Audio("/assets/sounds/success.mp3");
const audioErro = new Audio("/assets/sounds/error.mp3");
const audioCongrats = new Audio("/assets/sounds/congrats.mp3");
const audioAplause = new Audio("/assets/sounds/applauses.mp3");

audioAcerto.preload = "auto";
audioErro.preload = "auto";
audioAcerto.volume = 0.6;
audioAplause.volume = 0.3;
audioErro.volume = 0.5;


// ======================================================
// BANCO DE PALAVRAS
// ======================================================

const palavras2 = [
  ["CA","SA"], ["BO","LA"], ["ME","SA"], ["PA","TO"], ["GA","TO"],
  ["FO","GO"], ["LA","TA"], ["SA","PO"], ["PE","NA"], ["LU","A"],
  ["MA","LA"], ["PA","PA"], ["MA","TO"], ["BE","LA"], ["DA","DO"],
  ["DE","DO"], ["CO","PO"], ["CA","LO"], ["PA","NO"], ["VA","CA"],
  ["BO","I"], ["LE","ÃO"], ["CA","MA"], ["SO","FA"], ["PI","PA"],
  ["NO","VO"], ["VE","LA"], ["SI","NO"], ["BO","TA"], ["RO","DA"],
  ["CA","FE"], ["CE","DO"], ["CO","LA"], ["FA","CA"], ["FI","TA"],
  ["GA","LO"], ["GO","MA"], ["LA","ÇO"], ["LU","VA"], ["RA","TO"],
  ["ME","IA"], ["MO","LA"], ["NA","DA"], ["NE","VE"], ["PA","RA"],
  ["PE","SO"], ["PI","SO"], ["PU","LO"], ["RA","LO"], ["RE","DE"],
  ["RO","LO"], ["SA","CO"], ["SE","LO"], ["SO","LO"], ["SU","CO"],
  ["TA","ÇA"], ["TE","LA"], ["TI","PO"], ["TO","CO"], ["VA","SO"],
  ["JI","LO"], ["BA","LA"], ["BO","NE"], ["CA","BO"], ["CA","PA"],
  ["CI","PO"], ["BI","CO"], ["DO","CE"], ["FA","RO"], ["FE","IO"],
  ["FI","NO"], ["FO","FA"], ["FU","RO"], ["GE","LO"], ["GO","TA"],
  ["JA","TO"], ["JO","GO"], ["KI","WI"], ["LA","MA"], ["LA","GO"],
  ["LI","XO"], ["LO","BO"], ["LU","XO"], ["MA","IS"], ["FA","LA"],
  ["MI","LHO"], ["MO","TO"], ["MU","RO"], ["NA","TA"], ["NU","CA"],
  ["NI","NHO"], ["NO","JO"], ["NU","VEM"], ["PA","IS"], ["PE","IXE"],
  ["PI","NO"], ["PO","CO"], ["PU","RO"], ["RA","IO"], ["RE","MO"],
  ["RI","CO"], ["RO","SA"], ["RU","A"], ["SA","IA"], ["SE","CO"],
  ["SI","PO"], ["SO","PA"], ["SU","JO"], ["TA","PA"], ["TE","IA"],
  ["TI","A"], ["TO","CHA"], ["VA","LE"], ["VI","DA"], ["VO","CE"]
];

const palavras3 = [
  ["BA","NA","NA"],
  ["MA","CA","CO"],
  ["PI","PO","CA"],
  ["TO","MA","TE"],
  ["PA","NE","LA"],
  ["BO","NE","CA"],
  ["CA","VA","LO"],
  ["GA","LI","NHA"],
  ["ME","NI","NO"],
  ["ME","NI","NA"],
  ["CA","DEI","RA"],
  ["CA","MI","SA"],
  ["CO","MI","DA"],
  ["JA","NE","LA"],
  ["LA","RAN","JA"],
  ["SA","PA","TO"],
  ["MO","CHI","LA"],
  ["PI","JA","MA"],
  ["MU","SI","CA"],
  ["GI","RA","FA"],
  ["FO","GUE","TE"],
  ["BA","LEI","A"],
  ["CA","NE","CA"],
  ["BO","NI","TO"],
  ["PA","TI","NHO"],
  ["GA","VE","TA"],
  ["GA","TI","NHO"],
  ["SOR","VE","TE"],
  ["MAR","TE","LO"],
  ["TE","CLA","DO"],
  ["PA","RE","DE"],
  ["PE","LU","DO"],
  ["TI","GE","LA"],
  ["XI","CA","RA"],
  ["FOR","MI","GA"],
  ["BO","LA","CHA"],
  ["TE","SOU","RA"],
  ["TA","PE","TE"],
  ["CO","BER","TA"],
  ["CON","TRO","LE"],
  ["ES","PE","LHO"],
  ["PA","LHA","ÇO"],
  ["VES","TI","DO"],
  ["SE","CA","DOR"],
  ["MO","RAN","GO"],
  ["CA","MI","NHO"],
  ["CA","RE","TA"],
  ["ES","CO","VA"],
  ["CA","NE","TA"],
  ["BA","LAN","ÇO"],
  ["ES","CA","DA"],
  ["GE","LA","DO"],
  ["PI","RA","TA"],
  ["PRIN","CE","SA"],
  ["CAS","TE","LO"],
  ["SOL","DA","DO"],
  ["VER","ME","LHO"],
  ["PA","LA","CIO"],
  ["PLA","NE","TA"],
  ["CO","ME","TA"],
  ["FU","MA","ÇA"],
  ["PIN","TI","NHO"],
  ["CO","E","LHO"],
  ["LA","GAR","TA"],
  ["BO","TI","NA"],
  ["GE","LA","DA"],
  ["SA","CO","LA"],
  ["PER","FEI","TO"],
  ["BE","LI","NHA"],
  ["CA","BE","LO"],
  ["SA","LA","DA"],
  ["MU","LE","TA"],
  ["CE","BO","LA"], 
  ["CA","DER","NO"],
  ["BO","NE","CO"],
  ["PA","RA","DO"],
  ["RAS","PA","DO"],
  ["LAN","TER","NA"],
  ["PAN","QUE","CA"],
  ["QUE","RI","DA"],
  ["DOU","RA","DO"],
  ["FE","LI","ZES"],
  ["A","MI","GO"],
  ["A","MI","GA"],
  ["PER","DI","DO"],
  ["MA","DU","RO"],
  ["SE","GU","RO"],
  ["RA","PI","DO"],
  ["GOS","TO","SO"],
  ["SA","LI","NHA"],
  ["MA","DEI","RA"]
];




// ======================================================
// ESTADO DO JOGO
// ======================================================

let silabasAtuais = [];
let palavraAtual = "";
let ultimaPalavra = "";
let totalSilabas = 0;
let pontos = 0;
let streak = 0;

// ======================================================
// NORMALIZAÇÃO
// ======================================================

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// ======================================================
// RENDERIZAÇÃO DAS SÍLABAS
// ======================================================

function renderSilabas(silabas) {
  textoEl.innerHTML = "";

  silabas.forEach((silaba, index) => {
    const card = document.createElement("div");
    card.className = "silaba";
    card.innerText = silaba;
    textoEl.appendChild(card);

    if (index < silabas.length - 1) {
      const mais = document.createElement("div");
      mais.className = "mais";
      mais.innerText = "+";
      textoEl.appendChild(mais);
    }
  });
}

// ======================================================
// NOVA PALAVRA (SEM REPETIÇÃO)
// ======================================================

function novaPalavra() {
  esconderResultado();

  let nova;

  do {
    const usarTres = Math.random() < 0.5;
    nova = usarTres
      ? palavras3[Math.floor(Math.random() * palavras3.length)]
      : palavras2[Math.floor(Math.random() * palavras2.length)];
  } while (normalizar(nova.join("")) === ultimaPalavra);

  silabasAtuais = nova;
  totalSilabas = silabasAtuais.length;
  palavraAtual = normalizar(silabasAtuais.join(""));
  ultimaPalavra = palavraAtual;

  renderSilabas(silabasAtuais);
}

function tocarFraseAleatoria() {
  try {
    const frase =
      frasesFeedback[Math.floor(Math.random() * frasesFeedback.length)];
    frase.currentTime = 0;
    frase.play();
  } catch (e) {
    // falha silenciosa (mobile)
  }
}


// ======================================================
// FEEDBACK VISUAL DO CARD
// ======================================================

function feedbackCard(tipo) {
  cardPalavraEl.classList.remove("acerto", "erro");
  cardPalavraEl.classList.add(tipo);

  setTimeout(() => {
    cardPalavraEl.classList.remove(tipo);
  }, 500);
}

// ======================================================
// ÁUDIO
// ======================================================

function tocarAcerto() {
  try {
    audioAcerto.currentTime = 0;
    audioAcerto.play();
  } catch {}
}

function tocarCongrats() {
  try {
    audioCongrats.currentTime = 0;
    audioCongrats.play();
    audioAplause.play();
  } catch {}
}



function tocarErro() {
  try {
    audioErro.currentTime = 0;
    audioErro.play();
  } catch {}
}

// ======================================================
// MASCOTE
// ======================================================

function mascoteFeliz() {
  mascotEl.src = "/assets/img/mascot-happy.png";
  mascotEl.classList.add("feliz");

  setTimeout(() => {
    mascotEl.src = "/assets/img/mascot-normal.png";
    mascotEl.classList.remove("feliz");
  }, 1200);
}

function mascoteTriste() {
  mascotEl.src = "/assets/img/mascot-sad.png";
  mascotEl.classList.add("triste");

  setTimeout(() => {
    mascotEl.src = "/assets/img/mascot-normal.png";
    mascotEl.classList.remove("triste");
  }, 1200);
}

function mascoteParabens() {
  mascotEl.src = "/assets/img/mascot-congrats.png";
}

// ======================================================
// CONFETE
// ======================================================

function soltarConfete() {
  for (let i = 0; i < 25; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      ["#58cc02", "#ffd000", "#ff6f00", "#00c2ff"][
        Math.floor(Math.random() * 4)
      ];

    confetti.style.animationDuration =
      1.2 + Math.random() * 0.6 + "s";

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  }
}

function mostrarResultadoErro(falado) {
  resultadoEl.innerText = `Você disse: "${falado}"`;
  resultadoEl.classList.add("visivel");

  setTimeout(() => {
    resultadoEl.classList.remove("visivel");
  }, 1000);
}


function esconderResultado() {
  resultadoEl.classList.remove("visivel");
}


// ======================================================
// RELATÓRIO DOS PAIS (LOCALSTORAGE)
// ======================================================

const STORAGE_KEY = "relatorioPais";

function carregarRelatorio() {
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (salvo) return JSON.parse(salvo);

  return {
    totalTentativas: 0,
    totalAcertos: 0,
    totalErros: 0,
    palavrasVistas: 0,
    ultimaAtualizacao: null
  };
}

function salvarRelatorio() {
  relatorioPais.ultimaAtualizacao = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(relatorioPais));
}

let relatorioPais = carregarRelatorio();

function atualizarRelatorioUI() {
  document.getElementById("rep-palavras").innerText =
    relatorioPais.palavrasVistas;

  document.getElementById("rep-acertos").innerText =
    relatorioPais.totalAcertos;

  // document.getElementById("rep-erros").innerText =
    relatorioPais.totalErros;

  const aproveitamento =
    relatorioPais.totalTentativas > 0
      ? Math.round(
          (relatorioPais.totalAcertos / relatorioPais.totalTentativas) * 100
        )
      : 0;

  const el = document.getElementById("rep-aproveitamento");
  el.innerText = aproveitamento + "%";
  el.classList.add("pulse");

  setTimeout(() => el.classList.remove("pulse"), 300);
}

// ======================================================
// VERIFICAÇÃO DA RESPOSTA
// ======================================================

function verificarResposta(falado) {
  esconderResultado();

  relatorioPais.totalTentativas++;
  relatorioPais.palavrasVistas++;

  if (falado === palavraAtual) {
    relatorioPais.totalAcertos++;
    streak++;
    pontos += totalSilabas;

    feedbackCard("acerto");
    soltarConfete();

    // 🎉 a cada 10 acertos
    if (streak % 5 === 0) {
      pontos += 100;
      mascoteParabens();
      tocarFraseAleatoria();
      tocarCongrats();

    // ✅ acerto normal
    } else {
      tocarAcerto();
      mascoteFeliz();
    }

    novaPalavra();

  } else {
    relatorioPais.totalErros++;
    streak = 0;

    tocarErro();
    mascoteTriste();
    feedbackCard("erro");
    mostrarResultadoErro(falado);
  }

  salvarRelatorio(relatorioPais);
  atualizarRelatorioUI();
}

// ======================================================
// RECONHECIMENTO DE VOZ
// ======================================================

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const falado = normalizar(event.results[0][0].transcript);
    pararMicrofone();
    verificarResposta(falado);
  };

  recognition.onend = () => {
    microfoneAtivo = false;
    pararMicrofone();
  };

  recognition.onerror = () => {
    microfoneAtivo = false;
    pararMicrofone();
  };

}

// ======================================================
// MICROFONE VISUAL
// ======================================================

function iniciarMicrofone() {
  if (!recognition || microfoneAtivo) return;

  try {
    microfoneAtivo = true;

    botaoEl.classList.add("ativo");
    micImg.src = "/assets/img/sound.png";

    recognition.start();
  } catch (e) {
    microfoneAtivo = false;
  }
}


function pararMicrofone() {
  botaoEl.classList.remove("ativo");
  micImg.src = "/assets/img/phone.png";
}


// ======================================================
// EVENTOS E START
// ======================================================

botaoEl.onclick = iniciarMicrofone;

novaPalavra();
atualizarRelatorioUI();


// ======================================================
// INSTALAÇÃO PWA
// ======================================================

let deferredPrompt = null;

function pwaInstalado() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}


window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (!pwaInstalado()) {
    document.getElementById("btn-instalar")?.classList.remove("hidden");
  }
});

document.getElementById("btn-instalar")?.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;

  deferredPrompt = null;
  document.getElementById("btn-instalar").classList.add("hidden");
});

window.addEventListener("appinstalled", () => {
  document.getElementById("btn-instalar")?.classList.add("hidden");
});
