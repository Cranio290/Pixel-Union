ctx.imageSmoothingEnabled = false;
var pixeldata = ["green", "black", "blue", "yellow"];

var precanvas = new Image();
var canvasimg = new Image();
precanvas.src = '../canvas.png';
canvasimg.src = '../canvas.png';

var cachebreak = 0;

function updateimg() {
  cachebreak++;
  canvasimg.src = "../canvas.png?";
}

function changepixeldata(id, color) {
  pixeldata[id] = color;
}

function drawpixel(x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(x, y, 1, 1);
  ctx.fill();
  ctx.closePath();
}

function drawpixelchunk(sX, sY, repX, repY) {
  for (let i = 0; i < repX * repY; i++) {
  let px = sX + (i - Math.floor(i / repX) * repY);
  let py = sY + Math.floor(i / repY);

  drawpixel(px, py, pixeldata[px + py * gamecvs.width]);
  }
}

function setchunk(chunksize, crop) {
let newchunksize = Math.round(chunksize - (cameraZoom - crop) / 43);

let camX = Math.round(-1 * (cameraOffset.x - centX) - 30);
let camY = Math.round(-1 * (cameraOffset.y - centY) - 35);

if (-1 * camX > gamecvs.width/2) {
  var boundX = gamecvs.width;
} else {
  var boundX = gamecvs.width - chunksize;
}
if (-1 * camY > gamecvs.height/2) {
  var boundY = gamecvs.width;
} else {
  var boundY = gamecvs.height - chunksize;
}

let cvsX = Math.min(Math.max(0, camX), boundX);
let cvsY = Math.min(Math.max(0, camY), boundY);

drawpixelchunk(cvsX, cvsY, newchunksize, newchunksize);
}

setInterval(updateimg, 500);

function rendercvs() {

if (canvasimg.complete) {
ctx.drawImage(canvasimg, 0, 0);
precanvas.src = "../canvas.png?" + cachebreak;
} else {
  if (precanvas.complete) {
  ctx.drawImage(precanvas, 0, 0);
} else {
  //alert("error loading canvas");
}
}

if (cameraZoom > 15) {
setchunk(70, 15);
}
}
rendercvs();