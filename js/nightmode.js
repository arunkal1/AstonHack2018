document.addEventListener("DOMContentLoaded", function() {
  var score = 0;

  function dayAndNight() {
    scoringSystem();

    if (score <= 50) {
      document
        .getElementsByClassName("container")[0]
        .classList.add("container");
      var star = document.getElementById("star");
      star.parentElement.removeChild(star);
    } else if (score >= 50) {
      document
        .getElementsByClassName("container")[0]
        .classList.add("container_override");
      var cloud = document.getElementById("cloud1");
      var cloud2 = document.getElementById("cloud2");
      var cloud3 = document.getElementById("cloud3");
      cloud.parentElement.removeChild(cloud);
      cloud2.parentElement.removeChild(cloud2);
      cloud3.parentElement.removeChild(cloud3);
    }
  }

  dayAndNight();

  function scoringSystem() {
    if (document.querySelector("#coin1") !== null) {
      score += 100;
      console.log(score);
    }
  }
});
