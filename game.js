
/*Declaring the array for the default color buttons, 
an empty array that will record patterns randomly provided by the game  AND
an empty array that will reccord patterns clicked by the user and compare it with the patterns provided by the system */
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = true;
var level = 0; 


$(document).keypress(function(){
    //console.log(e);
    if(started === true){
        //console.log("I love u");
        nextSequence();
        
    }
    started = false;  
});

$(".btn").click(function(){

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1); 

});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}


//Funtion that creates a random pattern and pushes it into the gamePattern array
function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);

  level+=1;
  $("h1").text("Level "+level);
    
    
}

function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play(); 
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
   }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = true;
}













