// Game logic for Code Runner IA
// Works directly when opening index.html (no server required)

const QUESTIONS = [{"q": "\u00bfQu\u00e9 etiqueta HTML crea un enlace?", "choices": ["<a>", "<link>", "<href>"], "answer": 0}, {"q": "\u00bfC\u00f3mo se incluye una hoja de estilos externa?", "choices": ["<style src='x.css'>", "<link rel='stylesheet' href='x.css'>", "@import 'x.css'"], "answer": 1}, {"q": "\u00bfQu\u00e9 propiedad CSS cambia el color de fondo?", "choices": ["color", "background-color", "bg"], "answer": 1}, {"q": "\u00bfQu\u00e9 m\u00e9todo de JavaScript selecciona un elemento por id?", "choices": ["getElementById", "querySelectorAll", "#get"], "answer": 0}, {"q": "\u00bfCu\u00e1l es la extensi\u00f3n de un archivo JavaScript?", "choices": [".js", ".java", ".jsx"], "answer": 0}, {"q": "\u00bfC\u00f3mo se declara una variable en ES6?", "choices": ["var x = 1;", "let x = 1;", "int x = 1;"], "answer": 1}, {"q": "\u00bfQu\u00e9 significa HTML?", "choices": ["HyperText Markup Language", "HighText Machine Language", "Hyperlinks and Text Markup Language"], "answer": 0}, {"q": "\u00bfCu\u00e1l etiqueta crea un p\u00e1rrafo?", "choices": ["<p>", "<para>", "<text>"], "answer": 0}, {"q": "\u00bfQu\u00e9 propiedad usa flexbox para alinear items en el eje principal?", "choices": ["align-items", "justify-content", "flex-direction"], "answer": 1}, {"q": "\u00bfCu\u00e1l es la forma correcta de a\u00f1adir un comentario en JS?", "choices": ["<!-- comment -->", "// comment", "/* comment */"], "answer": 1}, {"q": "\u00bfQu\u00e9 etiqueta se utiliza para insertar una imagen en HTML?", "choices": ["<img>", "<image>", "<src>"], "answer": 0}, {"q": "\u00bfQu\u00e9 propiedad CSS ajusta el tama\u00f1o de fuente?", "choices": ["font-size", "text-size", "size"], "answer": 0}, {"q": "\u00bfQu\u00e9 significa CSS?", "choices": ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System"], "answer": 0}, {"q": "\u00bfCu\u00e1l es el evento correcto para escuchar clics en JS?", "choices": ["onclick", "addEventListener('click',...)", "onpressed"], "answer": 1}, {"q": "\u00bfQu\u00e9 palabra reservada crea una funci\u00f3n en JS?", "choices": ["func", "function", "def"], "answer": 1}, {"q": "\u00bfQu\u00e9 etiqueta HTML define la cabecera principal?", "choices": ["<head>", "<header>", "<h1>"], "answer": 2}, {"q": "\u00bfC\u00f3mo haces un enlace que abra en nueva pesta\u00f1a?", "choices": ["target='_blank'", "newtab='true'", "rel='external'"], "answer": 0}, {"q": "\u00bfQu\u00e9 propiedad CSS hace que un elemento use flexbox?", "choices": ["display:flex", "flexbox:true", "layout:flex"], "answer": 0}, {"q": "\u00bfCu\u00e1l es un buen lugar para poner scripts JS al cargar la p\u00e1gina?", "choices": ["<head>", "al final del <body>", "en comentarios"], "answer": 1}, {"q": "\u00bfQu\u00e9 m\u00e9todo convierte una cadena a n\u00famero en JS?", "choices": ["parseInt()", "toNumber()", "Numberfy()"], "answer": 0}];

const TOTAL = 10; // preguntas por partida

// UI elements
const startScreen = document.getElementById("start");
const gameScreen = document.getElementById("game");
const endScreen = document.getElementById("end");
const btnStart = document.getElementById("btnStart");
const btnRestart = document.getElementById("btnRestart");
const scoreEl = document.getElementById("score");
const qcountEl = document.getElementById("qcount");
const qText = document.getElementById("qText");
const choicesDiv = document.getElementById("choices");
const finalScoreEl = document.getElementById("finalScore");
const playerImg = document.getElementById("player");

let selected = [];
let current = 0;
let score = 0;
let playerPos = 8; // left px

btnStart.addEventListener("click", startGame);
if (btnRestart) btnRestart.addEventListener("click", () => location.reload());

function shuffle(a){ return a.sort(()=>Math.random()-0.5); }

function startGame(){
  // prepare questions
  const pool = [...QUESTIONS];
  shuffle(pool);
  selected = pool.slice(0, TOTAL);
  current = 0;
  score = 0;
  playerPos = 8;
  scoreEl.textContent = "Puntaje: 0";
  showScreen(gameScreen);
  showQuestion();
}

function showScreen(screen){
  [startScreen, gameScreen, endScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

function showQuestion(){
  if (current >= selected.length){ finishGame(); return; }
  const q = selected[current];
  qText.textContent = q.q;
  qcountEl.textContent = `Pregunta: ${current+1}/${selected.length}`;
  // render choices
  choicesDiv.innerHTML = "";
  q.choices.forEach((c,i)=>{
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = c;
    b.onclick = ()=> handleAnswer(i, b);
    choicesDiv.appendChild(b);
  });
}

function handleAnswer(i, btn){
  const q = selected[current];
  const correct = q.answer === i;
  const buttons = document.querySelectorAll(".choice");
  buttons.forEach((b,idx)=>{
    b.disabled = true;
    if (idx === q.answer) b.classList.add("correct");
    else if (idx === i) b.classList.add("wrong");
  });
  if (correct){
    score += 10;
    // advance player visually
    playerPos += Math.round((document.getElementById('track').clientWidth - 100) / TOTAL);
    playerImg.style.left = playerPos + "px";
  } else {
    // move back a bit
    playerPos = Math.max(8, playerPos - 40);
    playerImg.style.left = playerPos + "px";
  }
  scoreEl.textContent = "Puntaje: " + score;
  current++;
  setTimeout(showQuestion, 800);
}

function finishGame(){
  showScreen(endScreen);
  finalScoreEl.textContent = `Puntaje final: ${score} / ${TOTAL*10}`;
}

// if user opens directly, make sure track width is stable on load
window.addEventListener('resize', ()=>{ /* no-op for now */ });
