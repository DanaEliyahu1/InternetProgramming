window.addEventListener("click",closemodal);



window.addEventListener("keydown",closemodal);




function chooseKeys() {
    var keys = [];
    document.getElementById("instructionForKeys").innerHTML 
        = "push on the keys you want for:1. left 2. right 3. up 4. down";
    document.addEventListener('keydown', function (event) {
        var key = event.code; // "a", "1", "Shift", etc.
        keys.push(key);
        if (keys.length > 3) {
            document.getElementById("chosenKeys").innerHTML
                = "left:" + keys[0] + " right:" + keys[1] + " up:"+keys[2] + " down:"+keys[3];
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
         color_ball5=getRandomColor();
         color_ball15=getRandomColor();
         color_ball25=getRandomColor();
    }
    function updateColor(event){
        if(event.name === "5Picker"){
            color_ball5=event.value;
        }
        else if(event.name === "15Picker"){
            color_ball15=event.value;
        }
        else if(event.name === "25Picker"){
            color_ball25=event.value;
        }
    
    }


    function colormode(event){
        if(event.checked===true){
            ColorBalls=true;
        }
        else{
            ColorBalls=false;
        }
        
    }
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      function closemodal(event){
        if(event.target==document.getElementById('aboutmodal')){
 document.getElementById('aboutmodal').style.display='none';
 var About = document.getElementById('About');
 About.style.visibility = "hidden";

        }
        if(event.keyCode===27){
            document.getElementById('aboutmodal').style.display='none';
            var About = document.getElementById('About');
            About.style.visibility = "hidden";
        }
       
      }