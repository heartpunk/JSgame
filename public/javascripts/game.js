var FPS = 30;

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var rect1x = 10;
var rect1y = 10;

var player = {
  color: "#00A",
  x: 220,
  y: 270,
  width: 32,
  height: 32,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

function update() {
  rect1x = (rect1x + 1) % 640;
  rect1y = (rect1y + 1) % 480;
}

function draw() {
  ctx.clearRect(0, 0, 640, 480);

  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect (rect1x, rect1y, 55, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect (30, 30, 55, 50);
  
  player.draw();
}

setInterval(function() {
  update();
  draw();
}, 1000/FPS);