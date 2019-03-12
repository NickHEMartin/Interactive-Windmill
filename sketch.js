var picture, Cloud, lmx, lmy, tx, ty;
var r = 0;
var ws = 0;
var cx = 0;
var cy = 0;
var clouds = [];
var c = 100;
var z = 0.001;
var h = 0;

function setup() {
  createCanvas(1080, 720);
  noCursor();
  //pictures
  imageMode(CENTER);
  picture = loadImage("fan2.png");
  Background = loadImage("background.png");
  building = loadImage("tower.png");
  cloud = loadImage("cloud.png");
  buildingFix = loadImage("field.png");
  field = loadImage("fixedField.png");
  wind = loadImage("air.png");

  //cloud function
  for (var i = 0; i < c; i++) {
    clouds[i] = new Cloud(random(-400, width), random(height / 4.2));
  }
}

function draw() {
  //drawn images
  background(215, 215, 255);
  image(Background, 0, 0, width * 2, height * 2);
  image(field, 0, 160, width * 2, height * 1.6);
  image(building, (width / 2) + 250, (height / 2), 275, 350);
  image(buildingFix, 780, 520, width + 400, height + 400);

  //drwaing the moving clouds
  for (var i = 0; i < c; i++) {
    clouds[i].move();
    clouds[i].draw();
  }

//mouse curser
  image(wind, mouseX, mouseY, 30, 30);
  if (mouseIsPressed) {
    if (mouseButton == LEFT) {
      stroke(100, 200, 255);
      strokeWeight(10);
      //line((width / 2) + 250, (height / 2) - 120, mouseX, mouseY);
      
    }
  }

  //rotating the mill
  translate((width / 2) + 250, (height / 2) - 120);
  rotate(-r);
  image(picture, 0, 0, 400, 400);
  if (cx > mouseX) {
    r = r + ws + z;
    if (r = r + ws) {
      cx = width;
    }
  } else if (cx < mouseX) {
    r = r - ws - z;
    if (r = r - ws) {
      cx = 0;
    }
  }
  ws = ws * 0.99;

  //making more or less clouds and speeding and slowing the mill
  if (mouseIsPressed) {
    if (mouseButton == CENTER) {
      if (c < 100) {
        c = c + 1;
      }
      if (z < 0.05) {
        z = z + 0.0005;
      }
    }

    if (mouseButton == RIGHT) {
      if (c > 0) {
        c = c - 1;
      }
      if (z > 0.0005) {
        z = z - 0.0005;
      }
    }
  }
}

//how the clouds get drawn and move
function Cloud(x, y) {
  this.x = x;
  this.y = y;
  this.cloudScale = random(0.09);
  this.speed = random(0.1, 0.5);

  this.move = function() {
    this.x += this.speed;
    if (this.x > width + 200) {
      this.x = -200;
    }
  }

  this.draw = function() {
    push();
    translate(this.x, this.y);
    scale(this.cloudScale);
    image(cloud, 0, 0);
    pop();
  }
}

//controlling the speed of the mill
function mousePressed() {
  cx = mouseX;
  cy = mouseY;
}

function mouseReleased() {
  if (mouseButton == LEFT) {
    var d = dist(cx, cy, mouseX, mouseY);
    ws = ws + d / 6000;
  }
}