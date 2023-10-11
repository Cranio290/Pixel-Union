var cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 };
var cameraZoom = 1;
let MAX_ZOOM = 1000;
let MIN_ZOOM = 0.1;
let SCROLL_SENSITIVITY = 0.0005;

function draw()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Translate to canvas center before zoom
    ctx.translate( window.innerWidth / 2, window.innerHeight / 2 );
    ctx.scale(cameraZoom, cameraZoom);
    ctx.translate(  -window.innerWidth / 2 + positionX / cameraZoom, -window.innerHeight / 2 + positionY / cameraZoom );
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
    ctx2.clearRect(0,0, window.innerWidth, window.innerHeight);

  rendercvs();

    requestAnimationFrame( draw );
}

function getEventLocation(e)
{
    if (e.touches && e.touches.length == 1)
    {
        return { x:e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY)
    {
        return { x: e.clientX, y: e.clientY }        
    }
}

let isDragging = false;
let dragStart = { x: 0, y: 0 };

function onPointerDown(e)
{
    isDragging = true;
    dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x;
    dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y;
}

function onPointerUp(e) {
    isDragging = false;
    initialPinchDistance = null;
    lastZoom = cameraZoom;
}

function onPointerMove(e) {
    if (isDragging) {
      
        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x;
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y;
    }
}

function handleTouch(e, singleTouchHandler)
{
    if ( e.touches.length == 1 )
    {
        singleTouchHandler(e);
    }
    else if (e.type == "touchmove" && e.touches.length == 2)
    {
        isDragging = false;
        handlePinch(e);
    }
}

let initialPinchDistance = null;
let lastZoom = cameraZoom;

function handlePinch(e)
{
    e.preventDefault()
    
    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };
    
    let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2;
    
    if (initialPinchDistance == null)
    {
        initialPinchDistance = currentDistance;
    }
    else
    {
        adjustZoom( null, currentDistance/initialPinchDistance);
    }
}

function adjustZoom(zoomAmount, zoomFactor)
{
    if (!isDragging)
    {
        if (zoomAmount)
        {
            cameraZoom += zoomAmount
        }
        else if (zoomFactor)
        {
            cameraZoom = zoomFactor*lastZoom;
        }
        
        cameraZoom = Math.min( cameraZoom, MAX_ZOOM );
        cameraZoom = Math.max( cameraZoom, MIN_ZOOM );
    }
}

//canvas.addEventListener('mousedown', onPointerDown);
//canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown));
//canvas.addEventListener('mouseup', onPointerUp);
//canvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp));
//canvas.addEventListener('mousemove', onPointerMove);
//canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove));
canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY));

draw();

//pan
var cw = canvas.width;
var ch = canvas.height;

function reOffset(){
  var BB = canvas.getBoundingClientRect();
  offsetX = BB.left;
  offsetY = BB.top;        
}
var offsetX,offsetY;
reOffset();
window.onscroll = function(e){ reOffset(); }
window.onresize = function(e){ reOffset(); }

var isDown = false;
var startX, startY;

var positionX = window.innerWidth/2;
var positionY = window.innerHeight/2;

for(var x=0;x<100;x++){ ctx.fillText(x,x*20,ch/2); }
for(var y=-50;y<50;y++){ ctx.fillText(y,cw/2,y*20); }

$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").mouseup(function(e){handleMouseUp(e);});
$("#canvas").mouseout(function(e){handleMouseOut(e);});

function handleMouseDown(e){
  e.preventDefault();
  e.stopPropagation();

  startX = parseInt(e.clientX-offsetX);
  startY = parseInt(e.clientY-offsetY);

  isDown = true;
}

function handleMouseUp(e){
  e.preventDefault();
  e.stopPropagation();

  isDown = false;
}

function handleMouseOut(e){
  e.preventDefault();
  e.stopPropagation();

  isDown = false;
}

function handleMouseMove(e){

  if(!isDown){return;}
  
  e.preventDefault();
  e.stopPropagation();

  mouseX = parseInt(e.clientX-offsetX);
  mouseY  = parseInt(e.clientY-offsetY);

  var dx = mouseX-startX;
  var dy = mouseY-startY;

  startX = mouseX;
  startY = mouseY;

  positionX += dx;
  positionY += dy;
}