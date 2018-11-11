document.addEventListener("DOMContentLoaded", function() {
  var score = 40;
  var coins = [];
  // Temp variable to indicate player x coordinate
  var playerXposition = 76;

  function dayAndNight() {
    var coin1 = new coin(75, 100, 1);
    coins.push(coin1);
    var coin2 = new coin(100, 100, 2);
    coins.push(coin2);

    checkCoins();

    if (score <= 20) {
      document
        .getElementsByClassName("container")[0]
        .classList.add("container");
      var star = document.getElementById("star");
      star.parentElement.removeChild(star);
      var star2 = document.getElementById("star2");
      star2.parentElement.removeChild(star2);
      var star3 = document.getElementById("star3");
      star3.parentElement.removeChild(star3);
      $("#scoreBoard").css("color", "black");
    } else if (score >= 21) {
      document
        .getElementsByClassName("container")[0]
        .classList.add("container_override");
      var cloud = document.getElementById("cloud1");
      var cloud2 = document.getElementById("cloud2");
      var cloud3 = document.getElementById("cloud3");
      cloud.parentElement.removeChild(cloud);
      cloud2.parentElement.removeChild(cloud2);
      cloud3.parentElement.removeChild(cloud3);
      $("#scoreBoard").css("color", "white");
    }
  }

  dayAndNight();

  function coin(xPos, yPos, id) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
    $(".container").append(
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
    for (var i = 0; i < coins.length; i++) {
      if (playerXposition >= coins[i].xPos) {
        $("#coin-" + coins[i].id).remove();
        score += 5;
        $("#scoreBoard").text(score);
      }
    }
  }
});
