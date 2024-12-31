var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;
var score = 0;
var difficulty = "Medium";
var hintCount = 3;
var isLightMode = false;

var buttonColours = ["red", "blue", "green", "yellow"];

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function updateScore() {
    $("#score").text("Score: " + score);
}

function updateHints() {
    $("#hint-count").text("Hints Left: " + hintCount);
}

function setDifficulty(level) {
    difficulty = level;
    $(".difficulty-btn").removeClass("active");
    $("#" + level.toLowerCase()).addClass("active");
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    score++;
    updateScore();

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    let delay = difficulty === "Easy" ? 800 : difficulty === "Medium" ? 500 : 300;

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    setTimeout(function() {
        $("#" + randomChosenColour).fadeOut(delay).fadeIn(100);
    }, delay);
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over. Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    score = 0;
    hintCount = 3;
    updateHints();
    gamePattern = [];
    started = false;
}

$("#easy, #medium, #hard").click(function() {
    setDifficulty($(this).attr("id"));
});

$("#hint-button").click(function() {
    if (hintCount > 0) {
        hintCount--;
        updateHints();
        playCurrentSequence();
    } else {
        alert("No hints left!");
    }
});

function playCurrentSequence() {
    let delay = 0;
    gamePattern.forEach((color) => {
        setTimeout(function() {
            $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(color);
        }, delay);
        delay += 600;
    });
}

$("#theme-button").click(function() {
    isLightMode = !isLightMode;
    if (isLightMode) {
        $("body").addClass("light-mode");
        $("#theme-button").text("Switch to Dark Mode");
    } else {
        $("body").removeClass("light-mode");
        $("#theme-button").text("Switch to Light Mode");
    }
});
