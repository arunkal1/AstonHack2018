$(document).ready(function() {
  var health = 100;
  var damage = 25;
  var player = $(".player");
  var fireball = $(".fireball");
  var healthBar = $(".healthBarReducing");
  // console.log(player);

  //players top and left coordinates
  var playerLeft = player.offset().left;
  // console.log(playerLeft);
  var playerTop = player.offset().top;
  // console.log(playerTop);

  var playerRight = playerLeft + player.width();
  // console.log(playerRight);
  var playerBottom = playerTop + player.height();
  // console.log(playerBottom);

  var fireballLeft = fireball.offset().left;
  // console.log("left = " + fireballLeft);
  var fireballTop = fireball.offset().top;
  // console.log("top = " + fireballTop);

  var fireballRight = fireballLeft + fireball.width();
  // console.log("right = " + fireballRight);
  var fireballBottom = fireballTop + fireball.height();
  // console.log("bottom = " + fireballBottom);

  function playerHurt() {
    if (playerRight == fireballLeft) {
      fireball.remove();
      health = health - damage;
      healthBar.css({
        // healthBar.width() = healthBar.width() - 25%;
      });
      console.log("health is:" + health);
    }
  }

  function respwanFireBall() {
    if (playerHurt()) {
      fireball.append();
    }
  }

  function playerDead() {
    if (health == 0) {
      console.log("player dead");
    }
  }

  respwanFireBall();
  playerDead();
});
