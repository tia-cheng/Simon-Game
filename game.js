var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];

// input color, 
// output pressed effect, stop pressed effect for 100 ms
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//input color, output sound
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

/** get the next random color
 * add this color into gamepattern
 * fadein fadeout effect, sound for this random color
 * userClickPattern has to reset everytime
 */
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

/** detect when any button is clicked 
 * get the color
 * add this color into useClickedPattern array
 * play the sound of this color
 * */
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    // animate the clicked color
    animatePress(userChosenColour);

    //check answer
    checkAnswer(userClickedPattern.length -1);
});

//detect a keyboard key has been pressed
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//check if the user is correct
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");

        //apply "game-over"class to the body
        $("body").addClass("game-over");
        $("#level-title").text("Game OVer. Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();


    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}