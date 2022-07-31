
function preload() {

}

function setup() {
  let fs = fullscreen;
}

function draw() {
  background("#7d889d");

  //drawSprites();
  extras();
}

function extras() {
  if (keyDown("f")) {
    let fs = fullscreen();
    fullscreen([fs]);
  }
}