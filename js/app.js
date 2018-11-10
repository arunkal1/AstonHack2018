$(document).ready(function() {
  var player = $(".player");
  var board = $(".container");

  var floor = $(".floor");
  var floors = [];
  function getFloors() {
    for (i of [1, 2]) {
      floors.push($("#floor" + i));
    }
    // console.log(floors);
  }
  getFloors();

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

  var floorsLeft = [];
  var floorsRight = [];
  var floorsTop = [];
  var floorsBott = [];

  $(document).keydown(function(event) {
    keyPress[event.which] = true;
  });
  $(document).keyup(function(event) {
    keyPress[event.which] = false;
  });

  floorPosition();
  function movePlayer() {
    boardPosition();
    characterPosition();
    floorsLeft[0] = floors[0].offset().left;
    floorsLeft[1] = floors[1].offset().left;
    floorsTop[0] = floors[0].offset().top;
    floorsTop[1] = floors[1].offset().top;

    //horizontal movement
    // if (playerRight <= boardRight) {
    //   if (keyPress[39]) {
    //     playerXpos += speed;
    //   }
    // }
    if (keyPress[39]) {
      console.log("floors left " + floorsLeft[0]);
      console.log("player right " + playerRight);
      console.log("player bottom " + playerBottom);
      console.log("floors top " + floorsTop);
      if (playerRight <= floorsLeft[0] && playerBottom >= floorsTop[0]) {
        playerXpos += speed;
        player.css({
          left: playerXpos + "px"
        });
      } else if (
        floorsLeft[0] <= playerRight &&
        playerRight <= floorsLeft[1] &&
        playerBottom <= floorsTop[0]
      ) {
        playerXpos += speed;
        player.css({
          left: playerXpos + "px"
        });
      } else if (floorsLeft[1] <= playerRight && playerBottom <= floorsTop[1]) {
        playerXpos += speed;
        player.css({
          left: playerXpos + "px"
        });
      } else {
        console.log("yeet");
      }
    }
    if (playerLeft >= boardLeft) {
      if (keyPress[37]) {
        console.log("yeet");
        playerXpos -= speed;
        player.css({
          left: playerXpos + "px"
        });
      }
    }
    //Shooting control
    if (keyPress[32]) {
      shoot();
    }
  }

  function checkFloating() {
    if (playerBottom < floorsTop[1]) {
      yacceleration = 0.1;
      setCharPos();
      move();
      verticalCollisions();
      floorCollision();
    }
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

  $("body").keydown(function(e) {
    //start the game with spacebar
    if (e.keyCode == 38 && pressed == false && jumping == false) {
      jump();
      jumping = true;
      yacceleration = 0.1;
      yvelocity = -5;
      pressed = true;
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
    bulletLeft = $(".arrow").position().left;
    bulletTop = $(".arrow").position().top;

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

      // floorPosition();

      characterPosition();

      //move the player and check if it has hit the ground
      setCharPos();
      move();
      verticalCollisions();
      floorCollision();
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
        ypos = boardBott - player.height() - 1;
        setCharPos();
        pressed = false;
      }
    }
  }

  function floorCollision() {
    if (jumping == true) {
      jumping = false;
    }
    if (
      (playerBottom >= floorsTop[0] &&
        playerLeft <= floorsRight[0] &&
        playerRight >= floorsLeft[0]) ||
      (playerBottom >= floorsTop[1] &&
        playerLeft <= floorsRight[1] &&
        playerRight >= floorsLeft[1])
    ) {
      clearInterval(jumpInt);
      // console.log("floor");
      yvelocity = 0;
      yacceleration = 0;
      if (playerLeft >= floorsRight[0]) {
        ypos = floorsTop[1] - player.height() - 1;
      } else {
        ypos = floorsTop[0] - player.height() - 1;
      }
      setCharPos();
      pressed = false;
    }
  }

  function shoot() {
    if (!$(".arrow").is(":visible")) {
      $(".container").append("<div class = 'arrow'></div>");
      $(".arrow").css({
        top: playerTop + "px",
        left: playerLeft - 200 + "px"
      });
    }
  }
  setInterval(function() {
    if ($(".arrow").is(":visible")) {
      bulletPosition();
      bulletLeft += 10;
      $(".arrow").css({
        left: bulletLeft + "px"
      });
    }
  }, 10);

  setInterval(function() {
    movePlayer();

    // console.log(yacceleration);
    if (yacceleration == 0) {
      checkFloating();
    }
  }, 5);
});
