$(document).ready(function() {
  var player = $(".player");
  var board = $(".container");

  var keyPress = [];

  var playerXpos = board.width() / 2;
  var playerYpos = board.height() / 2;

  $(document).keydown(function(event) {
    keyPress[event.which] = true;
  });
  $(document).keyup(function(event) {
    keyPress[event.which] = false;
  });

  function movePlayer() {
    //Find left and top edge of the board
    var boardLeft = board.offset().left;
    var boardTop = board.offset().top;

    //find right and bottom edge of board
    var boardRight = boardLeft + board.width();
    var boardBottom = boardTop + board.height();

    //Find left and top edge of the player
    var playerLeft = player.offset().left;
    var playerTop = player.offset().top;

    //find right and bottom edge of player
    var playerRight = playerLeft + player.width();
    var playerBottom = playerTop + player.height();

    //horizontal movement

    if (playerRight <= boardRight) {
      if (keyPress[39]) {
        playerXpos += speed;
      }
    }
    if (playerLeft >= boardLeft) {
      if (keyPress[37]) {
        playerXpos -= speed;
      }
    }
    //Changing player position
    player.css({
      top: playerYpos + "px",
      left: playerXpos + "px"
    });
  }
});
