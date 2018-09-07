// <!-- Set Uo Variables ------------------------------->

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = 300;
const height = canvas.height = 300;
const ALLDOTS = 900;

let x = new Array(ALLDOTS);
let y = new Array(ALLDOTS);


let leftPressed = false;
let upPressed = false;
let rightPressed = true;
let downPressed = false;
let score;
let ingame = true;

// <!--------------------------------------------------->

/*

Button is clicked to start the game.
We create our snake and find a position for the apple...
We then call the update game function which in turn renders our content...

*/

function startGame() {

createSnake();
createApple();
setTimeout("updateGame();", 100);
}



function createSnake() {

dots = 3;

for (var z = 0; z < dots; z++) {
    x[z] = 100 - (10 * z);
     y[z] = 100;
}
}




// <!-- Picks a random spot to place the apple everytime this function is called -->

function createApple() {
    
appleX = Math.floor(Math.random() * 29);
appleY = Math.floor(Math.random() * 29);

appleX = appleX * 10;
appleY = appleY * 10;
console.log("AppleX: " + appleX);
console.log("AppleY: " + appleY);

}




// <!-- Renders the Canvas every update  -->

function draw() {

if (ingame) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "red";
    ctx.fillRect(appleX, appleY, 10, 10);

    ctx.font = "15px Arial";
    ctx.fillStyle = "white"
    ctx.fillText("Score: " + score, 10, 20);

    for (var z = 0; z < dots; z++) {
        if (z == 0) {
            ctx.fillStyle = "#35DE00";
            ctx.fillRect(x[z], y[z], 10, 10);
        } else {
            ctx.fillStyle = "#35DE00";
            ctx.fillRect(x[z], y[z], 10, 10);
        }
    }
}
 else {
return;
}
}





function move() {

for (var z = dots; z > 0; z--) {
    x[z] = x[(z - 1)];
    y[z] = y[(z - 1)];
}

if (rightPressed) {
    x[0] += 10;
}

if (leftPressed) {
    x[0] -= 10;
}

if (upPressed) {
    y[0] -= 10;
}

if (downPressed) {
    y[0] += 10;
}
}





// <!-- Checks for collision with Apple or a Wall -->

function collision() {

if (x[0] == appleX && y[0] == appleY) {
    console.log("hit");
    createApple();
    dots++;
    score++;
}

for (var z = 1; z < dots; z++) {
    if (x[0] == x[z] && y[0] == y[z]) {
        console.log("game over");
        ingame = false;
    }
}

if (x[0] < 0) {
    x[0] = width - 10;
}

if (x[0] > 300) {
    x[0] = 0;
}

if (y[0] < 0) {
    y[0] = height - 10;
}

if (y[0] > 300) {
    y[0] = 0;
}
}






// <!-- UPDATE CANVAS EVERY 50milliseconds -->
function updateGame() {
    
score = (dots - 3);
// console.log("score: " + score);
draw();
move();
collision();

id = setTimeout('updateGame();', 50);

if (!ingame) {
    clearTimeout(id);
    alert("Game OverMan! You got " + score + " points...");
    location.reload();
}
}




// <!-- Listen for Arrow directional buttons  -->

onkeydown = function (e) {

keys = e.keyCode;

if (keys == 37 && !rightPressed) {
    console.log("rightPressed");
    leftPressed = true;
    upPressed = false;
    downPressed = false;
}

if (keys == 39 && !leftPressed) {
    rightPressed = true;
    upPressed = false;
    downPressed = false;
}

if (keys == 38 && !downPressed) {
    leftPressed = false;
    rightPressed = false;
    upPressed = true;
}

if (keys == 40 && (!upPressed)) {
    leftPressed = false;
    rightPressed = false;
    downPressed = true;
}
}
