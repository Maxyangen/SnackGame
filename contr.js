
window.onload = onPageLoaded;

var gameInterval
var apple
var score
var BLOCK_SIZE=20;
var BLOCK_COUNT=30;
var windowHeight;
var windowWidth;

function gameStart() {
    
    snack = {
        body :[
            { x: BLOCK_COUNT / 2 , y: BLOCK_COUNT / 2}
        ],
        size :5,
        direction : {x:0 , y:-1} //下{x:0,y:1} 左{x:-1,y:0} 右{x:1,y:0}

    }
    gameInterval = setInterval(gameRoutine,200);  //刷新間隔
    putApple();
    updateScore(0);
}

function gameRoutine(){
    moveSnack();
    if(snackIsDead()){
        gameOver();
        return;
    }

    if(snack.body[0].x === apple.x && snack.body[0].y === apple.y){
        eatApple();
    }

    updateCanvas();
}

function updateCanvas(){
    var canvas = document.getElementById('canvas_id');
    var context = canvas.getContext('2d');

    context.fillStyle = '#ffd9ec';
    context.fillRect(0,0,canvas.width,canvas.height);

    context.fillStyle = 'black';
    for(var i=0; i < snack.body.length; i++){
        context.fillRect(
            snack.body[i].x * BLOCK_SIZE ,
            snack.body[i].y * BLOCK_SIZE ,
            BLOCK_SIZE -1,
            BLOCK_SIZE -1
        )
    }

    context.fillStyle = 'blue';
    context.fillRect(
        apple.x * BLOCK_SIZE + 1 ,
        apple.y * BLOCK_SIZE + 1,
        BLOCK_SIZE -1,
        BLOCK_SIZE -1
    );

    
      
        


}

function moveSnack(){
    var newBlock = {
        x: snack.body[0].x + snack.direction.x,
        y: snack.body[0].y + snack.direction.y
    }

    snack.body.unshift(newBlock);  //加到頭

    while(snack.body.length > snack.size){
        snack.body.pop(); //把多的尾巴刪掉
    }


}

function onPageLoaded(){
    document.addEventListener('keydown', handleKeyDown);
    console.log("width" + document.body.clientWidth);
    console.log("height" + document.body.clientHeight);
    initGameView();
    
}

function handleKeyDown(event){
    var originX = snack.direction.x;
    var originY = snack.direction.y;

    if(event.keyCode === 37){
        snack.direction.x = originY;
        snack.direction.y = -originX;
    }
    else if(event.keyCode === 39){
        snack.direction.x = -originY;
        snack.direction.y = originX;
    }
}

function snackIsDead(){
    
    if(snack.body[0].x < 0 || snack.body[0].x >= BLOCK_COUNT || snack.body[0].y < 0 || snack.body[0].y >= BLOCK_COUNT){
        return true;
    }

    for(var i = 1 ; i < snack.body.length; i++){
        if(snack.body[0].x === snack.body[i].x && snack.body[0].y === snack.body[i].y)
            return true;
    }

    return false;
}

function gameOver(){
    clearInterval(gameInterval);
    initGameView();
}

function putApple(){
    apple = {
        x: Math.floor(Math.random() * BLOCK_COUNT),
        y: Math.floor(Math.random() * BLOCK_COUNT)
    }

    for(var i = 0 ; i < snack.body.length; i++){
        if(snack.body[i].x === apple.x && snack.body[i].y === apple.y)
            putApple();
            break;
    }

}

function eatApple(){
    snack.size += 1;
    if(snack.size == 10){
        gameInterval = setInterval(gameRoutine,150);
    }  
    putApple();
    updateScore(score+1);

    

}

function updateScore(newScore){
    score = newScore;
    document.getElementById('score_id').innerHTML = score;

}


function initGameView(){
    var canvas = document.getElementById('canvas_id');
    var context = canvas.getContext('2d');
    canvas.addEventListener("click",onclick,false);
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width,canvas.height);

    context.font = "50px serif";
    context.fillStyle = "white";
    context.fillText("Snack Game",canvas.width/2-100,canvas.height/2);
    context.fillText("click mouse",canvas.width/2-100,canvas.height/2+100);




}

function onclick(event){
    gameStart();
}