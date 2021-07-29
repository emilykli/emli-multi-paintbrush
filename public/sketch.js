var socket;

function setup()
{
  createCanvas(800, 600);
  background(22);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
}

function draw()
{
  strokeWeight(15);
  stroke(255);
}

function newDrawing(data)
{
  line(data.previousX, data.previousY, data.x, data.y);
}

function mouseDragged()
{
  console.log("SENDING: " + mouseX + ", " + mouseY);

  var data = 
  {
    previousX: pmouseX,
    previousY: pmouseY,
    x: mouseX,
    y: mouseY,
  }

  socket.emit('mouse', data);
  line(pmouseX, pmouseY, mouseX, mouseY);
}