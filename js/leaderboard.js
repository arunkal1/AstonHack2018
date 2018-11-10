$(document).ready(function() {
  // Leaderboard array with mock scores
  var leaderboard = [];

  // Adds score to leaderboard array and sets the array in localstorage.
  function addScore(name, score) {
    leaderboard.push([name, score]);
    // Code sorts leaderboard
    leaderboard = leaderboard.sort(function(a, b) {
      return a[1] - b[1];
    });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard)); // Put leaderboard
  }

  function retrieveLeaderboard() {
    if (JSON.parse(localStorage.getItem("leaderboard") != null)) {
      leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
      // Code sorts leaderboard
      leaderboard = leaderboard.sort(function(a, b) {
        return a[1] - b[1];
      });
    }
  }

  function setupLeaderboard() {
    retrieveLeaderboard();
    var table = document.getElementById("scoreTable");
    var header = table.createTHead();
    var row = header.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = "<u>Name</u>";
    var cell = row.insertCell(1);
    cell.innerHTML = "<u>Score</ul>";

    for (var i = 0; i < leaderboard.length; i++) {
      var row = table.insertRow(1);
      var name = row.insertCell(0);
      var score = row.insertCell(1);
      name.innerHTML = leaderboard[i][0];
      score.innerHTML = leaderboard[i][1];
    }
  }

  setupLeaderboard();
});
