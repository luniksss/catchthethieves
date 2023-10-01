var GAME = {
    width: 1350,
    height: 625,
    background: "#669933"
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");
const carrotImage = document.getElementsByClassName('carrot');
const result = new Image();
result.src = "./img/result.jpg";
var ava = document.getElementById("ava");
var button = document.getElementById("startButton");
var back1 = document.getElementById('back1');
var back2 = document.getElementById('back2');
let attempts = 5;
let successCount = 0;
var carrots = [];
var carrots1 = [];
const winSound = new Audio();
winSound.src = "./sounds/win.m4a";
const loseSound = new Audio();
loseSound.src = "./sounds/bunny.m4a";


function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    DropText();
    RabbitCounter();
}

function drawBackground() {
    canvasContext.fillStyle = "#669933";
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = "#795c34";
    canvasContext.fillRect(400, 100, 600, 450);
}

function drawWin() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.drawImage(result, 0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = "orange";
    canvasContext.font = "50px Bradley Hand, cursive";
    canvasContext.textAlign = "center";
    canvasContext.fillText("All thieves caught!", 660, 350, 400);
}

function drawAlmostWin() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.drawImage(result, 0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = "orange";
    canvasContext.font = "50px Bradley Hand, cursive";
    canvasContext.textAlign = "center";
    canvasContext.fillText("Oh, we missed one...", 660, 350, 400);
}

function drawMediumWin() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.drawImage(result, 0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = "orange";
    canvasContext.font = "50px Bradley Hand, cursive";
    canvasContext.textAlign = "center";
    canvasContext.fillText("Wow! Caught half of it!", 660, 350, 400);
}

function drawTwoWin() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.drawImage(result, 0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = "orange";
    canvasContext.font = "50px Bradley Hand, cursive";
    canvasContext.textAlign = "center";
    canvasContext.fillText("One is good, two are better!", 660, 350, 400);
}

function drawOneWin() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.drawImage(result, 0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = "orange";
    canvasContext.font = "50px Bradley Hand, cursive";
    canvasContext.textAlign = "center";
    canvasContext.fillText("At least, we caught one!", 660, 350, 400);
}

function drawLose() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.drawImage(result, 0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = "orange";
    canvasContext.font = "50px Bradley Hand, cursive";
    canvasContext.textAlign = "center";
    canvasContext.fillText("Oh no! " + "The carrot could not be saved...", 660, 350, 400);
}

function onCarrotClicked(event) {
    const clickedCarrot = event.target;
    carrots.forEach(carrot => carrot.clicked = false);
    clickedCarrot.clicked = true;
}

for (let i = 0; i < 9; i++) {
    carrots1 = carrotImage[i];
    carrots1.addEventListener('click', onCarrotClicked);
    carrots[i] = document.getElementById(`carrot-${i}`);
}


function gameRound() {
    drawFrame();
    const randomIndex = Math.floor(Math.random() * carrots.length);
    const selectedCarrot = carrots[randomIndex];

    selectedCarrot.src = "./img/changeCarrot.png";

    setTimeout(() => {
        selectedCarrot.removeEventListener('click', onCarrotClicked);
        attempts -= 1;

        if (selectedCarrot.clicked) {
            selectedCarrot.src = "./img/bunnycarrot.png";
            winSound.play();
            carrots.splice(randomIndex, 1);
            setTimeout(() => {
                selectedCarrot.remove();
            }, 1500);
            successCount++;
        } else {
            loseSound.play();
            selectedCarrot.src = "./img/bunnypic.png";
            selectedCarrot.style.width = '80px';
            selectedCarrot.style.height = '100px';
            carrots.splice(randomIndex, 1);
            setTimeout(() => {
                selectedCarrot.remove();
            }, 1500);
        }

        if (attempts > 0) {
            requestAnimationFrame(gameRound);
        }
        if (attempts == 0) {
            canvasContext.clearRect(0, 0, GAME.width, GAME.height);
            if (successCount === 5) {
                drawWin();
            } else {
                if (successCount === 4) {
                    drawAlmostWin();
                } else {
                    if (successCount === 3) {
                        drawMediumWin();
                    } else {
                        if (successCount === 2) {
                            drawTwoWin();
                        } else {
                            if (successCount === 1) {
                                drawOneWin();
                            } else {
                                drawLose();

                            }
                        }
                    }
                }
            }
        }
    }, 4000);
}

function DropText() {
    canvasContext.fillStyle = "orange";
    canvasContext.font = "40px Bradley Hand, cursive";
    canvasContext.fillText("Attempts: " + attempts, 70, 55);
}

function RabbitCounter() {
    canvasContext.fillStyle = "orange";
    canvasContext.font = "40px Bradley Hand, cursive";
    canvasContext.fillText("Thiefs: " + successCount, 1090, 55);
}

function readyToPlay() {
    button.remove();
    ava.remove();
    back1.style.display = 'block';
    back2.style.display = 'block';
    document.getElementById('carrot-0').style.display = 'block';
    document.getElementById('carrot-1').style.display = 'block';
    document.getElementById('carrot-2').style.display = 'block';
    document.getElementById('carrot-3').style.display = 'block';
    document.getElementById('carrot-4').style.display = 'block';
    document.getElementById('carrot-5').style.display = 'block';
    document.getElementById('carrot-6').style.display = 'block';
    document.getElementById('carrot-7').style.display = 'block';
    document.getElementById('carrot-8').style.display = 'block';
    gameRound();
}