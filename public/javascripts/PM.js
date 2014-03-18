var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var container = $(canvas).parent();
// console.log(container);

var respondCanvas = function() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height );
  
  console.log()

  canvas.setAttribute('width', $(container).innerWidth() - 4 ); //max width
  canvas.setAttribute('height', $(container).innerHeight() - 4); //max height
  
  //Redraw & reposition content
  var x = container.width();
  var y = container.height();       
  ctx.font = "20px Calibri";
  
  ctx.fillStyle = "#DDDDDD"; //black
  ctx.fillRect( 0, 0, x, y); //fill the canvas
  
  // var resizeText = "Canvas width: "+c.width()+"px";
  // ctx.textAlign = "center";
  // ctx.fillStyle = "#333333"; //white
  // ctx.fillText(resizeText, (x/2), (y/2) );
  
  ctx.rect(x/2, y/2, 50, 50);
  ctx.fillStyle = 'yellow';
  ctx.fill();
}

$(window).resize( respondCanvas );
// $(container).resize( respondCanvas );
respondCanvas();