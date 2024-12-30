let questions = [
  {
    question: "Wer hat HTML erfunden?",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners-Lee",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question: "Was bedeutet das HTML Tag &lt;a&gt;?",
    answer_1: "Text fett",
    answer_2: "Container",
    answer_3: "Ein Link",
    answer_4: "Kursiv",
    right_answer: 3,
  },
  {
    question: "Wie bindet man eine Website in eine Website ein?",
    answer_1: "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frame&gt; ",
    answer_2: "&lt;iframe&gt",
    answer_3: "&lt;frame&gt",
    answer_4: "&lt;frameset&gt",
    right_answer: 2,
  },
  {
    question: "Wie definiert man in Javascript eine Variable?",
    answer_1: "let 100 = rate;",
    answer_2: "100 = let rate;",
    answer_3: "rate = 100;",
    answer_4: "let rate = 100;",
    right_answer: 4,
  },
  {
    question: "Wie stellt man Text am BESTEN fett dar?",
    answer_1: "&lt;strong&gt",
    answer_2: "CSS nutzen;",
    answer_3: "&lt;bold&gt",
    answer_4: "&lt;b&gt",
    right_answer: 1,
  },
  {
    question: "Welches Attribut kann man NICHT für Textarea nutzen?",
    answer_1: "readonly",
    answer_2: "max",
    answer_3: "from",
    answer_4: "spellCheck",
    right_answer: 1,
  },
  {
    question: "Was ist der Zweck des HTML Tags &lt;div&gt;?",
    answer_1: "Fett machen",
    answer_2: "Strukturelement für Layouts",
    answer_3: "Text hervorheben",
    answer_4: "Liste erstellen",
    right_answer: 2,
  },
  {
    question: "Welches HTML-Tag wird verwendet, um ein Bild anzuzeigen?",
    answer_1: "&lt;img&gt;",
    answer_2: "&lt;image&gt;",
    answer_3: "&lt;picture&gt;",
    answer_4: "&lt;photo&gt;",
    right_answer: 1,
  },
  {
    question: "Was bedeutet das Attribut 'alt' im &lt;img&gt; Tag?",
    answer_1: "Es beschreibt das Bild",
    answer_2: "Es setzt den Titel des Bildes",
    answer_3: "Es lädt das Bild schneller",
    answer_4: "Es macht das Bild unsichtbar",
    right_answer: 1,
  },
  {
    question: "Welche Methode wird in JavaScript verwendet, um ein Element aus einem Array zu entfernen?",
    answer_1: "array.remove()",
    answer_2: "array.delete()",
    answer_3: "array.pop()",
    answer_4: "array.shift()",
    right_answer: 3,
  },
  {
    question: "Was bedeutet CSS?",
    answer_1: "Computer Style Sheets",
    answer_2: "Cascading Style Sheets",
    answer_3: "Creative Style Sheets",
    answer_4: "Color Style Sheets",
    right_answer: 2,
  },
];


let currentQuestion = 0;
let playerScore = 0;
let audioSuccess = new Audio("/assets/audio/audioRight.wav");
let audioFail = new Audio("/assets/audio/audioWrong.wav");
let audioGameFinish = new Audio("/assets/audio/audioFinishGame.wav");

function init() {
  showQuestion(); // hiermit wird die function showQuestion() aufgerufen
  showQuestionNumber();
}

function showQuestionNumber() {
  document.getElementById("all-questions").innerHTML = questions.length; // hiermit zeige ich mir die Länge des Arrays an und schreibe sie mit .innerHTML an die Stelle id = "all-questions" ins html
  document.getElementById("current-question").innerHTML = currentQuestion + 1; // hiermit zeige ich die aktuelle Zahl der Frage an
  document.getElementById("all-questions-endscreen").innerHTML =
  questions.length; // hiermit zeige ich die aktuelle Zahl der Frage im Endscreen an
  document.getElementById("player-score").innerHTML = playerScore; // hiermit zeige ich den erreichten Score an
}

function showQuestion() {
  if (gameIsOver()) {   // hiermit lager ich die bedingung in gameIsOver() aus
    audioGameFinish.play();
    showEndscreen();
  } else {
      upgrateProgressbar();
      updateToNextQuestion();
  }
}

function gameIsOver() { // Abbruchbedingung fuer das Spiel wenn currentQuestion groesser als die laenge des Arrays ist
   
  return currentQuestion >= questions.length;   // die funtkion gibt entweder true oder false aus, wenn true showEndscreen(), wenn false dann upgrateProgressbar();
                                        // updateToNextQuestion()
}

function showEndscreen() {
  document.getElementById("endScreen").style.display = "flex"; //  den Endscreen haben wir in html fest display none gegeben und setzen es jetzt auf flex
  document.getElementById("playScreen").style.display = "none"; // der Playscreen wird mit diplay none versteckt
  // document.getElementById('playScreen').style.display ="";  // so hat es junus gemacht, hat es ein nachteil von flex ?
}

function upgrateProgressbar() {
  //progressbar
  let percent = (currentQuestion + 1) / questions.length; // variable percent = beispiel 1/6 = 0.17
  percent = Math.round(percent * 100);   // hier multipliziere ich percent mit 100 und runde es mit math.round ab
  document.getElementById("progress-bar").innerHTML = `${percent} %`;  // hier gebe ich den wert percent ans html
  document.getElementById("progress-bar").style = `width: ${percent}%`;  // hier beeinflusse ich die width und somit den Fortschritt der ProgressBar
}

function updateToNextQuestion () {
  // nextQuestion
  let question = questions[currentQuestion]; // Variable question = array questions an der 0. Stelle welche ich in currentQuestion festgelegt habe.
  document.getElementById("question-text").innerHTML = question["question"]; // hiermit wird die Frage angezeigt
  document.getElementById("answer_1").innerHTML = question["answer_1"]; // hiermit wird die 1. moegliche Antwort angezeigt
  document.getElementById("answer_2").innerHTML = question["answer_2"]; // hiermit wird die 2. moegliche Antwort angezeigt
  document.getElementById("answer_3").innerHTML = question["answer_3"]; // hiermit wird die 3. moegliche Antwort angezeigt
  document.getElementById("answer_4").innerHTML = question["answer_4"]; // hiermit wird die 4. moegliche Antwort angezeigt
}

function answer(selection) {
  //beim onclick function answer() den jeweiligen parameter  'answer_1' , 'answer_2' etc und wird in selection gespeichert
  let question = questions[currentQuestion]; //in welcher Frage befinde wir uns gerade
  let selectedQuestionNumber = selection.slice(-1); //mit .slice(-1) wird der letzte Buchstabe/ Zahl vom string des parameters Selection, also z.B. answer_1 abgerufen, welchen ich im naechsten Schritt mit right_answer vergleiche
  let idOfRightAnswer = `answer_${question["right_answer"]}`; // question['right_answer'] entspricht bei Frage 1 gleich 3 , bei Frage 2 gleich 3 usw

  if (selectedQuestionNumber == question["right_answer"]) {
    // wir fragen ab ob selectedQuestionNumber right_answer entspricht
    document.getElementById(selection).parentNode.classList.add("bg-success");
    audioSuccess.play();
    playerScore++; // selection also der Parameter entspricht auch der id, da wir es so festgelegt haben und fuegen die Klasse bg-success hinzu welche den Hintergrund gruen faerbt
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger"); // bg-danger also roter hintergrund wird hinzugefuegt(noch mehr auf bootstrap)
    document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success"); // wir stellen die richtige antwort gruen dar
    audioFail.play();
  }
  document.getElementById("next-btn").disabled = false; //  nach dem eine Antwort angeklickt wurde, setze ich das attribute disabled auf false und der btn ist wieder aktiviert.
}
// .parentNode = ich fuege dem übergeordneten Container die Klasse hinzu und nicht dem Container worin die id festegelegt ist

function nextQuestion() {
  currentQuestion++; // hiermit setzen wir currentQuestion auf 1, also die naechste Frage.
  showQuestion();
  document.getElementById("next-btn").disabled = true;
}

function resetAnswerBtns() {
  for (let i = 1; i <= 4; i++) {
    let answerElement = document.getElementById(`answer_${i}`).parentNode;
    answerElement.classList.remove("bg-success", "bg-danger");

    /*document.getElementById('answer_1').parentNode.classList.remove("bg-success");
    document.getElementById('answer_1').parentNode.classList.remove("bg-danger");
    document.getElementById('answer_2').parentNode.classList.remove("bg-success");
    document.getElementById('answer_2').parentNode.classList.remove("bg-danger");
    document.getElementById('answer_3').parentNode.classList.remove("bg-success");
    document.getElementById('answer_3').parentNode.classList.remove("bg-danger");
    document.getElementById('answer_4').parentNode.classList.remove("bg-success");
    document.getElementById('answer_4').parentNode.classList.remove("bg-danger");*/

    init();
  }
}

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("playScreen").style.display = "";
}

function restartGame() {
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("playScreen").style.display = "flex";
  currentQuestion = 0;
  playerScore = 0;
  init();
}
