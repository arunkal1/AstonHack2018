$(document).ready(function() {
  var player = $(".player");
  var board = $(".container");

  var keyPress = [];

  var speed = 3;

  $(document).keydown(function(event) {
    keyPress[event.which] = true;
  });
  $(document).keyup(function(event) {
    keyPress[event.which] = false;
  });

  var playerXpos = board.width() / 2;
  var playerYpos = 0;

  function movePlayer() {
    boardPosition();

    characterPosition();

    //horizontal movement

    if (playerRight <= boardRight) {
      if (keyPress[39]) {
        playerXpos += speed;
        console.log("right");
      }
    }
    if (playerLeft >= boardLeft) {
      if (keyPress[37]) {
        playerXpos -= speed;
        console.log("left");
      }
    }
    //Changing player position
    player.css({
      left: playerXpos + "px"
    });
  }

  var playerRight;
  var playerLeft;
  var playerTop;
  var playerBottom;

  // set up variables for player
  var yacceleration;
  var yvelocity;

  var ypos;

  var jumping = false;
  var pressed = false;

  //board

  var boardLeft;
  var boardRight;
  var boardTop;
  var boardBott;

  $("body").keydown(function(e) {
    //start the game with spacebar
    if (e.keyCode == 38 && pressed == false && jumping == false) {
      jump();
      jumping = true;
      yacceleration = 0.1;
      yvelocity = -5;
      ypos = 449;
      pressed = true;
      console.log("jump");
    }
  });
  function characterPosition() {
    // Find the left and top edge of the player
    playerLeft = player.offset().left;
    playerTop = player.offset().top;

    // Find right and bottom edge of the player
    playerRight = playerLeft + player.width();
    playerBottom = playerTop + player.height();
  }

  function boardPosition() {
    // Find the left and top edge of the board
    boardLeft = board.offset().left;
    boardTop = board.offset().top;

    // Find right and bottom edge of the board
    boardRight = boardLeft + board.width();
    boardBott = boardTop + board.height();
  }

  function jump() {
    jumpInt = setInterval(function() {
      characterPosition();
      boardPosition();

      //move the player and check if it has hit the ground
      setCharPos();
      move();
      verticalCollisions();
    }, 5);
  }

  function setCharPos() {
    player.css({
      top: ypos + "px"
    });
  }

  function move() {
    yvelocity += yacceleration;
    ypos += yvelocity;
  }

  function verticalCollisions() {
    if (jumping == true) {
      jumping = false;
      //land on ground
    } else {
      if (playerBottom >= boardBott) {
        clearInterval(jumpInt);
        //reset player variables
        yvelocity = 0;
        yacceleration = 0;
        ypos = 449;
        setCharPos();
        pressed = false;
      }
    }
  }

  setInterval(function() {
    movePlayer();
  }, 5);
});
