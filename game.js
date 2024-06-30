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
 */
function nextSequence(){
    level++;
    $("h1").text("Level" + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100);
    gamePattern.push(randomChosenColour);
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
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

//check if the user is correct
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");
    }
}