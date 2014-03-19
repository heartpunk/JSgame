var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var container = $(canvas).parent();
// console.log(container);

var Particle = {};
var Canvas = {};

Particle.fps = 60;
Particle.frame = 0;

Particle.initialize = function() {
  Particle.gravity = -1;

  Particle.x_pos = 0;
  Particle.y_pos = 0;

  Particle.initialVelocity = $("#velocity").val();

  Particle.y_vel = Particle.initialVelocity * 0.7071 * 10;
  Particle.x_vel = 0.7071 * Particle.initialVelocity;
}

Particle.calcPosition = function() {
  
  // // switching directions if the particle is at the edge of the canvas
  // if(Particle.x_pos >= Canvas.x || Particle.x_pos < 0) {
  //   Particle.x_vel *= -1;
  // }
  // if(Particle.y_pos >= Canvas.y || Particle.y_pos < 0) {
  //   Particle.y_vel *= -1;
  // }

  // TODO: move into initialize
  // if (initial conditions) {initialize} else {move sim along}
  if (Particle.frame === 1) {
    Particle.y_vel = Particle.initialVelocity * 0.7071 * 10;
  } else {
    Particle.y_vel = Particle.y_vel + Particle.gravity * (Particle.frame / Particle.fps);
  }

  // moving the particle's position
  Particle.x_pos += Particle.x_vel;  
  Particle.y_pos += Particle.y_vel;

  // keeping the particle on screen.
  if (Particle.x_pos >= Canvas.x - 30) {
    Particle.x_vel = 0;
    Particle.x_pos = Canvas.x - 30;
  }
  if (Particle.y_pos < 0) {
    Particle.y_pos = 30; // 30 is the size of the box
  }
}

Particle.updateCanvas = function() {
  
  Particle.frame += 1;

  Canvas.x = container.width();
  Canvas.y = container.height(); 

  Particle.calcPosition();
  
}

Particle.drawCanvas = function() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height );

  canvas.setAttribute('width', $(container).innerWidth() - 4 ); //max width
  canvas.setAttribute('height', $(container).innerHeight() - 4); //max height
  
  ctx.fillStyle = "#DDDDDD"; // grey
  ctx.fillRect( 0, 0, Canvas.x, Canvas.y ); // fill the canvas
  
  // post text
  // Particle.gravityText = "Gravity: "+ $("#gravity").val() + " meters per second squared";
  // ctx.font = "20px Calibri";
  // ctx.textAlign = "center";
  // ctx.fillStyle = "#333333"; //white
  // ctx.fillText(Particle.gravityText, (Canvas.x/2), (Canvas.y/2) );
  
  // draw a yellow box

  // console.log(Particle.x_pos, Particle.y_pos);
  ctx.rect(Particle.x_pos, (Canvas.y - Particle.y_pos), 30, 30);
  ctx.fillStyle = 'yellow';
  ctx.fill();
}

// animate movement
// Particle.run = window.setInterval( function () {
//   Particle.updateCanvas();
//   Particle.drawCanvas();
// }, 1000 / Particle.fps );

// on window resize, adjust canvas
$(window).resize( Particle.drawCanvas );

// initializing
// Particle.run;