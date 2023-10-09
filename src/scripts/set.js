function updateCoords() {
document.getElementById("coordtxt").innerText = "(" + Math.round(cameraOffset.x - centX) + ", " + Math.round(cameraOffset.y - centY) + ", " + Math.round(cameraZoom) + ")";
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