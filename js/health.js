$(document).ready(function() {
  var health = 25;
  var damage = 25;
  var player = $(".player");
  var fireball = $(".fireball");
  var healthBar = $(".healthBarReducing");
  // console.log(player);

  //players top and left coordinates
  function characterPosition() {
    // Find the left and top edge of the player
    playerLeft = player.offset().left;
    playerTop = player.offset().top;

    // Find right and bottom edge of the player
    playerRight = playerLeft + player.width();
    playerBottom = playerTop + player.height();
  }

  function fireballPosition() {
    fireballLeft = fireball.offset().left;
    // console.log("left = " + fireballLeft);
    fireballTop = fireball.offset().top;
    // console.log("top = " + fireballTop);

    fireballRight = fireballLeft + fireball.width();
    // console.log("right = " + fireballRight);
    fireballBottom = fireballTop + fireball.height();
    // console.log("bottom = " + fireballBottom);
  }

  play = setInterval(function() {
    // console.log(health);
    playerHurt();
    respwanFireBall();
    playerDead();
  }, 5);

  function playerHurt() {
    characterPosition();
    fireballPosition();
    // console.log(fireballLeft);
    if (
      playerRight >= fireballLeft + 50 &&
      playerLeft <= fireballRight &&
      playerBottom >= fireballTop &&
      playerTop <= fireballBottom - 50
    ) {
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
    if (health <= 0.1) {
      console.log("player dead");
      clearInterval(play);
      alert("You lost");
      location.reload();
    }
  }

  respwanFireBall();
  playerDead();
});
