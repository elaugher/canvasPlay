"use strict";

//define game elements
const blockSize = 25;
const rows = 20;
const columns = 20;
const scoreBoard = document.getElementById("score-counter");

let canvas;
let context;

//define snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let snakeDX = 0;
let snakeDY = 0;
let snakeBody = [];


//define food
let foodX;
let foodY;

//defien gameend
let gameOver = false;


window.onload = function (){
    canvas = document.getElementById("game-area");
    canvas.height = rows*blockSize;
    canvas.width = columns*blockSize;
    context = canvas.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //updateCanvas();
    setInterval(updateCanvas,1000/10); //100 millisecs
}

function updateCanvas(){
    if(gameOver){
        location.reload();
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);

    //draw food
    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    //food collison checker
    if (snakeX === foodX && snakeY === foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
        scoreBoard.textContent = snakeBody.length;
    }

    //draw snake body
    for(let i = snakeBody.length-1; i>0 ;i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX,snakeY];
    }

    //draw snake
    context.fillStyle = "lime";
    snakeX += snakeDX * blockSize;
    snakeY += snakeDY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for (let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if(snakeX <0 || snakeY <0 || snakeX > columns*blockSize || snakeY > rows*blockSize){
        gameOver = true;
        alert("Game Over! Your Score: " + snakeBody.length);
    }
    for (let i=0; i<snakeBody.length;i++){
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]){
            gameOver = true;
            alert("Game Over! Your Score: " + snakeBody.length);
        }
    }
    
}

function changeDirection(key){
    if (key.code === "ArrowUp" && snakeDY != 1) {
        snakeDX = 0;
        snakeDY = -1;
    } else if (key.code === "ArrowDown" && snakeDY != -1) {
        snakeDX = 0;
        snakeDY = 1;
    } else if (key.code === "ArrowLeft" && snakeDX != 1) {
        snakeDX = -1;
        snakeDY = 0;
    } else if (key.code === "ArrowRight" && snakeDX != -1) {
        snakeDX = 1;
        snakeDY = 0;
    }

}

function placeFood(){
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    for (let i=0; i<snakeBody.length;i++){
        if(foodX === snakeBody[i][0] && foodY === snakeBody[i][1]){
            placeFood();
            break;
        }
    }
    if(foodX === snakeX && foodY === snakeY){
        placeFood();
    }
}