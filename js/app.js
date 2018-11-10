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
    //Find left and top edge of the board
    var boardLeft = board.offset().left;
    var boardTop = board.offset().top;

    //find right and bottom edge of board
    var boardRight = boardLeft + board.width();
    var boardBottom = boardTop + board.height();

    //Find left and top edge of the player
    var playerLeft = player.offset().left;
    var playerTop = player.offset().top;

    //find right and bottom edge of player
    var playerRight = playerLeft + player.width();
    var playerBottom = playerTop + player.height();

    //horizontal movement

    if (playerRight <= boardRight) {
      if (keyPress[39]) {
        playerXpos += speed;
        $(".player").html(
          '<img src="images/astro-right.png" height="60px" alt="animated">'
        );
      }
    }
    if (playerLeft >= boardLeft) {
      if (keyPress[37]) {
        playerXpos -= speed;
        $(".player").html(
          '<img src="images/astro-left.png" height="60px" alt="animated">'
        );
      }
    }
    //Changing player position
    player.css({
      top: playerYpos + "px",
      left: playerXpos + "px"
    });
  }
});

$("body").keydown(function (e) {
  //start the game with spacebar
  if(e.keyCode == 38){


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
