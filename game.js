
var buttonColours = ["blue", "green", "red", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1)
});

function playSound(name){
    
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

$(document).keypress(function(){

    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence(){

    userClickedPattern = [];

    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("h1").text("Level " + level);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length){
            
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key To Restart")

        startOver();
    }
}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    
}

function startOver(){
    
    level = 0;
    gamePattern = [];
    started = false;
}






