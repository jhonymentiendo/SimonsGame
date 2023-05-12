
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


function start(){
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}

var tapped=false
$("body").on("touchstart",function(e){
    if(!tapped){ //if tap is not set, set up single tap
      tapped=setTimeout(function(){
          tapped=null
          //insert things you want to do when single tapped
      },300);   //wait 300ms then run single click code
    } else {    //tapped within 300ms of last tap. double tap
      clearTimeout(tapped); //stop single tap callback
      tapped=null
      if (!started) {
        start()
      }
    }
    e.preventDefault()
});

$("#start").click(function() {
  if (!started) {
    start()
  }
});

$(document).dblclick(function() {
  if (!started) {
    start()
  }
});

$(document).keypress(function() {
  if (!started) {
    start()
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    for (var i = 0; i < gamePattern.length; i++) {
        (function (i) {
            setTimeout(function () {
                playSound(gamePattern[i]);
                animatePress(gamePattern[i]);
            }, 1000 * i );
        })(i);
    };

  
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(document).keydown(function(e){
    console.log(e.key);
    switch(e.key){
        case '1':
            $('.green').click();
            break;
        case '2':
            $('.red').click();
            break;
        case '3':
            $('.yellow').click();
            break;
        case '4':
            $('.blue').click();
            break;
        default:
           
            break;

    }
 });