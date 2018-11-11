$(function() {
  enemies = [];
  // fireballs = [];

  var startx = $(".container").width() - 300;
  var starty = $(".container").height() - 300;

  addEnemy(20, 0, 0);
  addEnemy(200, 0, 1);

  setInterval(function() {
    drawEnemies();
  }, 10);

  function Enemy(xPos, yPos, id) {
    this.xPos = xPos;
    this.yPos = yPos;

    this.id = id;

    this.left = true;

    $(".container").append("<img src='images/dinasour.png' class='enemy' id='enemy-" + id + "'/>");

    this.xLeft = $("#enemy-" + id).offset().left;
    this.xRight = $("#enemy-" + id).offset().left + $("#enemy-" + id).width();
  }

  function setEnemyPosition(xPos, yPos, id) {
    $("#enemy-" + id).css({
      left: xPos,
      top: yPos
    });
  }

  function addEnemy(x, y, id) {
    var enemy = new Enemy(startx - x, starty - y, id);
    enemies.push(enemy);
  }

  function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].xPos <= 0) {
        enemies[i].left = false;
        $("#enemy-" + i).attr("src","images/dinasour-1.png");
      }

      if (enemies[i].xPos >= $(".container").width() - 300) {
        enemies[i].left = true;
        $("#enemy-" + i).attr("src","images/dinasour.png");
      }

      if (enemies[i].left) {
        enemies[i].xPos -= 1;
        setEnemyPosition(enemies[i].xPos, enemies[i].yPos, i);
      } else {
        enemies[i].xPos += 1;
        setEnemyPosition(enemies[i].xPos, enemies[i].yPos, i);
      }
    }

    // function FireBall(xPos, yPos, id){
    //   this.xPos = xPos;
    //   this.yPos = yPos;
    //
    //   this.id = id
    //
    //   this.left = true;
    //
    //   this.dead = false;
    //
    //   $(".container").append("<div id='fireball-" + id + "'class='fireball' </div>");
    // }
    //
    // function setFireBallPosition(xPos, yPos, id) {
    //   $("#fireball-" + id).css({
    //     left: xPos,
    //     top: yPos
    //   });
    // }
    //
    // var fireball = new FireBall(10,10,0);
  }
});
