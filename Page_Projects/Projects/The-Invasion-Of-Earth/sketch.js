var canvasW, canvasW, gameState, play, end;
var player, playerImg, leftAlien, rightAlien, blueAlienImg, greenAlienImg, redAlienImg, alienBullet;
var gameOver, gameOverImg, restart, restartImg;
var playerBulletsGroup, aliensGroup, alienBulletsGroup, leftAliensGroup, rightAliensGroup;
var bulletsRemain, timerMin, timerSec, timmerFin, kills;

function preload() {
  playerImg = loadImage("./assets/playerImg.png");

  blueAlienImg = loadImage("./assets/blueAlienImg.png");
  greenAlienImg = loadImage("./assets/greenAlienImg.png");
  redAlienImg = loadImage("./assets/redAlienImg.png");

  gameOverImg = loadImage("./assets/gameOverImg.png");
  restartImg = loadImage("./assets/restartImg.png");

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  player = createSprite(window.innerWidth/2, window.innerHeight/1.15);
  player.addImage(playerImg);
  player.scale = 0.2;

  gameOver = createSprite(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.75;
  gameOver.visible = false;

  restart = createSprite(window.innerWidth/2, window.innerHeight/1.2);
  restart.addImage(restartImg);
  restart.scale = 1;
  restart.visible = false;
  restart.depth = gameOver.depth + 1;

  playerBulletsGroup = new Group();
  aliensGroup = new Group();
  alienBulletsGroup = new Group();
  leftAliensGroup = new Group();
  rightAliensGroup = new Group();

  canvasW = window.innerWidth;
  canvasH = window.innerHeight;

  play = 0;
  end = 1;
  gameState = play;
  bulletsRemain = 100;
  timerMin = 1;
  timerSec = 0;
  kills = 0;

  let fs = fullscreen();

  console.log("Press Left and Right arrow keys to move your Space-Ship");
  console.log("Press Space to deploy Missiles at The aliens");
  console.log("Press F to fullscreen your Game for the best experince");
}

function draw() {
  if (gameState === play) {
    collisions();
    timer();
    if (bulletsRemain <= 0) {
      gameState = end;
    }
    playerMovement();
    spawnAliens();
    noCursor();
  }

  else if (gameState === end) {
    gameOver.visible = true;
    restart.visible = true;
    playerBulletsGroup.destroyEach();
    aliensGroup.destroyEach();
    if (mousePressedOver(restart)) {
      reset();
    }
    cursor();
  }

  extras();
  resize();
  background(10,5,4);
  drawSprites();
  dev();
  textSize(25);
  fill("White");
  if (gameState === play) {
  text("Press Left and Right Arrow Keys to move Your Space Ship   Press SpaceBar to launch Your Missiles   Press F to fullscreen", 0, window.innerHeight - 10);
  text("Time Left: " + timerMin + ":" + round(timerSec), 0, 20);
  text("Bullets Left: " + bulletsRemain, 0, 45);
  text("Kills: " + kills, 0, 70);
  }
  if (timerMin <= -1) {
    timerFin = 0;
  }
  else if (timerMin >= 0) {
    timerFin = timerMin;
  }
  if (gameState === end) {
    if (kills >= 20) {
      textSize(100);
      text("YOU WON", window.innerWidth/3.5, window.innerHeight/3 - 40);
    }
    if (kills < 20) {
      textSize(100);
      text("YOU LOST", window.innerWidth/3.5, window.innerHeight/3 - 40);
    }
    textSize(25);
    text("Kills: " + kills, window.innerWidth/2-30, window.innerHeight/1.25 - 50);
    text("Time Left: " + timerFin +":" + round(timerSec), window.innerWidth/2-30, window.innerHeight/1.25 - 75);
  }
}

function reset() {
  gameOver.visible = false;
  restart.visible = false;
  player.x = window.innerWidth/2;
  gameState = play;
  bulletsRemain = 100;
  kills = 0;
  timerMin = 1;
  timerSec = 0;
}

function resize() {
  if (canvasW < window.innerWidth || canvasW > window.innerWidth || canvasH < window.innerHeight || canvasH > window.innerHeight) {
    resizeCanvas(window.innerWidth, window.innerHeight);
    console.log("canvas resized");
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
  }
}

function playerMovement() {
  if (keyDown("left") && player.x >= 0) {
    player.x = player.x - 15;
  }

  if (keyDown("right") && player.x <= window.innerWidth) {
    player.x = player.x + 15;
  }
}

function keyTyped() {
  if (key === " " && gameState === play && bulletsRemain >= 1) {
    playersBullets();
  }
}

function playersBullets() {
  if (gameState === play) {
    var playerBullet = createSprite(player.x, player.y, window.innerWidth/70, window.innerHeight/15);
    playerBullet.setCollider("rectangle", 0, 0, window.innerWidth/70, window.innerHeight/15);
    playerBullet.velocityY = - 15;
    playerBullet.debug = true;
    playerBulletsGroup.add(playerBullet);
    playerBullet.lifetime = 750;
    bulletsRemain = bulletsRemain - 1;
  }
}

function spawnAliens() {
  if (frameCount%150===0) {
    var leftAlien = createSprite(-10, random(30, window.innerHeight/2), 40, 40);

    switch(Math.round(random(2, 3))) {
      case 1:
      leftAlien.addImage(blueAlienImg);
      leftAlien.scale = 0.3;
      break;

      case 2:
      leftAlien.addImage(greenAlienImg);
      leftAlien.scale = 0.25;
      leftAlien.setCollider("rectangle", 0, 0, 275, 300);
      break;

      case 3:
      leftAlien.addImage(redAlienImg);
      leftAlien.scale = 0.08;
      leftAlien.setCollider("rectangle", 0, 0, 900, 900);
      break;

      default:
      break;
    }
    leftAlien.velocityX = 4;
    aliensGroup.add(leftAlien);
    leftAliensGroup.add(leftAlien);
    leftAlien.debug = true;
  }

  if (frameCount%160===0) {
    var rightAlien = createSprite(window.innerWidth + 10, random(30, window.innerHeight/2), 40, 40);

    switch(Math.round(random(2, 3))) {
      case 1:
      rightAlien.addImage(blueAlienImg);
      rightAlien.scale = 0.3;
      break;

      case 2:
      rightAlien.addImage(greenAlienImg);
      rightAlien.scale = 0.25;
      rightAlien.setCollider("rectangle", 0, 0, 275, 300);
      break;

      case 3:
      rightAlien.addImage(redAlienImg);
      rightAlien.scale = 0.08;
      rightAlien.setCollider("rectangle", 0, 0, 900, 900);
      break;

      default:
      break;
    }
    rightAlien.velocityX = -4;
    aliensGroup.add(rightAlien);
    rightAliensGroup.add(rightAlien);

    rightAlien.debug = true;
  }
}
function collisions() {
  if (aliensGroup.isTouching(playerBulletsGroup)) {
    for (var i=0;i<aliensGroup.length;i++) {     
      if (aliensGroup[i].isTouching(playerBulletsGroup)) {
        aliensGroup[i].destroy();
        kills = kills + 1;
      } 
    }
  }
}

function timer() {
  timerSec = timerSec - 0.033;
  if (timerSec < 2 && timerSec > 0) {
    timerMin = timerMin - 1;
    timerSec = timerSec - 2;
  }
  if (timerMin <= -1 ) {
    gameState = end;
  }
  else if (timerSec <= 0) {
    timerSec = 60;
  }
}

function extras() {
  if (keyDown("f")) {
    let fs = fullscreen();
    fullscreen([fs]);
  }
}

function dev() {
  if (keyDown("o")) {
    gameState = end;
  }
}