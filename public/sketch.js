var socket;

function setup()
{
  createCanvas(800, 600);
  background(22);
  colorMode(HSB, 100);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
}

function draw()
{
  //fill(255);
  //strokeWeight(0);
  strokeWeight(15);
  //stroke(255);
}

function newDrawing(data)
{
  stroke(color(data.colorValue, 100, 100));
  line(data.previousX, data.previousY, data.x, data.y);
}

function mouseDragged()
{
  console.log("SENDING: " + mouseX + ", " + mouseY);

  let slicedString = (socket.id).slice(socket.id.length - 4);
  let baseSlice = btoa(slicedString);
  baseSlice = baseSlice.substring(0, baseSlice.length - 2);
  console.log("Base Slice: " + baseSlice);
  let personalColor = parseInt(baseSlice, 36);
  personalColor = personalColor % 200;
  console.log("Slice: " + slicedString);
  console.log(socket.id + " Color: " + personalColor);
  var data = 
  {
    previousX: pmouseX,
    previousY: pmouseY,
    x: mouseX,
    y: mouseY,
    colorValue: personalColor,
  }

  socket.emit('mouse', data);
  stroke(color(personalColor, 100, 100));
  line(pmouseX, pmouseY, mouseX, mouseY);
}