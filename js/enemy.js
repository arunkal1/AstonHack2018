$(function() {

  enemies = [];

  var startx = $(".board").width() - 50;
  var starty = $(".board").height() - 50;

  addEnemy(20,0,0);
  addEnemy(200,0,1);

  setInterval(function () {
    drawEnemies();
  }, 10);

  function Enemy(xPos, yPos, id){

    this.xPos = xPos;
    this.yPos = yPos;

    this.id = id;

    this.left = true;

    $('.board').append("<div class='enemy' id='enemy-" + id + "'>");

    this.xLeft = $("#enemy-"+id).offset().left;
    this.xRight = $("#enemy-"+id).offset().left + $("#enemy-"+id).width();

  }

  function setPosition(xPos,yPos,id){

    $("#enemy-" + id).css({
                    "left": xPos,
                    "top": yPos
                  });
  }

  function addEnemy(x, y, id){
    var enemy = new Enemy(startx-x,starty-y,id);
    enemies.push(enemy);
  }

  function drawEnemies(){

    for (var i = 0; i < enemies.length; i++) {

      if (enemies[i].xPos <= 0) {
        enemies[i].left = false;
      }

      if (enemies[i].xPos >= $(".board").width() - 50) {
        enemies[i].left = true;
      }

      if (enemies[i].left) {
        enemies[i].xPos-=1;
        setPosition(enemies[i].xPos,enemies[i].yPos,i);
      } else {
        enemies[i].xPos+=1;
        setPosition(enemies[i].xPos,enemies[i].yPos,i);
      }

    }



    // for (var i = 0; i < enemies.length; i++) {
    //   if (enemies[i].xLeft <= 0) {
    //     left = false;
    //     setPosition(enemies[i].xPos,enemies[i].yPos,i);
    //   } else if (enemies[i].xRight >= $(".board").width()){
    //     enemies[i].xPos += 1
    //     setPosition(enemies[i].xPos,enemies[i].yPos,i);
    //   }
    // }
  }

});
