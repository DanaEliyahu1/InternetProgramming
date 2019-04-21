function chooseKeys() {
   // var left;
    //var right;
    //var up;
    //var down;
    var keys = [];
    document.getElementById("instructionForKeys").innerHTML 
        = "On your keyboard click on the keys you want for moving:1. left 2. right 3. up 4. down";
    document.addEventListener('keydown', function (event) {
        var key = event.key; // "a", "1", "Shift", etc.
        keys.push(key);
        if (keys.length > 3) {
            document.getElementById("chosenKeys").innerHTML
                = " You chose left" + keys[0] + " right:" + keys[1] + " up:"+keys[2] + " down:"+keys[3];
        }
    });

    
        
}