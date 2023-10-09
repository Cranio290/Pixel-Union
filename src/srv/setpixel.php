<?php
function setimagepixel($xpos, $ypos, $rc, $gc, $bc, $ac) {
$imagePath = '../canvas.png';

$image = imagecreatefrompng($imagePath);

$x = $xpos;
$y = $ypos;

// color
$r = $rc;
$g = $gc;
$b = $bc;
$a = $ac;

// set pixel
$newColor = imagecolorallocatealpha($image, $r, $g, $b, $a);
imagesetpixel($image, $x, $y, $newColor);

// save
imagepng($image, $imagePath);

// clean
imagedestroy($image);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['CONTENT_TYPE'] === 'application/json') {
  $jsonData = file_get_contents('php://input');
  $data = json_decode($jsonData, true);

  $var1 = $data['variable1'];
  $var2 = $data['variable2'];
  $var3 = $data['variable3'];
  $var4 = $data['variable4'];
  $var5 = $data['variable5'];
  $var6 = $data['variable6'];

if (is_numeric($var1) && is_numeric($var2) && is_numeric($var3) && is_numeric($var4) && is_numeric($var5) && is_numeric($var6)) {
setimagepixel($var1, $var2, $var3, $var4, $var5, $var6);
} else {
  echo "Error: sent data is not numerical";
}
} else {
  // Not a JSON request or invalid request method
  // Handle accordingly
}
  //setimagepixel(5, 5, 255, 0, 0, 0);
  //setimagepixel(7, 7, 255, 0, 0, 0);
//echo 'hello';
?>