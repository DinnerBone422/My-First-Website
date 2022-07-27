var canvasW, canvasH;

function preload() {

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  canvasW = window.innerWidth;
  canvasH = window.innerHeight;
  let fs = fullscreen;
}

function draw() {
  background("#7d889d");

  //drawSprites();
  extras();
  resize();
}

function resize() {
  if (canvasW < window.innerWidth || canvasW > window.innerWidth || canvasH < window.innerHeight || canvasH > window.innerHeight) {
    resizeCanvas(window.innerWidth, window.innerHeight);
    console.log("canvas resized");
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
  }
}

function extras() {
  if (keyDown("f")) {
    let fs = fullscreen();
    fullscreen([fs]);
  }
}