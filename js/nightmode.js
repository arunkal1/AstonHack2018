document.addEventListener("DOMContentLoaded", function() {
  function dayAndNight() {
    var score = 52;

    if (score <= 50) {
      document
        .getElementsByClassName("box")[0]
        .classList.add("box");
      var star = document.getElementById("star");
      star.parentElement.removeChild(star);
      var star2 = document.getElementById("star2");
      star2.parentElement.removeChild(star2);
      var star3 = document.getElementById("star3");
      star3.parentElement.removeChild(star3);
    } else if (score >= 51) {
      document
        .getElementsByClassName("box")[0]
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
});
