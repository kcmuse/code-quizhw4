// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// TODO: Timer to start upper right hand corner of the page counting down
// WHEN I answer a question
// THEN I am presented with another question
// TODO: when a question is answered another question needs to pop up
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// TODO: remove time for incorret answers
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score
// TODO: score tracker, where players input initials and the score is tracked
var quizBox = document.getElementById("quiz");
var highScores = document.querySelector(".highscores");
var timer = document.querySelector(".timer");
var startBtn = document.querySelector(".start-btn");
var answerButton = document.querySelector(".answerButtons");
var saveScore = document.querySelector(".saveScore");
var submit = document.querySelector(`.submit`);
var highScoreBox = document.querySelector(`.highScore`);
var tryAgain = document.querySelector(`.tryagain`);
var initials = document.getElementById('initials');
var score = 0;
var index = 0;
var scores = [];
var saved = [];
var timeInterval;
var timeLeft;
// Timer to start the countdown once the start button is hit
function theTimer() {
    timeInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0 || index === theQuestions.length) {
            clearInterval(timeInterval);
            showScore();
        }
    }, 1000);
}

// creating the function to start the quiz
function startQuiz() {
    timeLeft = 75;
    theTimer();
    questions();
};

startBtn.addEventListener("click", startQuiz);
// This will show the players score once the final question is answered or the time reaches 0
function showScore() {
    quizBox.innerHTML = "<h1>Congratulations! Your Score was " + score + "</h1>";
    if (answerButton.style.display !== `none`){
        answerButton.style.display = `none`;
    } 
    if(saveScore.style.display !== `none`){
        saveScore.style.display = `block`;
    }
    var savedInitials = initials.value.trim();
    var userScore = {
        score: score,
        user: savedInitials
    }
    window.localStorage.setItem(`scores`, JSON.stringify(userScore));

    var allScores = JSON.parse(window.localStorage.getItem(`scores`))|| [];
    console.log(allScores)
    allScores.push(saved)

    // for (var i = 0; i < allScores.length; i++){
    //     var li = document.createElement("li")
    //     li.textContent = allScores.user + ":" + allScores.score
    //     document.getElementsById("savedscores").append(li)
    //     console.log(li)
    // }

//    console.log(allScores)



} 

submit.addEventListener(`click`, function(event){
    event.preventDefault();
    quizBox.innerHTML = ``;
    if(saveScore.style.display !== `none`){
        saveScore.style.display = `none`;
    }
    if(highScoreBox.style.display !== `none`){
        highScoreBox.style.display = `block`;
    }
    // showScore();
})



// function to generate the questions and answers from the questions array
function questions() {
    quizBox.innerHTML = "<h1>" + theQuestions[index].question + "</h1>";
    for (var i = 0; i < theQuestions[index].options.length; i++) {
        document.querySelector(".option" + i).innerHTML = theQuestions[index].options[i];
        document.querySelector(".option" + i).style.padding = `5px`;
    }
};

answerButton.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.matches(`button`)) {
        if (event.target.textContent === theQuestions[index].answer) {
        } else {
            timeLeft = timeLeft - 10;
        }
        if (index < theQuestions.length - 1) {
            index++;
            questions();
        } else {
            score = timeLeft;
            showScore();
            clearInterval(timeInterval);
        }
    }
})


var theQuestions = [
    {
        question: "What does HTML stand for",
        options: [
            "1. HyperTaxed Markdown Language",
            "2. Harry tries more lettuce",
            "3. How to mow the lawn",
            "4. HyperText Markup Language"
        ],
        answer: "4. HyperText Markup Language"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "1. Cascading Style Sheets",
            "2. Crazy Sharks Swin",
            "3. Cascading Smart Styles",
            "4. Carousels Spin Slowly"
        ],
        answer: "1. Cascading Style Sheets"
    },
    {
        question: "Whats the best location to link Javascript files in HTML?",
        options: [
            "1. At the top, within the head",
            "2. At the bottom of the body",
            "3. At the top of the body",
            "4. In the CSS file"
        ],
        answer: "2. At the bottom of the body"
    },
    {
        question: "Where do you link your style.css files within the HTML?",
        options: [
            "1. At the bottom of the body",
            "2. In the Javascript file",
            "3. At the top, within the head",
            "4. At the top of the body"
        ],
        answer: "3. At the top, within the head"
    },
    {
        question: "What can be stored in an array?",
        options: [
            "1. Booleans",
            "2. Numbers and strings",
            "3. Other arrays",
            "4. All of the above"
        ],
        answer: "4. All of the above"
    }
]


