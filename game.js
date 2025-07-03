var color_list = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false

function nextSequence() {
    level++;
    console.log(level);
    $('h1').text('Level '+ level);
    $('h2').text('-----');
    userClickedPattern = [];
    let randomNum = Math.floor(Math.random()*4);
    let randomChosenColor = color_list[randomNum];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    setTimeout(() => {
        let id = "#"+ randomChosenColor;
        $(id).fadeOut(50).fadeIn(50);
        playSound(randomChosenColor);
        animatePress(randomChosenColor);
    },1000);

    setTimeout(() => {
        $('h2').text('Your turn!');
    },1500);
    return level
    
}


function btn_click(color) {
    let id = "#"+ color;
    $(id).fadeOut(50).fadeIn(50);
    playSound(color);
    animatePress(color);
}


function playSound (sound_code) {
    let sound = new Audio("sounds/"+sound_code+".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $('#'+currentColour).addClass('pressed');
    setTimeout(()=>{$('#'+currentColour).removeClass('pressed');},100);
}

function checkAnswer(currentLevel) {
    last = userClickedPattern.length;
    if (gamePattern[last-1] == userClickedPattern[last-1]) {
        console.log('right');
        if (last == currentLevel ) {
            console.log('final right');
            setTimeout(() => {nextSequence(currentLevel);},1000);
        }
    } else {
        console.log('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {$('body').removeClass('game-over');},200);
        $('h1').text('Game Over, Press Any Key to Restart');
        $('h2').text('-----');
        playSound('wrong');
        startOver();
    }
    return level;

}

function startOver() {
    gamePattern = [];
    let userClickedPattern = [];
    level = 0;
    started = false;
}

    
$(document).on('keydown', function() {
    if (!started) {
        $('h1').text("Press A Key to Start");
        nextSequence(level);
        started = true;
    }
    
    
    
})

$('.btn').on('click', function() {
    let userChosenColour = $(this).attr('id');
    btn_click(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(level);
})