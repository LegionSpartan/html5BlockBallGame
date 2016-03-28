var canvas = document.getElementById("gameCanvas");
var contx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-10;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2 //starting point of padle on screen

var dx = 2;
var dy = -2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount=3;
var brickColumnCount=5;
var brickWidth=75;
var brickHeight=20;
var brickPadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=30;
var bricks= [];

var score = 0;
var lives = 3;

//populate brick array 2d
for(var c=0; c<brickColumnCount; c++) {
bricks[c] = [];
for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 ,  status: 1};
}
}

var randomColor = getRandomColor();

function ball(randomColor) {
    contx.beginPath();
    contx.arc(x, y, ballRadius, 0, Math.PI*2, false);
    contx.fillStyle = "#"+randomColor;
    contx.fill();
    contx.closePath();
}

function paddle() {
    contx.beginPath();
    contx.rect(paddleX, canvas.height-paddleHeight, paddleWidth,paddleHeight);
    contx.fillStyle = "#0095DD";
    contx.fill();
    contx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            contx.beginPath();
            contx.rect(brickX, brickY, brickWidth, brickHeight);
            contx.fillStyle = "#0095DD";
            contx.fill();
            contx.closePath();
            }
        }
    }
}

function collisionDetection(){
    
    for (c=0; c<brickColumnCount; c++){
        
        for (r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            
            if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight && b.status==1){
                dy=-dy;
                b.status = 0;
                score++;
                randomColor = getRandomColor();
                if(score== brickColumnCount*brickRowCount){
                    alert("YOU WON NIGGA! go die die die NOW :)")
                    document.location.reload();
                }
            }
        }
    }
}

function drawScore(){
    contx.beginPath();
    contx.font = "16px Arial";
    contx.fillStyle = "#0095DD";
    contx.fillText("Score: "+score, 8 ,20);
    contx.closePath();
}

function mouseMoveHandler(e){
    
    var relativeX = e.clientX - canvas.offsetLeft;
    //left side of the screen handled
    if(relativeX > 0 && relativeX < canvas.width/2){
        paddleX = relativeX ;
    }else if(relativeX > canvas.width/2 && relativeX < canvas.width){
    //right side of the screen hadnled
        paddleX = relativeX - paddleWidth;
    }
}

function drawLives(){
    contx.beginPath();
    contx.font="16px Arial";
    contx.fillStyle="#0095DD";
    contx.fillText("Lives: "+lives, canvas.width-65, 20);
    contx.closePath();
}

//game loop
function draw() {
    contx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    ball(randomColor);
    paddle();
    collisionDetection();
    drawScore();
    drawLives();

    if(x + dx > canvas.width-ballRadius || x+dx < ballRadius){
        dx= -dx;
    }
    
    if(y+dy < ballRadius){
        dy = -dy;
    }else if(y+dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }else{
            lives--;
            if(!lives){   
            alert("You Losssssst! Fuck OFF")
            document.location.reload();
            }else{
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 7;
    }else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode==39){
        rightPressed=true;
    }else if(e.keyCode==37){
        leftPressed=true;
    }
    
}

function keyUpHandler(e) {
    if(e.keyCode==39){
        rightPressed=false;
    }else if(e.keyCode==37){
        leftPressed=false;
    }
    
}

document.addEventListener("mousemove", mouseMoveHandler, false);

draw();