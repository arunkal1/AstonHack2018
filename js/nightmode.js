document.addEventListener("DOMContentLoaded", function() {
  function dayAndNight() {
    var score = 49;

    if (score <= 50) {
      document.getElementsByClassName("box")[0].classList.add("box");
      var star = document.getElementById("star");
      star.parentElement.removeChild(star);
    } else if (score >= 50) {
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
