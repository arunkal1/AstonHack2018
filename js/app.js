$(document).ready(function() {
  var player = $(".player");
  var board = $(".box");

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

  var speed = 1.5;

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
      // console.log("pressed");
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
      $(".box").append("<div class = 'arrow'></div>");
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
      checkBulletDino();
      checkBulletWalls();
    }
  }, 5);

  setInterval(function() {
    movePlayer();
    checkCoins();
    checkFloating();
  }, 5);

  setInterval(function() {
    dayAndNight();
  }, 1000);

  // floorPosition();

  function checkBulletDino() {
    if ($(".enemy").is(":visible")) {
      if (bulletRight <= $(".enemy").offset().left) {
        bulletLeft += 7;
        $(".arrow").css({
          left: bulletLeft + "px"
        });
      } else if (bulletRight >= $(".enemy").offset().left) {
        $(".arrow").remove();
        $(".enemy").remove();
        $(".fireball").remove();
        alert("You Won!!!");
        answer = prompt("Would you like to play again : 1) YES 2) NO");

        switch (answer) {
          case 1:
            location.reload(true);
            break;
          case 2:
            location.reload(true);
          default:
            location.reload(true);
        }
      }
    } else if (!$(".enemy").is(":visible")) {
      $(".arrow").remove();
    }
  }
  function checkBulletWalls() {
    if (floorsTop[3] <= bulletTop + 75 && bulletTop + 75 <= floorsTop[0]) {
      // console.log("floors top 3 " + floorsTop[3]);
      // console.log("bullet top " + bulletTop);
      // console.log("floors top 0" + floorsTop[0]);
      if (bulletRight >= floorsLeft[3] && bulletRight <= floorsRight[3]) {
        $(".arrow").remove();
      } else if (
        bulletRight >= floorsLeft[6] &&
        bulletRight <= floorsRight[6]
      ) {
        $(".arrow").remove();
      } else if (
        bulletRight >= floorsLeft[14] &&
        bulletRight <= floorsRight[14]
      ) {
        $(".arrow").remove();
      }
    }
  }

  var score = 0;
  var coins = [];
  // Temp variable to indicate player x coordinate
  // var playerXposition = 76;

  floorPosition();
  var coin1 = new coin(810, floorsTop[0] - 50, 1);
  coins.push(coin1);
  var coin2 = new coin(300, floorsTop[0] - 50, 2);
  coins.push(coin2);

  function dayAndNight() {
    checkCoins();
    // console.log(score);
    if (score <= 4) {
      document.getElementsByClassName("box")[0].classList.add("box");
      $("#star").hide();
      $("#star2").hide();
      $("#star3").hide();
      $("#scoreBoard").css("color", "black");
    } else if (score > 4) {
      document
        .getElementsByClassName("box")[0]
        .classList.add("container_override");
      $("#star").show();
      $("#star2").show();
      $("#star3").show();
      $("#cloud1").remove();
      $("#cloud2").remove();
      $("#cloud3").remove();
      $("#scoreBoard").css("color", "white");
    }
  }

  // dayAndNight();

  function coin(xPos, yPos, id) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
    $(".box").append(
      "<img src='images/coin.png' class='coin' id='coin-" + id + "'/>"
    );
    $("#coin-" + id).css({
      left: xPos,
      top: yPos
    });
  }

  // Score:
  // Run each time the player moves
  function checkCoins() {
    // Checks if player has a higher x coordinate than the coin. If true then remove the coin and increase points.

    // console.log(playerRight);
    for (var i = 0; i < coins.length; i++) {
      if (playerRight >= coins[i].xPos) {
        $("#coin-" + coins[i].id).remove();
        coins.splice(i, 1);
        score += 5;
        $("#scoreBoard").text("Score: " + score);
      }
    }
  }
});
