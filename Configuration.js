var score = 0;
var lives = 3; 
ColorBalls = false;
function updateCurrentScore() {
    lblScore.value = score;
    lblTime.value = time_elapsed;
}
    function AddPointsToPacman(value) {
        score = score + value;
}
function LosePointsToPacman(value) {
    score = score - value;
}
function GetScore() {
    return score;
}
function LoseLife() {
    lives = lives - 1;
    if (lives === 0) {
        LoseGame();
    } else {
        Start();
    }
    
}
function LoseGame() {

}
