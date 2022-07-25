//Highscore page

//variables
var clearButton = document.getElementById("clear");

function showHighscore() {
  //get from local storage
  var highScores = JSON.parse(localStorage.getItem("highscores"));

  if (highScores != null) {
    for (var i = 0; i < highScores.length; i++) {
      // create li tag
      var scoreList = document.createElement("li");

      scoreList.textContent =
        highScores[i].initials + " - " + highScores[i].score;

      // display
      document.getElementById("highscores").appendChild(scoreList);
    }
  } else {
    var noScores = document.getElementById("highscores");

    noScores.textContent = "No high scores yet!";
  }
}

clearButton.addEventListener("click", function () {
  clearScore();
});

//clears score
function clearScore() {
  localStorage.removeItem("highscores");

  location.reload();
}

showHighscore();
