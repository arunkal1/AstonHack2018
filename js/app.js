$(document).ready(function() {
  var player = $(".player");
  var board = $(".container");

  var floor = $(".floor");
  var floors = []
  function getFloors(){
    for(i of [1,2]){
      floors.push($("#floor"+i))
    }
    console.log(floors)
  }
  getFloors();

  var bullet;
  var bulletLeft;
  var bulletRight;
  var bulletTop;
  var bulletRight;


  var keyPress = [];

  var speed = 3;

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

  $(document).keydown(function(event) {
    keyPress[event.which] = true;
  });
  $(document).keyup(function(event) {
    keyPress[event.which] = false;
  });

  function movePlayer() {
    boardPosition();
    characterPosition();


    floorPosition();



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


  function checkFloating(){

    if ((playerBottom < floorsTop[1])) {
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

  var floorsLeft = [];
  var floorsRight = [];
  var floorsTop = [];
  var floorsBott = [];


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

  function floorPosition(){
    for(floor of floors){
      floorsLeft.push(floor.offset().left);
      floorsTop.push( floor.offset().top);

      floorsRight.push(floor.offset().left + floor.width());
      floorsBott.push(floor.offset().top + floor.height());
    }
  }

  function jump() {
    jumpInt = setInterval(function() {
      boardPosition();

      floorPosition();

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
        ypos = boardBott-player.height()-1;
        setCharPos();
        pressed = false;
      }

    }
  }

  function floorCollision(){
    if (jumping == true) {
      jumping = false
    }
    if((playerBottom >= floorsTop[0] && playerLeft <= floorsRight[0] && playerRight >= floorsLeft[0])||(playerBottom >= floorsTop[1] && playerLeft <= floorsRight[1] && playerRight >= floorsLeft[1])){
      clearInterval(jumpInt);
      console.log("floor")
      yvelocity = 0;
      yacceleration = 0;
      if (playerLeft >= floorsRight[0]) {
        ypos = floorsTop[1]-player.height()-1;
      }else{

        ypos = floorsTop[0]-player.height()-1;
      }
      setCharPos();
      pressed = false;
    }
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

    console.log(yacceleration)
    if (yacceleration == 0) {
      checkFloating();

    }
  }, 5);



});
