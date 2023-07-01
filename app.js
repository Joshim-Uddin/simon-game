const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern =[];
let clickedPattern = [];
let randomColor;
let level = 0;
let started = false;

function sound(colorName){
    let audio = new Audio ("/sounds/"+colorName+".mp3");
    audio.play();
}

function nextSequence (){
    clickedPattern=[];
    level++;
    let randNum = Math.floor(Math.random()*4);
    randomColor = buttonColors[randNum];
    gamePattern.push(randomColor);
    $("."+ randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    $("h1").text("Level "+ level);
    console.log(gamePattern);
    sound(randomColor);
}


$(document).on("keypress", function(){
    if(!started){
        nextSequence();
        started = true;
    }
    
})

$(".btn").on("click", function(e){
    clickedPattern.push(e.target.id);
    sound(e.target.id);
    $("."+e.target.id).addClass("pressed");
    setTimeout(function(){
        $("."+e.target.id).removeClass("pressed");
    }, 200);
    checkAnswer(clickedPattern.length-1)
    console.log(clickedPattern);
})

function checkAnswer(value){
    if(gamePattern[value]===clickedPattern[value]){
        if(clickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
                $("h1").text("Level " + level);
            }, 1000)
           
        }
        
    }
    else{
        gameOver();
        startOver();
        
        
    }
    
}

function gameOver(){
    $("h1").text ("Game over, Press A Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200)
    let audio = new Audio ("/sounds/wrong.mp3");
    audio.play();
}

function startOver(){
    gamePattern=[];
    level = 0;
    started = false;
}