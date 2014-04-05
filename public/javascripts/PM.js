var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var container = $(canvas).parent();

var Canvas = {};
var Particle = {};
var Physics = {};

Physics.initialize = function() {
  // console.log("physics.initialize");
  Physics.gravity = -1;
}

Physics.changeX_pos = function(particle) {
  console.log(particle.x_pos, particle.x_vel);
  return particle.x_pos + particle.x_vel;
}

Physics.changeY_posFreeFall = function(particle) {
  var time = (Canvas.frame / Canvas.fps);
  var deltaY = particle.y_vel * time + ( 0.5 * Physics.gravity * time * time );
  // console.log(deltaY);
  return particle.y_pos + deltaY;
}

Physics.boundaryStop = function(particle) {
  if (particle.x_pos >= Canvas.x - 30) {
      particle.x_pos = Canvas.x - 30;
      particle.x_vel = 0;
  }
  if (particle.y_pos > Canvas.y) {
    particle.y_pos = 30; // 30 is the size of the box
  }
}

Particle.draw = function() {
  // console.log("particle.draw");
  // console.log(Particle.x_pos, Particle.y_pos)
  ctx.fillStyle = 'yellow';
  ctx.fillRect(Particle.x_pos, (Canvas.y - Particle.y_pos), 30, 30);
}

Particle.initialize = function() {
  // console.log("particle.initialize");
  Particle.x_pos = 0;
  Particle.y_pos = 0;

  Particle.initialVelocity = $("#velocity").val();

  Particle.x_vel = 0.7071 * Particle.initialVelocity;
  Particle.y_vel = Particle.initialVelocity * 0.7071 * 10;
}

Particle.update = function() {
  // console.log("Particle.update");
  Particle.x_pos = Physics.changeX_pos(this);
  Particle.y_pos = Physics.changeY_posFreeFall(this);
  // console.log(Particle.x_pos, Particle.y_pos);
}

Canvas.initialize = function() {
  // console.log("canvas.initialize");
  Canvas.fps = 60;
  Canvas.frame = 0;

  ctx.font = "20px Calibri";
  ctx.fillStyle = "#333333"; //white
  ctx.textAlign = "center";
  ctx.fillText("initialization text", (Canvas.x/2), (Canvas.y/2) );
}

Canvas.generatePositionStatus = function(particle) {
  return "x: " + particle.x_pos + "\ny: " + particle.y_pos;
}

Canvas.update = function() {
  // console.log("canvas.update");
  Canvas.frame += 1;
  
  Canvas.x = container.width();
  Canvas.y = container.height();

  Canvas.displayText = Canvas.generatePositionStatus(Particle);
}

Canvas.draw = function() {
  // console.log("canvas.draw");
  ctx.clearRect(0, 0, Canvas.x, Canvas.y );

  if (Particle.y_pos > Canvas.y) window.clearInterval(loop);

  canvas.setAttribute('width', $(container).innerWidth() - 4 ); //max width
  canvas.setAttribute('height', $(container).innerHeight() - 4); //max height
  
  ctx.fillStyle = "#DDDDDD"; // grey
  ctx.fillRect( 0, 0, Canvas.x, Canvas.y ); // fill the canvas
  
  ctx.fillText(Canvas.displayText, 50, 50 ); // message in the top left
}

var update = function() {
  // console.log("update");
  Canvas.update();
  Particle.update();
}

var draw = function() {
  // console.log("draw");
  Canvas.draw();
  Particle.draw();
  // ctx.fill();
}

var loop;

var startGameLoop = function() {
  // console.log("startGameLoop");
  quickSetup();
  loop = window.setInterval( function() {
    update();
    draw();
  }, 1000 / Canvas.fps );
}

var endGameLoop = function() {
  // make this
}

var setup = function() {
  // console.log("setup");
  Canvas.initialize();
  Physics.initialize();
  Particle.initialize();
  draw();
}

var quickSetup = function() {
  Canvas.initialize();
  Particle.initialize();
}

setup();