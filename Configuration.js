var score = 0;
var lives = 3; 
var name = "loading...";
var start_time = new Date();
var TimerLimit = 60;
var UserArray = [];
var defaultUser = new Object();
var ColorBalls = true;
var laft_key='ArrowLeft';
var right_key='ArrowRight';
var up_key='ArrowUp';
var down_key='ArrowDown';
var num_of_balls=50;
var color_ball5="blue";
var color_ball25="brown";
var color_ball15="purple";
var num_of_monster=1;
defaultUser.username = "a";
defaultUser.password = "a";
UserArray.push(defaultUser);






function updateCurrentScore() {
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    //lblScore.value = score;
    // lblTime.value = time_elapsed;
    document.getElementById("lblScore").innerHTML = score;
    document.getElementById("lblTime").innerHTML = time_elapsed;
    var losses = 3 - lives;
    document.getElementById("lblLosses").innerHTML = losses;
    return time_elapsed;
}
function initScore() {
    start_time = new Date();
    score = 0;
    lives = 3; 
    document.getElementById("lblScore").innerHTML =0;
    document.getElementById("lblTime").innerHTML = 0;
    document.getElementById("lblName").innerHTML = name;
    document.getElementById("lblLosses").innerHTML = 0;
    

}
function initTimer() {
    start_time = new Date();
    document.getElementById("lblTime").innerHTML = 0;
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
    window.alert("You Lost! \n" + "Your Score Was: " + score);
}
function endGame() {
    if (score < 150) {
        window.alert("You Can Do Better\n" + "Your Score Was: " + score);
    }
    else {
        window.alert("We Have A Winner!!!\n" + "Your Score Was: " + score);
    }
}


