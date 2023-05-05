
var blockSize = 25;
var total_row = 17; //total row number
var total_col = 17; //total column number
var board;
var context;
 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
 
// Set the total number of rows and columns
var speedX = 0;  //speed of snake in x coordinate.
var speedY = 0;  //speed of snake in Y coordinate.
 
var snakeBody = [];
 
var foodX;
var foodY;
 
var gameOver = false;

var game;


var score=0;

var popup=document.getElementById("popup");
var title=document.getElementById("tit");
var popupScore=document.getElementById("skore");
var submitLeaderBoard=document.getElementById("leader");
var pauseBut=document.getElementById("pause");

var countleft=0;
var countright=0;
var countup=0;
var countdown=0;
var total=0;
//import { snakeSpeed } from "./setscript.js";

var isPause=0;

 
window.onload = function () {
    // Set board height and width
    
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");
    document.querySelector("#point").innerHTML = score;
    placeFood();
    document.addEventListener("keyup", changeDirection);  //for movements
    // Set snake speed
    game = setInterval(update, 100);
}

function pause(){
    isPause=1;
    title.innerHTML="Game Paused";
    popupScore.innerHTML="Current Score: ";
    submitLeaderBoard.innerHTML="Continue Playing";
    submitLeaderBoard.classList.add('cont');
    displayScore();
    document.querySelector("#point2").innerHTML = score;
    openPopUp();

}

function resetWords(){
    title.innerHTML="Game Over !";
    popupScore.innerHTML="Final Score:";
    submitLeaderBoard.innerHTML="Submit to Leaderboards";
    submitLeaderBoard.classList.remove('cont');
}

function reset(){
    isPause=0;
    resetWords();
    pauseBut.classList.remove('acti');

    countleft=0;
    countright=0;
    countup=0;
    countdown=0;
    total=0;
    
    speedX = 0;  //speed of snake in x coordinate.
    speedY = 0;  //speed of snake in Y coordinate.
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeBody = [];
    gameOver = false;
    score=0;
    document.querySelector("#point").innerHTML = score;
    clearInterval(game);
    placeFood();
    game=setInterval(update, 100);
    closePopUp();
    
}

function displayScore(){
    document.querySelector("#dist").innerHTML="Total distance traveled: "+total;
        document.querySelector("#l").innerHTML="Total left arrow pressed: "+countleft;
        document.querySelector("#r").innerHTML="Total right arrow pressed: "+countright;
        document.querySelector("#d").innerHTML="Total down arrow pressed: "+countdown;
        document.querySelector("#u").innerHTML="Total up arrow pressed: "+countup;
}
 
function update() {
    if (gameOver||isPause==1) {
        clearInterval(game);
        return;
    }
    total+=1;
 
    // Background of a Game
    context.fillStyle = "grey";
    context.fillRect(0, 0, board.width, board.height);
    // Set food color and position
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
 
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score+=1;
        document.querySelector("#point").innerHTML = score;
        placeFood();
    }
 
    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
 
    context.fillStyle = "green";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
 
    if (snakeX < 0
        || snakeX > total_col * blockSize
        || snakeY < 0
        || snakeY > total_row * blockSize) {
         
        // Out of bound condition
        gameOver = true;
        pauseBut.classList.add('acti');
        displayScore();
        document.querySelector("#point2").innerHTML = score;
        openPopUp();
        //alert("Game Over\nScore: "+ score);
    }
 
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
             
            // Snake eats own body
            gameOver = true;
            pauseBut.classList.add('acti');
            displayScore();
            document.querySelector("#point2").innerHTML = score;
            openPopUp();
            //alert("Game Over\nScore: "+ score);
        }
    }
}
 
// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
        countup++;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
        countdown++;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
        countleft++;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
        countright++;
    }else if(e.code=="Escape"){
        if(isPause==0&&gameOver==false){
            pause();
        }
        
    }
}

 
// Randomly place food
function placeFood() {
 
    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize;
     
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

let bu=document.getElementById("stats");

function openPopUp(){
    popup.classList.add("open-popup");
    overlay.classList.add('active');
    if(isPause==1){
        clearInterval(game);
    }
}

function closePopUp(){
    popup.classList.remove("open-popup");
    overlay.classList.remove('active');
    bu.classList.remove('act');
}

function XclosePopUp(){
    popup.classList.remove("open-popup");
    overlay.classList.remove('active');
    if(isPause!=1){
        bu.classList.add('act');
    }else{
        isPause=0;
        game=setInterval(update, 100);
        resetWords();
    }
    
}

function stl(){
    if(isPause==1){
        XclosePopUp();
        return;
    }else{
        console.log("Submitting to leaderboards..");
    }
}

function expand(){
    var dot=document.getElementById("dots");
    var more=document.getElementById("more");
    var expbut=document.getElementById("showmore");

    if(dot.style.display === "none"){
        expbut.innerHTML="Show More";
        more.style.display="none";
        dot.style.display="inline";
    }else{
        expbut.innerHTML="Show Less";
        more.style.display="inline";
        dot.style.display="none";
    }
}

