var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var color = document.getElementById("pallette");
var r;
var g;
var b;

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');

var gamecvs = {width: 500, height: 500};

var centX = window.innerWidth/2;
var centY = window.innerHeight/2;

var width = 0;
var height = 0;
var canvasX = 0;
var canvasY = 0;
var canvasW = 0;
var canvasH = 0;
var MouseX = 0;
var MouseY = 0;
var pixelID = 0;

canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight

function getColor() {
 r = parseInt(color.value.substr(1,2), 16);
 g = parseInt(color.value.substr(3,2), 16);
 b = parseInt(color.value.substr(5,2), 16);
}

function getPixelID(x, y) {
  if (x > canvasX & x < canvasX + canvasW & y > canvasY & y < canvasY + canvasH) {
    const cvsMouseX = (x - canvasX) / cameraZoom;
    const cvsMouseY = (y - canvasY) / cameraZoom;

    pixelID = (Math.floor(cvsMouseY) * gamecvs.width) + (Math.floor(cvsMouseX) + 1);
    getColor();
    sendPixel(Math.floor(cvsMouseX), Math.floor(cvsMouseY), r, g, b, 0)
  }
}
function getCoords(event) {
  const rect = canvas.getBoundingClientRect();
  
  MouseX = event.clientX - rect.left;
  MouseY = event.clientY - rect.top;

  width = gamecvs.width * cameraZoom;
  height = gamecvs.height * cameraZoom;

  canvasX = centX + (cameraOffset.x - centX) * cameraZoom;
  canvasY = centY + (cameraOffset.y - centY) * cameraZoom;

  canvasW = gamecvs.width * cameraZoom;
  canvasH = gamecvs.height * cameraZoom;
}

document.addEventListener("click", function(event) {
  getCoords(event);
  getPixelID(MouseX, MouseY);
  //alert(cvsMouseX + "n" + cvsMouseY);
  //send(Math.floor(cvsMouseX), Math.floor(cvsMouseY), 255, 0, 0, 0);
});

