var level = 0;
var started = false;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors =["red", "blue", "green", "yellow"];

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200 );
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("h1").text("Game Over, press any key to start again.");
        startOver();
        console.log("wrong");
    }

}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}

$(".btn").click(function(){
    var userChosenColor = this.id
    userClickedPattern.push(userChosenColor);
     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    $("#"+chosenColor).fadeOut(100).fadeIn(100);
    playSound(chosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
    },100 );
}