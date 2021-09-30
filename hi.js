function prntHighScore() {
   let highScores = JSON.parse(window.localStorage.getItem("highscores"))|| []
   highScores.sort(function(a,b){
      return b.score - a.score
   })
   highScores.forEach(function(score){
      var liTag = document.createElement("li")
      liTag.textContent = score.initials +  "-" + score.score

      var olel = document.getElementById("highscores")
      olel.appendChild(liTag)
   })

}
function clearScore(){
   window.localStorage.removeItem("highscores")
   window.location.reload()
}
document.getElementById("clear").onclick = clearScore
prntHighScore()