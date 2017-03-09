
var trivia = {
    timeLeft: 30,
    correctAnswer: 0,
    incorrectAnswer: 0,

    //reset trivia method
    resetGame: function() {
        trivia.correctAnswer = 0;
        trivia.incorrectAnswer = 0;
        n = 0;
        nextGame(questionList[n]);
    }
};

var questionList = [
        question1 = {   
        question: "What is the name of Nintendo's mascot?",
        correctAnswer: {
            answer: "Mario",
        },
        incorrectAnswer1: "Luigi",
        incorrectAnswer2: "Bowser",
        incorrectAnswer3: "Sonic"
    },

    question2 = {   
        question: "What was the super Nintendo known as in Japan?",
        incorrectAnswer1: "SNES",
        incorrectAnswer2: "Super NES",
        correctAnswer: {
            answer: "Super Famicom",
        },
        incorrectAnswer3: "Family Computer Disk System"
    },
     question3 = {   
        question: "What is the newest Nintnedo gaming console as of 2017?",
        incorrectAnswer1: "Game Cube",
        incorrectAnswer2: "Wii U",
        correctAnswer: {
            answer: "Super Famicom",
        },
        incorrectAnswer3: "Family Computer Disk System"
    },


];

var n = 0;

function time() {
    if (trivia.timeLeft > 0) {
        trivia.timeLeft--;
        $("#timeLeft").html(trivia.timeLeft);
    }
    else if (trivia.timeLeft === 0) {
        incorrect();
    }
}

function resetTime() {
    trivia.timeLeft = 30;
}

function correct() {
    var result = "You got it right!"
    trivia.correctAnswer ++;

    $("#next").show();
    $(".answer").hide();

    $("#question").html(result)
    setTimeout(call, 2500);
}

function incorrect() {
    var result = "Wrong, the correct answer is " + questionList[n].correctAnswer.answer;
    trivia.incorrectAnswer++;

    $("#next").show();
    $(".answer").hide();

    $("#question").html(result)
    // call();
    setTimeout(call, 2500);
    resetTime();
}

function call() {
    n++;
    if(n == questionList.length) {
        endGame();
    }
    else {
        nextGame(questionList[n]);
    }
}


function nextGame(questionObj) {
    $(".answer").show();
    $(".answer").remove();
    $(".question").remove();
    for(var k in questionObj) {
        var objProp = k;
        var objText = questionObj[k];
        var newDiv = $('<div class="answer button"></div>').attr("id",objProp);
    $("#gamePage").append(newDiv)
    }
    $("#timeLeft").html(trivia.timeLeft);
    $("#question").html(questionObj.question).removeAttr("class","answer").attr("class","question");
    $("#correctAnswer").html(questionObj.correctAnswer.answer);
    $("#incorrectAnswer1").html(questionObj.incorrectAnswer1);
    $("#incorrectAnswer2").html(questionObj.incorrectAnswer2);
    $("#incorrectAnswer3").html(questionObj.incorrectAnswer3);
    resetTime();
    clickEvent();
}
function endGame() {
    $("#gamePage").hide();
    $("#endGame").show();
    $("#right").html(trivia.correctAnswer);
    $("#wrong").html(trivia.incorrectAnswer);
    $("#restart").click(function(){
        $("#gamePage").show();
        $("#endGame").hide();
        trivia.resetGame();
    })  
}
// this function will create a div for every property of the given object. will also give a class of "answer" and id of the name of the property
function divCreator(questionObj){ 
    for(var k in questionObj) {
        var objProp = k;
        var objText = questionObj[k];
        var newDiv = $('<div class="answer"></div>').attr("id",objProp);//creates newdiv to append
        $("#gamePage").append(newDiv);

    }
}
function gameStart(x) { //this function will post the content of the properties to our HTML. and call the clickEvent function.
    $("#timeLeft").html(trivia.timeLeft);
    $("#question").html(x.question).removeAttr("class","answer").attr("class","question");
    $("#correctAnswer").html(x.correctAnswer.answer);
    $("#incorrectAnswer1").html(x.incorrectAnswer1);
    $("#incorrectAnswer2").html(x.incorrectAnswer2);
    $("#incorrectAnswer3").html(x.incorrectAnswer3);
    clickEvent();
}
function clickEvent() { //this will check if the answer is correct or incorrect and run function depending if it is correct or incorrect
        $("#correctAnswer").click(correct);
        $("#incorrectAnswer1").click(incorrect);
        $("#incorrectAnswer2").click(incorrect);
        $("#incorrectAnswer3").click(incorrect);
}

//this will hide the gamePage at start
$("#gamePage").hide();
$("#endGame").hide();

//this will hide the startPage and show the gamePage, will also run the gameStart function and also run divCreator.
$("#start").click(function(){
    divCreator(question1);
    $("#gamePage").show();
    $("#startPage").hide();
    gameStart(question1);
    setInterval(time, 1000);//decrease timer every 1 second
})


