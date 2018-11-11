$(function() {
  enemies = [];
  fireballs = [];

  var startx = $(".box").width() - 350;
  var starty = $(".box").height() - 290;

  addEnemy(20, 0, 0);
  addFireBall(20, 0, 0);

  setInterval(function() {
    drawEnemies();
  }, 10);

  function Enemy(xPos, yPos, id) {
    this.xPos = xPos;
    this.yPos = yPos;

    this.id = id;

    this.left = true;

    $(".box").append(
      "<img src='images/dinasour.png' class='enemy' id='enemy-" + id + "'/>"
    );

    this.xLeft = $("#enemy-" + id).offset().left;
    this.xRight = $("#enemy-" + id).offset().left + $("#enemy-" + id).width();
  }

  function FireBall(xPos, yPos, id) {
    this.xPos = xPos;
    this.yPos = yPos;

    this.id = id;

    this.left = true;

    this.dead = false;

    $(".box").append(
      "<img src='images/Fire.png' id='fireball-" + id + "'class='fireball' />"
    );
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

  function addFireBall(x, y, id) {
    var fireball = new FireBall(startx - x, starty - y, id);
    fireballs.push(fireball);
  }

  function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].xPos <= 1300) {
        enemies[i].left = false;
        $("#enemy-" + i).attr("src", "images/dinasour-1.png");
      }

      if (enemies[i].xPos >= $(".box").width() - 300) {
        enemies[i].left = true;
        $("#enemy-" + i).attr("src", "images/dinasour.png");
      }

      if (
        fireballs[i].xPos >= $(".box").width() - 300 ||
        fireballs[i].xPos <= 500
      ) {
        fireballs[i].xPos = enemies[i].xPos;
        // $("#fireballs-"+i).css({
        //   display: "none"
        // });
      }

      if (enemies[i].left) {
        enemies[i].xPos -= 1;
        fireballs[i].xPos -= 3;
        setFireBallPosition(fireballs[i].xPos, fireballs[i].yPos, i);
        setEnemyPosition(enemies[i].xPos, enemies[i].yPos, i);
      } else {
        enemies[i].xPos += 1;
        setEnemyPosition(enemies[i].xPos, enemies[i].yPos, i);
        setFireBallPosition(enemies[i].xPos + 200, enemies[i].yPos, i);
      }
    }
    // comment
    function setFireBallPosition(xPos, yPos, id) {
      $("#fireball-" + id).css({
        left: xPos,
        top: yPos
      });
    }
  }
});
