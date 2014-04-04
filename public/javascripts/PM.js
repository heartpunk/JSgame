var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var container = $(canvas).parent();

var Canvas = {};
var Particle = {};
var Physics = {};

Physics.initialize = function() {
  Physics.gravity = -1;
}

Physics.changeX_pos = function(particle) {
  return particle.x_pos + particle.x_vel;
}

Physics.changeY_posFreeFall = function(particle) {
  return ( particle.y_pos * (Canvas.frame / Canvas.fps) ) + ( 0.5 * Physics.gravity * (Canvas.frame / Canvas.fps) * (Canvas.frame / Canvas.fps) );
}

Physics.boundaryStop = function(particle) {
  if (particle.x_pos >= Canvas.x - 30) {
      particle.x_vel = 0;
      particle.x_pos = Canvas.x - 30;
  }
  if (particle.y_pos < 0) {
    particle.y_pos = 30; // 30 is the size of the box
  }
}

Particle.draw = function() {
  ctx.rect(Particle.x_pos, (Canvas.y - Particle.y_pos), 30, 30);
  ctx.fillStyle = 'yellow';
  ctx.fill();
}

Particle.initialize = function() {
  Particle.x_pos = 0;
  Particle.y_pos = 0;

  Particle.initialVelocity = $("#velocity").val();

  Particle.x_vel = 0.7071 * Particle.initialVelocity;
  Particle.y_vel = Particle.initialVelocity * 0.7071 * 10;
}

Particle.update = function() {
  Particle.x_pos = Physics.changeX_pos(Particle);
  Particle.y_pos = Physics.changeY_posFreeFall(Particle);
}

Canvas.initialize = function() {
  Canvas.fps = 60;
  Canvas.frame = 0;

  ctx.font = "20px Calibri";
  ctx.fillStyle = "#333333"; //white
  ctx.textAlign = "center";
  ctx.fillText("initialization text", (Canvas.x/2), (Canvas.y/2) );
}

Canvas.generateStatus = function(particle) {

}

Canvas.update = function() {
  Canvas.frame += 1;
  
  Canvas.x = container.width();
  Canvas.y = container.height();

  Canvas.displayText = Canvas.generateStatus(Particle);
}

Canvas.draw = function() {
  ctx.clearRect(0, 0, Canvas.x, Canvas.y );

  canvas.setAttribute('width', $(container).innerWidth() - 4 ); //max width
  canvas.setAttribute('height', $(container).innerHeight() - 4); //max height
  
  ctx.fillStyle = "#DDDDDD"; // grey
  ctx.fillRect( 0, 0, Canvas.x, Canvas.y ); // fill the canvas
  
  ctx.textAlign = "center";
  ctx.fillText("initialization text", (Canvas.x/2), (Canvas.y/2) );

  // on window resize, adjust canvas
  $(window).resize( Canvas.draw() );
}

var update = function() {
  Particle.update();
  Canvas.update();
}

var draw = function() {
  Canvas.draw();
  Particle.draw();
}

var startGameLoop = function() {
  window.setInterval( function() {
    update();
    draw();
  }, 1000 / Particle.fps );
}

var endGameLoop = function() {
  // make this
}

var setup = function() {
  Canvas.initialize();
  Physics.initialize();
  Particle.initialize();
  draw();
}