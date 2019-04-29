function chooseKeys() {
    var keys = [];
    document.getElementById("instructionForKeys").innerHTML 
        = "On your keyboard click on the keys you want for moving:1. left 2. right 3. up 4. down";
    document.addEventListener('keydown', function (event) {
        var key = event.code; // "a", "1", "Shift", etc.
        keys.push(key);
        if (keys.length > 3) {
            document.getElementById("chosenKeys").innerHTML
                = " You chose left" + keys[0] + " right:" + keys[1] + " up:"+keys[2] + " down:"+keys[3];
    laft_key=keys[0];
    right_key=keys[1];
    up_key=keys[2];
    down_key=keys[3];  
            }
    });
    
}


function chooseNumOfBalls(){
var num=parseInt(document.getElementById("num of balls").value);
if (num >=50 && num <=90 ){
    num_of_balls=num;
    window.alert("The num that you chose is: " + num);
}
else{
    window.alert("choose number between 50 to 90 balls");
}


}


function chooseGameTime(){
    var num=parseInt(document.getElementById("time of game").value);
    if (num >=60 ){
        TimerLimit=num;
        window.alert("The time that you chose is: " + num);
    }
    else{
        window.alert("choose number bigger 59");
    }
    
    
    }

    function chooseNumOfMonster(value){
num_of_monster= parseInt(value.value);

    }

    function rundomValues(){
         laft_key='ArrowLeft';
         right_key='ArrowRight'
         up_key='ArrowUp';
         down_key='ArrowDown';
         num_of_balls = Math.floor((Math.random() *40) + 50);
         TimerLimit=Math.floor((Math.random()*60)+60);
         num_of_monster=Math.floor((Math.random()*3)+1);
            



    }