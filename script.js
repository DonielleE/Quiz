 let questionsEl = document.getElementById("questions");
 let choicesEl = document.getElementById("choices")
 let answersEl = document.getElementById("answers")
 let timerEl = document.getElementById("time");
 let startButton = document.getElementById("start");
 let submitButton = document.getElementById("submit");
 let initialsEl = document.getElementById("initials");
 let feedbackEl = document.getElementById("feedback");


 let currentQuizQ = 0;
 let time = quizQuestion.length * 20;
 let timeId;

  //The startGame function is called when the start button is clicked
 function startQuiz() {
   const start = document.getElementById("start-screen");
   start.setAttribute("class","hide");
   questionsEl.removeAttribute("class");
   timeId = setInterval(startTime, 1000);
   timerEl.textContent = time;
   readQuestion();
 }
function readQuestion() {
    const question = quizQuestion[currentQuizQ];
    const titleEl = document.getElementById("question-title");
    titleEl.textContent = question.title;
    choicesEl.innerHTML = question.choices;
    // answersEl.innerHTML = question.answers;
    question.choices.forEach(function(answer, i) {
        let a = document.createElement("button");
        a.setAttribute("class","choices");
        a.setAttribute("value",answer);
        a.textContent = i + 1 + "." + answer;
        a.onclick = qClick;
        choicesEl.appendChild(a)
    })
}
function qClick() {
    if (this.value !== quizQuestion[currentQuizQ].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;  
        }
        timerEl.textContent = time;
        feedbackEl.textContent = "Maybe you should study"
    } else{
        feedbackEl.textContent = "YAY, Someone knows their stuff!!!"
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuizQ ++;
    if (currentQuizQ === quizQuestion.length) {
        completeQuiz();
    } else {
       readQuestion();
    }
}

function completeQuiz() {
    clearInterval(timeId);
    let endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    let finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute("class", "hide");
}

function startTime() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        completeQuiz();
    }
}
function highScore() {

    let initials = initialsEl.value.trim();

    if (initials !== "") {
        let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

         newScore = {
            score: time,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href="highscores.html";
    }
}
function checkForEnter(event) {

    if (event.key === "Enter") {
        highScore();
    }
}

startButton.onclick = startQuiz;
submitButton.onclick = highScore;

initialsEl.onkeyup = checkForEnter;
