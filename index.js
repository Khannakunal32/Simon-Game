// function randomnum() {
//   x = Math.floor(Math.random() * 4);

//   return x;
// }

// var levelup = 0;
// var arrayb = [];

// $(document).keypress(function (e) {
//   console.log(e);

//   $("#level-title").html("Level " + levelup);

//   rn = randomnum();

//   blink(rn);
//   response(rn);

// });

// console.log(Math.floor(Math.random() * 4));

// function blink(x) {
//   arrayb.push($(".btn")[x].id);

//   $(".btn")[x].classList.add("pressed");

//   setTimeout(function () {
//     $(".btn")[x].classList.remove("pressed");
//   }, 300);
// }

// function response(x) {
//   $(".btn").click(function (e) {
//     // if ($(".btn")[x].id === e.target.id) {
//         if(e.target.id===arrayb[x]){
//         levelup++;
//       console.log("win");
//     } else console.log("lose");
//   });
// }

var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function (e) {
  if (!started) {
    console.log("hiiiiii");
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (e) {
  console.log(e);
  var userChosenColor = e.target.id;
  // console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
  userClickedPattern = [];
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  // setTimeout(($("."+currentColor).removeClass("pressed")),100);
  setTimeout(removeClass, 100);
  function removeClass() {
    $("." + currentColor).removeClass("pressed");
  }
}

function checkAnswer(currentLevel) {
  //currentLevel = userChosenColor.lenth-1
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    
    console.log("failiure");
  new Audio("sounds/wrong.mp3").play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
 
  }, 200);
  
  startOver();
}
}

function startOver() {
started=false;
level=0;
gamePattern=[];
$("body").addClass("game-over");
$("h1").text("Gameover! Press Any Key To Restart")


}
