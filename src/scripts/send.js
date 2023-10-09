
function sendPixel(x, y, r, g, b, a) {
var variable1 = x;
var variable2 = y;
var variable3 = r;
var variable4 = g;
var variable5 = b;
var variable6 = a;

var data = {
  variable1: x,
  variable2: y,
  variable3: r,
  variable4: g,
  variable5: b,
  variable6: a,
};

var xhr = new XMLHttpRequest();
xhr.open('POST', '../srv/setpixel.php', true);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = xhr.responseText;
    if (response != '') {
    alert(response);
    }
  }
};

xhr.send(JSON.stringify(data));
}