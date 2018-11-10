$(document).ready(function() {
  var player = $(".player");
  var board = $(".container");



  var keyPress = [];

  var playerXpos = board.width() / 2;
  var playerYpos = board.height() / 2;

  $(document).keydown(function(event) {
    keyPress[event.which] = true;
  });
  $(document).keyup(function(event) {
    keyPress[event.which] = false;
  });

  function movePlayer() {
    boardPosition()

    characterPosition()

    //horizontal movement

    if (playerRight <= boardRight) {
      if (keyPress[39]) {
        playerXpos += speed;
      }
    }
    if (playerLeft >= boardLeft) {
      if (keyPress[37]) {
        playerXpos -= speed;
      }
    }
    //Changing player position
    player.css({
      top: playerYpos + "px",
      left: playerXpos + "px"
    });
  }
});

var character = $(".player");

var characterRight;
var characterLeft;
var characterTop;
var characterBott;

// set up variables for character
var yacceleration;
var yvelocity;

var ypos;

var jumping = false;
var pressed = false;

//board
var board = $(".container");

var boardLeft;
var boardRight;
var boardTop;
var boardBott;

$("body").keydown(function (e) {
  //start the game with spacebar
  if(e.keyCode == 38 && pressed == false && jumping == false){
    jump();
    jumping = true;
    yacceleration = 0.1;
    yvelocity = -6.6;
    ypos = 259;
    pressed = true;
  }
}

function characterPosition(){
  // Find the left and top edge of the character
  characterLeft = character.offset().left;
  characterTop = character.offset().top;

  // Find right and bottom edge of the character
  characterRight = characterLeft + character.width();
  characterBott = characterTop + character.height();
};

function boardPosition(){
  // Find the left and top edge of the board
  boardLeft = board.offset().left;
  boardTop = board.offset().top;

  // Find right and bottom edge of the board
  boardRight = boardLeft + board.width();
  boardBott = boardTop + board.height();
}

function jump(){
  jumpInt = setInterval(function(){
    characterPosition();
    boardPosition();

    //move the character and check if it has hit the ground
    setCharPos();
    move();
    verticalCollisions();
  },5)
}

function setCharPos(){
  character.css({
    "top": ypos + "px"
  });
}

function move(){
  yvelocity += yacceleration;
  ypos+=yvelocity;
};

function verticalCollisions(){
  if (jumping == true) {
    jumping = false;
  //land on ground
  }else{
    clearInterval(jumpInt);
    //reset character variables
    yvelocity = 0;
    yacceleration = 0;
    ypos = 259;
    setCharPos();
    pressed = false;
}
