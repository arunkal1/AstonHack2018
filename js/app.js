$(document).ready(function() {
  var player = $(".player");
  var board = $(".container");

  var floor = $(".floor");
  var floors = [];
  function getFloors() {
    for (i = 1; i < 16; i++) {
      floors.push($("#floor" + i));
    }
  }
  getFloors();

  var jumpInt;
  var bullet;
  var bulletLeft;
  var bulletRight;
  var bulletTop;
  var bulletRight;

  var keyPress = [];

  var speed = 1;

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

  var playerXpos = 0;
  var playerYpos = 0;

  var onFloor = false;

  $(document).keydown(function(event) {
    keyPress[event.which] = true;
  });
  $(document).keyup(function(event) {
    keyPress[event.which] = false;
  });

  function movePlayer() {
    boardPosition();
    characterPosition();

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
    //Shooting control
    if (keyPress[32]) {
      shoot();
    }
    //Changing player position
    player.css({
      left: playerXpos + "px"
    });
  }

  function checkFloating() {
    if (
      (playerRight < floorsLeft[0] ||
        playerLeft > floorsRight[floorsRight.length - 1]) &&
      playerBottom < floorsTop[0] - 1
    ) {
      onFloor = false;
    } else if (playerRight < floorsLeft[1] && playerBottom < floorsTop[0] - 2) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[2] &&
      playerLeft > floorsRight[0] &&
      playerBottom < floorsTop[1] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[3] &&
      playerLeft > floorsRight[1] &&
      playerBottom < floorsTop[2] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[4] &&
      playerLeft > floorsRight[2] &&
      playerBottom < floorsTop[3] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[5] &&
      playerLeft > floorsRight[3] &&
      playerBottom < floorsTop[4] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[6] &&
      playerLeft > floorsRight[4] &&
      playerBottom < floorsTop[5] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[7] &&
      playerLeft > floorsRight[5] &&
      playerBottom < floorsTop[6] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[8] &&
      playerLeft > floorsRight[6] &&
      playerBottom < floorsTop[7] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[9] &&
      playerLeft > floorsRight[7] &&
      playerBottom < floorsTop[8] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[10] &&
      playerLeft > floorsRight[8] &&
      playerBottom < floorsTop[9] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[11] &&
      playerLeft > floorsRight[9] &&
      playerBottom < floorsTop[10] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[12] &&
      playerLeft > floorsRight[10] &&
      playerBottom < floorsTop[11] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[13] &&
      playerLeft > floorsRight[11] &&
      playerBottom < floorsTop[12] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[14] &&
      playerLeft > floorsRight[12] &&
      playerBottom < floorsTop[13] - 1
    ) {
      onFloor = false;
    } else if (
      playerRight < floorsLeft[15] &&
      playerLeft > floorsRight[13] &&
      playerBottom < floorsTop[14] - 1
    ) {
      onFloor = false;
    } else {
      onFloor = true;
    }
    if (onFloor == false && pressed == false) {
      yacceleration = 0.075;
      setCharPos();
      move();
      // verticalCollisions();
      // floorCollision();
    }
    verticalCollisions();
    floorCollision();
  }

  var playerRight;
  var playerLeft;
  var playerTop;
  var playerBottom;

  // set up variables for player
  var yacceleration;
  var yvelocity;

  var ypos = 449;

  var jumping = false;
  var pressed = false;

  //board

  var boardLeft;
  var boardRight;
  var boardTop;
  var boardBott;

  var floorsLeft = [];
  var floorsRight = [];
  var floorsTop = [];
  var floorsBott = [];

  $("body").keydown(function(e) {
    //start the game with spacebar
    if (e.keyCode == 38 && pressed == false && jumping == false) {
      jump();
      ypos = playerTop;
      jumping = true;
      yacceleration = 0.075;
      yvelocity = -4;
      pressed = true;
      onFloor = false;
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
  function bulletPosition() {
    // Find the left and top edge of the player
    bulletLeft = $(".arrow").offset().left;
    bulletTop = $(".arrow").offset().top;

    // Find right and bottom edge of the bullet
    bulletRight = bulletLeft + $(".arrow").width();
    bulletBottom = bulletTop + $(".arrow").height();
  }
  function boardPosition() {
    // Find the left and top edge of the board
    boardLeft = board.offset().left;
    boardTop = board.offset().top;

    // Find right and bottom edge of the board
    boardRight = boardLeft + board.width();
    boardBott = boardTop + board.height();
  }

  function floorPosition() {
    for (floor of floors) {
      floorsLeft.push(floor.offset().left);
      floorsTop.push(floor.offset().top);

      floorsRight.push(floor.offset().left + floor.width());
      floorsBott.push(floor.offset().top + floor.height());
    }
  }

  function jump() {
    jumpInt = setInterval(function() {
      boardPosition();

      characterPosition();

      //move the player and check if it has hit the ground
      setCharPos();
      move();
      // verticalCollisions();
      // floorCollision();
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
      onFloor = false;
      //land on ground
    } else {
      if (playerBottom >= boardBott) {
        clearInterval(jumpInt);
        //reset player variables
        yvelocity = 0;
        yacceleration = 0;
        ypos = boardBott - player.height() - 1;
        setCharPos();
        pressed = false;
        onFloor = true;
      }
    }
  }

  function floorCollision() {
    if (jumping == true) {
      jumping = false;
      onFloor = false;
      thing = false;
    }
    // if((playerBottom >= floorsTop[0] && playerLeft <= floorsRight[0] && playerRight >= floorsLeft[0])||(playerBottom >= floorsTop[1] && playerLeft <= floorsRight[1] && playerRight >= floorsLeft[1])){
    //   clearInterval(jumpInt);
    //   console.log("floor")
    //   yvelocity = 0;
    //   yacceleration = 0;
    //
    //
    //
    //   if (playerLeft >= floorsRight[0]) {
    //     ypos = floorsTop[1]-player.height()-1;
    //   }else{
    //
    //     ypos = floorsTop[0]-player.height()-1;
    //   }
    //   setCharPos();
    //   pressed = false;
    //   onFloor = true;
    // }

    if (
      playerBottom >= floorsTop[0] &&
      playerLeft <= floorsRight[0] &&
      playerRight >= floorsLeft[0]
    ) {
      ypos = floorsTop[0] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[1] &&
      playerLeft <= floorsRight[1] &&
      playerRight >= floorsLeft[1]
    ) {
      ypos = floorsTop[1] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[2] &&
      playerLeft <= floorsRight[2] &&
      playerRight >= floorsLeft[2]
    ) {
      ypos = floorsTop[2] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[3] &&
      playerLeft <= floorsRight[3] &&
      playerRight >= floorsLeft[3]
    ) {
      ypos = floorsTop[3] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[4] &&
      playerLeft <= floorsRight[4] &&
      playerRight >= floorsLeft[4]
    ) {
      ypos = floorsTop[4] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[5] &&
      playerLeft <= floorsRight[5] &&
      playerRight >= floorsLeft[5]
    ) {
      ypos = floorsTop[5] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[6] &&
      playerLeft <= floorsRight[6] &&
      playerRight >= floorsLeft[6]
    ) {
      ypos = floorsTop[6] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[7] &&
      playerLeft <= floorsRight[7] &&
      playerRight >= floorsLeft[7]
    ) {
      ypos = floorsTop[7] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[8] &&
      playerLeft <= floorsRight[8] &&
      playerRight >= floorsLeft[8]
    ) {
      ypos = floorsTop[8] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[9] &&
      playerLeft <= floorsRight[9] &&
      playerRight >= floorsLeft[9]
    ) {
      ypos = floorsTop[9] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[10] &&
      playerLeft <= floorsRight[10] &&
      playerRight >= floorsLeft[10]
    ) {
      ypos = floorsTop[10] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[11] &&
      playerLeft <= floorsRight[11] &&
      playerRight >= floorsLeft[11]
    ) {
      ypos = floorsTop[11] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[12] &&
      playerLeft <= floorsRight[12] &&
      playerRight >= floorsLeft[12]
    ) {
      ypos = floorsTop[12] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[13] &&
      playerLeft <= floorsRight[13] &&
      playerRight >= floorsLeft[13]
    ) {
      ypos = floorsTop[13] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[14] &&
      playerLeft <= floorsRight[14] &&
      playerRight >= floorsLeft[14]
    ) {
      ypos = floorsTop[14] - player.height() - 1;
      moveUp();
    } else if (
      playerBottom >= floorsTop[15] &&
      playerLeft <= floorsRight[15] &&
      playerRight >= floorsLeft[15]
    ) {
      ypos = floorsTop[15] - player.height() - 1;
      moveUp();
    } else {
    }
  }

  function moveUp() {
    clearInterval(jumpInt);
    yvelocity = 0;
    yacceleration = 0;
    setCharPos();
    pressed = false;
    onFloor = true;
  }

  function shoot() {
    if (!$(".arrow").is(":visible")) {
      // characterPosition();
      $(".container").append("<div class = 'arrow'></div>");
      // console.log(playerLeft);
      $(".arrow").css({
        top: playerTop + "px",
        left: playerLeft + "px"
      });
    }
  }
  setInterval(function() {
    if ($(".arrow").is(":visible")) {
      bulletPosition();
      bulletLeft += 1;
      $(".arrow").css({
        left: bulletLeft + "px"
      });
    }
  }, 50);

  setInterval(function() {
    movePlayer();

    checkFloating();
  }, 5);

  floorPosition();
});
