var gamecvs = {width: 500, height: 500};

var centX = window.innerWidth/2;
var centY = window.innerHeight/2;

var cameraZoom = 1;
let MAX_ZOOM = 1000;
let MIN_ZOOM = 0.1;
let SCROLL_SENSITIVITY = 0.0005;
var positionX = window.innerWidth/2;
var positionY = window.innerHeight/2;

function updateCoords() {
document.getElementById("coordtxt").innerText = "(" + Math.round(positionX - centX) + ", " + Math.round(positionY - centY) + ", " + Math.round(cameraZoom) + ")";
}

setInterval(updateCoords, 100);
 
var warnel = document.getElementById("warning");
var warntxt = document.getElementById("warntxt");

function fadeIn() {
  warnel.classList.add("fade-in");
}

function fadeOut() {
  warnel.classList.remove("fade-in");
}

function runwarn(txt) {
  warntxt.innerText = txt;
  warnel.style.opacity = 1;
  setTimeout(function () {
    warnel.style.opacity = 0;
  }, 1000)
}

setTimeout(function () {
  runwarn("hello");
}, 2000);
