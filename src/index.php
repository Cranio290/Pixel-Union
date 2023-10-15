<?php
  if ($_SERVER["REQUEST_URI"] != "/") {
    exit(header("Location: /404.html"));
  }
?>
<html>
  <head>
    <title>Cool pixel game</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="style.css">
  </head>
  <body>

<canvas id="canvas"></canvas>
<canvas id="canvas2" style="position: absolute; top: 0; left: 0;"></canvas>

<div id="warning" class="box">
<p id="warntxt">warning</p>
</div>

<div id="pixelbox" class="box">
  <b><p>Pixel:</p></b>
  <p id="pixeltxt">(0, 0) 0</p><br>
  <b><p>User: </p></b>
  <p id="usernametxt">username</p><br>
  <b><p>Date (UTC): </p></b>
  <p id="datetxt">date</p>
</div>

<div id="coordbox" class="box"><p id="coordtxt">0, 0</p></div>

<input id="pallette" type="color">

<script src="scripts/set.js"></script>
<script src="scripts/placepixels.js"></script>
<script src="scripts/render.js">
</script>
<script src="scripts/panzoom.js"></script>
<script src="scripts/send.js"></script>
<script src="scripts/socket.js"></script>

  </body>
</html>
