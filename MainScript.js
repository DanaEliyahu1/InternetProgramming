
//window.addEventListener("load", Start, false)
var shape = new Object();
//var score;
var pac_color;

var time_elapsed;
var interval;
var canvas;
var board;
var context;
var pac_direction = "left";
var MovePoint = new Object();
var monster = [];
var ColorBallsArr = [];


function Start() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    initTimer();
    clearInterval(interval);
    board = new Array();

    pac_color = "yellow";
    var cnt = 100;
    var food_remain = currnumofballs;
    var pacman_remain = 1;
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    food_remain--;
                    board[i][j] = 1;
                    if (ColorBalls === true) {
                        var Ball = new Object();
                        Ball.i = i;
                        Ball.j = j;
                        Ball.type = FindRandomBallType();
                        ColorBallsArr.push(Ball);
                    }
                    
                } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }

                cnt--;
            }
        }
    }
    for (var m = 0; m < num_of_monster; m++) {
        monster[m]=FindEmptyCorner();
        board[monster[m].i][monster[m].j] = 3;

    }
    MovePoint = FindEmptyCorner();
    board[MovePoint.i][MovePoint.j] = 5;
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
        if (ColorBalls === true) {
            var Ball = new Object();
            Ball.i = emptyCell[0];
            Ball.j = emptyCell[1];
            Ball.type = FindRandomBallType();
            ColorBallsArr.push(Ball);
        }
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval = setInterval(UpdatePosition, 500);
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 9) + 1);
    var j = Math.floor((Math.random() * 9) + 1);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 9) + 1);
        j = Math.floor((Math.random() * 9) + 1);
    }
    return [i, j];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown[up_key]) {
        pac_direction = "up";
        return 1;
    }
    if (keysDown[down_key]) {
        pac_direction = "down";
        return 2;
    }
    if (keysDown[laft_key]) {
        pac_direction = "left";
        return 3;
    }
    if (keysDown[right_key]) {
        pac_direction = "right";
        return 4;
    }
}

function DrawPacman(pac_direction, center) {
    if (pac_direction === "right") {
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
    }
    else if (pac_direction === "left") {
        context.beginPath();
        context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
    }
    else if (pac_direction === "down") {
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
    }
    else if (pac_direction === "up") {
        context.beginPath();
        context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
    }

}


function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
     context.beginPath();
     context.rect(0,0 ,canvas.width, canvas.height);
     context.fillStyle= "#ddffcc";
     context.fill();
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] === 2) {
                DrawPacman(pac_direction, center);
            } else if (board[i][j] === 1) {
                drawPoints(i, j, center);
            } else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
            else if (board[i][j] === 3) {
                var img=new Image();
                img.src="monster.png";
                context.drawImage(img,center.x-30,center.y-30,60,60);
            }
            else if (board[i][j] === 5) {
                var img=new Image();
                img.src="flower.png";
                context.drawImage(img,center.x-30,center.y-30,60,60);
            }
            else if (board[i][j] === 31) {
                var img=new Image();
                img.src="monster.png";
                context.drawImage(img,center.x-30,center.y-30,60,60);
                drawPoints(i, j, center);
            }
            else if (board[i][j] === 51) {
                var img=new Image();
                img.src="flower.png";
                context.drawImage(img,center.x-30,center.y-30,60,60);
                drawPoints(i, j, center);
            }
            else if (board[i][j] === 23) {
                var img=new Image();
                img.src="monster.png";
                context.drawImage(img,center.x-30,center.y-30,60,60);
                DrawPacman(pac_direction, center);
            }
            else if (board[i][j] === 6) {
                var img=new Image();
                img.src="clock.png";
                context.drawImage(img,center.x-30,center.y-30,60,60);
            }
            else if (board[i][j] === 61) {
                var img=new Image();
                img.src="clock.png";
                context.drawImage(img,center.x-30,center.y-30,60,60);
                drawPoints(i, j, center);
            }
            else if (board[i][j] === 65) {
                var img=new Image();
                img.src="clock.png";
                context.drawImage(img,center.x-30,center.y-30,60,60);
                var img=new Image();
                img.src="flower.png";
                context.drawImage(img,center.x-30,center.y-30,60,60);
                
            }

        }
    }


}

function UpdatePosition() {
    //pacman
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
        UpdateMonsterPosition();
        if (MovePoint.i !== -1 && MovePoint.j !== -1) {
            UpdateMovePointPosition();
        }  
        addClock();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }
    }
    if (x === 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
    }
    if (x === 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] === 1) {
        AddPointsToPacman(findBallType(shape.i, shape.j));
        currnumofballs=currnumofballs-1;
        board[shape.i][shape.j] = 2;
    }
    else if (board[shape.i][shape.j] === 5) {
        AddPointsToPacman(50);
        MovePoint.i = -1;
        MovePoint.j = -1;
        board[shape.i][shape.j] = 2;
    }
    else if (board[shape.i][shape.j] === 51) {
        AddPointsToPacman(50 + findBallType(shape.i, shape.j));
        currnumofballs=currnumofballs-1;
        MovePoint.i = -1;
        MovePoint.j = -1;
        board[shape.i][shape.j] = 2;
    } else if (board[shape.i][shape.j] === 3) {
        LosePointsToPacman(10);
        board[shape.i][shape.j] = 23;
        clearInterval(interval);
        LoseLife();
        
    }
    else if (board[shape.i][shape.j] === 31) {
        AddPointsToPacman(findBallType(shape.i, shape.j));
        LosePointsToPacman(10);
        board[shape.i][shape.j] = 23;
        currnumofballs=currnumofballs-1;
        stopgame();
        LoseLife();
       
    }else if (board[shape.i][shape.j] === 6) {
        initTimer();
        board[shape.i][shape.j] = 2;
    }
    else if (board[shape.i][shape.j] === 61) {
        initTimer();
        AddPointsToPacman(findBallType(shape.i, shape.j));
        currnumofballs=currnumofballs-1;
        board[shape.i][shape.j] = 2;
    }
    else if (board[shape.i][shape.j] === 65) {
        AddPointsToPacman(50 + findBallType(shape.i, shape.j));
        currnumofballs=currnumofballs-1;
        MovePoint.i = -1;
        MovePoint.j = -1;
        initTimer();
        board[shape.i][shape.j] = 2;

    }
    if(currnumofballs===0){
        Draw();
        endGame();
    }
    
    
    else if (board[shape.i][shape.j] === 0) {
        board[shape.i][shape.j] = 2;
    }
    time_elapsed=updateCurrentScore();
    if (GetScore() >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (time_elapsed >= TimerLimit) {
        endGame();
    } else {
        Draw();
    }

}

function drawPoints(i, j, center) {
    if (ColorBalls === false) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
    } else {
        var color = -1;
        for (var cb = 0; cb < ColorBallsArr.length; cb++) {
            if (ColorBallsArr[cb].i === i && ColorBallsArr[cb].j === j) {
                color = ColorBallsArr[cb].type;
                break;
            }
        }
        if (color === 5) {
            context.beginPath();
            context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
            context.fillStyle =color_ball5; //color
            context.fill();
        } else if (color === 15) {
            context.beginPath();
            context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
            context.fillStyle = color_ball15; //color
            context.fill();
        }
        else if (color === 25) {
            context.beginPath();
            context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
            context.fillStyle =color_ball25; //color
            context.fill();
        }
        
    }
}
function FindRandomBallType() {
    var randomnum = Math.floor((Math.random() * 100) + 1);
    if (randomnum < 60) {
        return 5;
    }
    else if (randomnum < 90) {
        return 15;
    }
    return 25;
}

function UpdateMonsterPosition() {

    for (var m = 0; m < monster.length; m++) {
        if (board[monster[m].i][monster[m].j] === 3) {
            board[monster[m].i][monster[m].j] = 0;
        }
        else if (board[monster[m].i][monster[m].j] === 31) {
            board[monster[m].i][monster[m].j] = 1;
        }
        
        var deltax = monster[m].i - shape.i;
        var deltay = monster[m].j - shape.j;
        if (Math.abs(deltax) > Math.abs(deltay)) {
            if (deltax < 0) {
                if (board[monster[m].i+1][monster[m].j] !== 4) {
                        monster[m].i++;
                }
                
            }
            else {
                if (board[monster[m].i-1][monster[m].j] !== 4) {
                    monster[m].i--;
                }
               
            }
        }
        else {
            if (deltay < 0) {
                if (board[monster[m].i][monster[m].j+1] !== 4) {
                    monster[m].j++;
                }
               
            }
            else {
                if (board[monster[m].i][monster[m].j-1] !== 4) {
                    monster[m].j--;
                }
            }
        }
        if (board[monster[m].i][monster[m].j] === 1) {
            board[monster[m].i][monster[m].j] = 31;
        }
        else if (board[monster[m].i][monster[m].j] === 0) {
            board[monster[m].i][monster[m].j] = 3;
        }
        else if (board[monster[m].i][monster[m].j] === 5) {
            board[monster[m].i][monster[m].j] = 3;
        }
        
        
    }

}

function UpdateMovePointPosition() {
    if (board[MovePoint.i][MovePoint.j] === 5) {
        board[MovePoint.i][MovePoint.j] = 0;
    }
    else if (board[MovePoint.i][MovePoint.j] === 51) {
        board[MovePoint.i][MovePoint.j] = 1;
    }
    else if (board[MovePoint.i][MovePoint.j] === 65) {
        board[MovePoint.i][MovePoint.j] = 6;
    }
    var randomnum = Math.floor((Math.random() *4) + 1);
    if (randomnum === 1) {
        if (MovePoint.j > 0 && board[MovePoint.i][MovePoint.j - 1] !== 4) {
            MovePoint.j--;
        }
    }
    if (randomnum === 2) {
        if (MovePoint.j < 9 && board[MovePoint.i][MovePoint.j + 1] !== 4) {
            MovePoint.j++;
        }
    }
    if (randomnum === 3) {
        if (MovePoint.i > 0 && board[MovePoint.i - 1][MovePoint.j] !== 4) {
            MovePoint.i--;
        }
    }
    if (randomnum === 4) {
        if (MovePoint.i < 9 && board[MovePoint.i + 1][MovePoint.j] !== 4) {
            MovePoint.i++;
        }
    }
    if (board[MovePoint.i][MovePoint.j] === 1) {
        board[MovePoint.i][MovePoint.j] = 51;
    }
    else if (board[MovePoint.i][MovePoint.j] === 0) {
        board[MovePoint.i][MovePoint.j] = 5;
    }
    else if (board[MovePoint.i][MovePoint.j]  === 3) {
        board[MovePoint.i][MovePoint.j] = 3;
    }
    else if (board[MovePoint.i][MovePoint.j]  === 6) {
        board[MovePoint.i][MovePoint.j] =65;
    }

}
function findBallType(i, j) {
    if (ColorBalls === false) {
        return 1;
    }
    for (var cb = 0; cb < ColorBallsArr.length; cb++) {
        if (ColorBallsArr[cb].i === i && ColorBallsArr[cb].j === j) {
            return ColorBallsArr[cb].type;
            
        }
    }
}
function FindEmptyCorner() {
    var shape_point = new Object();
    shape_point.i = 0;
    shape_point.j = 0;
    var corners = [[0, 0], [0, 9], [9, 0], [9, 9]];
    while(true){
    var counter = 0;
    for (var i = 0; i < 4; i++) {
        if (board[corners[i][0]][corners[i][1]] === 0) {
            counter++;
        }
    }
    if (counter > 0) {
        var randomnum = Math.floor((Math.random() * counter) + 1);
        var notempty = 0;
        if (randomnum === 1) {
            if (board[corners[0][0]][corners[0][1]] === 0) {
                return shape_point;
            }
            else notempty++;
        }
        if (randomnum === 2 - notempty) {
            if (board[corners[1][0]][corners[1][1]] === 0) {
                shape_point.j = 9;
                return shape_point;
            }
            else notempty++;
        }
        if (randomnum === 3 - notempty) {
            if (board[corners[2][0]][corners[2][1]] === 0) {
                shape_point.i = 9;
                return shape_point;
            }
            else notempty++;
        }
        if (randomnum === 4 - notempty) {
            if (board[corners[3][0]][corners[3][1]] === 0) {
                shape_point.j = 9;
                shape_point.i = 9;
                return shape_point;
            }
            else notempty++;

        }
    }
    else{
        corners[0][0]=corners[0][0]+1;
        corners[1][0]=corners[0][0]+1;
        corners[2][0]=corners[0][0]-1;
        corners[3][0]=corners[0][0]-1;
    }
}
}
function addClock(){
    var randomNum=Math.floor((Math.random() * 90) + 1);
    if(randomNum===1){
        var i=Math.floor((Math.random() * 10));
        var j=Math.floor((Math.random() * 10));
        if(board[i][j]===0){
            board[i][j]=6;
        }
        else if(board[i][j]===1){
            board[i][j]=61;
        }
        else if(board[i][j]===5){
            board[i][j]=65;
        }
    }






}