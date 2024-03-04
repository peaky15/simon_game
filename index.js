var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;


var level = 0;


$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  var l = userClickedPattern.length - 1;

  checkAnswer(l);
  

});



$(document).keypress(function() {
  if (!started) {

    
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length)
    {
     setTimeout(function()
     {
      nextSequence();
     }, 1000);
    
    }
  }
  else
  {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
   audio.play();
    
   $("body").addClass("game-over");

   setTimeout(function () {
     $("body").removeClass("game-over");
   }, 200);
   $("h1").text("Game Over, Press Any Key to Restart");

   startOver();

  }

  

}



function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;


}


function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour)
{
     $("#" + currentColour ).addClass("pressed");

     setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

 


function nextSequence()
{
  userClickedPattern = [];
   level++;

   $("#level-title").text("Level " + level);
  var n = Math.random();

  n = n * 3;

  n = Math.floor(n) + 1;

  var randomNumber = n;

  console.log(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    
  

    

}
