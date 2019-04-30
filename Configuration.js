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
var currnumofballs=50;
var color_ball5="blue";
var color_ball25="brown";
var color_ball15="purple";
var num_of_monster=1;
var audio= new Audio("pacman song.mp3");
defaultUser.username = "a";
defaultUser.password = "a";
UserArray.push(defaultUser);


function login(){
    var c_username= $.trim($("input[name=UserName_l]").val());
    var c_password=$.trim($("input[name=Password_l]").val());
    for (var ua = 0; ua < UserArray.length; ua++) {
        if (UserArray[ua].username === c_username) {
            if(UserArray[ua].password===c_password){
                ShowSection("Game");
                return ;
            }
            else{
                window.alert("password is incorrect");
                return;
            }

        }
    }
    window.alert("username does not exist");


}



function validInput(){

    if(fieldNotEmpty()){
   
        if( $.trim($("input[name=Password]").val()).length<8)  {
            window.alert("the password is too short");
        }
        if(!$.trim($("input[name=Password]").val()).match(/[a-z]/i)){
            window.alert("your password needs to contain letters");
        }
        if(!$.trim($("input[name=Password]").val()).match(/\d+/g)){

            window.alert("your password needs to contain numbers");
        }
        if($.trim($("input[name=FirstName]").val()).match(/\d+/g)){

            window.alert("your first name should not contain numbers");
        }
        if($.trim($("input[name=LastName]").val()).match(/\d+/g)){

            window.alert("your last name should not contain numbers");
        }
        if(!$.trim($("input[name=Email]").val()).match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)){

            window.alert("your email is not valid");
        }
        var newregister=new Object();
        newregister.username=$("input[name=UserName]").val();
        newregister.password=$("input[name=Password]").val();
        newregister.firstname=$("input[name=FirstName]").val();
        newregister.lastname=$("input[name=LastName]").val();
        newregister.email=$("input[name=Email]").val();
        newregister.birthdate=$("input[name=BirthDate]").val();

        UserArray.push(newregister);
        ShowSection("Login");

    }
    else{
        window.alert("please fill all the fields");
    }
}

function fieldNotEmpty(){
    var isValid=true;
    $("#registerform > input").filter(function(){
     if( $.trim($(this).val()).length===0)  {
         isValid=false;
     }

    })
return isValid;
}



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
    currnumofballs=num_of_balls;
    document.getElementById("lblScore").innerHTML =0;
    document.getElementById("lblTime").innerHTML = 0;
    document.getElementById("lblName").innerHTML = name;
    document.getElementById("lblLosses").innerHTML = 0;
    //audio.play();
    

}
function initTimer() {
    start_time = new Date();
    document.getElementById("lblTime").innerHTML = 0;
}
function AddPointsToPacman(value) {
    if(isNaN(score+value)){
        window.alert(time_elapsed+","+score+","+currnumofballs);
    }
        score = score + value;
}
function LosePointsToPacman(value) {
    if(isNaN(score-value)){
        window.alert(time_elapsed+","+score+","+currnumofballs);
    }
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
    stopgame();
    if (score < 150) {
        window.alert("You Can Do Better\n" + "Your Score Was: " + score);
    }
    else {
        window.alert("We Have A Winner!!!\n" + "Your Score Was: " + score);
    }
}
function stopgame(){
    audio.pause();
    clearInterval(interval);
}


