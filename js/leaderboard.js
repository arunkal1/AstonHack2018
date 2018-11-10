$(document).ready(function() {
  // Leaderboard array with mock scores
  var leaderboard = [["Michael", 34], ["Toby", 101], ["Ryan", 443]];

  // Adds score to leaderboard array and sets the array in localstorage.
  function addScore(name, score) {
    leaderboard.push([playerName, playerScore]);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard)); // Put leaderboard
  }

  function retrieveLeaderboard() {
    if (JSON.parse(localStorage.getItem("leaderboard") != null)) {
      leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
  }

  function setupLeaderboard() {
    var table = document.getElementById("scoreTable");
    var header = table.createTHead();
    var row = header.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = "Name";
    var cell = row.insertCell(1);
    cell.innerHTML = "Score";

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
