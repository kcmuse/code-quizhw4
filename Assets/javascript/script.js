var quizBox = document.getElementById("quiz");
var highScores = document.querySelector(".highscores");
var timer = document.querySelector(".timer");
var startBtn = document.querySelector(".start-btn");
var answerButton = document.querySelector(".answerButtons");
var saveScore = document.querySelector(".saveScore");
var submit = document.querySelector(`.submit`);
var highScoreBox = document.querySelector(`.highScore`);
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
        }
    }, 1000);
}

// creating the function to start the quiz
function startQuiz() {
    timeLeft = 75;
    theTimer();
    questions();
};
// event listener for the start button
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
    // var savedInitials = initials.value.trim();
    // var userScore = {
    //     score: score,
    //     user: savedInitials
    // }
    // window.localStorage.setItem(`scores`, JSON.stringify(userScore));

    // var allScores = JSON.parse(window.localStorage.getItem(`scores`))|| [];
    // console.log(allScores)
    // allScores.push(saved)

    // for (var i = 0; i < allScores.length; i++){
    //     var li = document.createElement("li")
    //     li.textContent = allScores.user + ":" + allScores.score
    //     document.getElementsById("savedscores").append(li)
    //     console.log(li)
    // }

//    console.log(allScores)
} 
// event listener to open the highscores of the player clicks that in the upper right corder
highScores.addEventListener(`click`, function(event){
    if(quizBox.style.display !== `none`){
        quizBox.style.display = `none`;
    }
    if(highScoreBox.style.display !== `none`){
        highScoreBox.style.display = `block`;
    }

})

function savedScores() {
    var savedInitials = initials.value.trim();
    var userScore = {
        score: score,
        user: savedInitials
    }
    window.localStorage.setItem(`scores`, JSON.stringify(userScore));

    var allScores = JSON.parse(window.localStorage.getItem(`scores`))|| [];
    console.log(allScores);
    // allScores.push();

    for (var i = 0; i < allScores.length; i++){
        var li = document.createElement("li")
        li.textContent = allScores.userScore.user + ":" + allScores.userScore.score
        document.getElementsById("savedscores").append(li)
        console.log(li)
    }
}

submit.addEventListener(`click`, function(event){
    event.preventDefault();
    // quizBox.innerHTML = ``;
    if(saveScore.style.display !== `none`){
        saveScore.style.display = `none`;
    }
    if(highScoreBox.style.display !== `none`){
        highScoreBox.style.display = `block`;
    }

    savedScores();

})



// function to generate the questions and answers from theQuestions array
function questions() {
    quizBox.innerHTML = "<h1>" + theQuestions[index].question + "</h1>";
    for (var i = 0; i < theQuestions[index].options.length; i++) {
        document.querySelector(".option" + i).innerHTML = theQuestions[index].options[i];
        document.querySelector(".option" + i).style.padding = `5px`;
    }
};
// click function for the answer, each time this is hit it will move onto the next question.
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
            clearInterval(timeInterval);
            showScore();
        }
    }
})
// Variable holding all of the questions recalled in the the questions function.
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


