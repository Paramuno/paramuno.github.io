const w = 800;
const h = 800;
let activeBpoint;
let activeBezier;
let bpointArray = [];
let bpointAmmount = 25

function setup() {
  createCanvas(w, h);
  background(240);
  noStroke();
  for (let i = 0; i < bpointAmmount; i++) { /// Initializing Bpoints
    let rpos = createVector(50 + (i * ((w - 50) / bpointAmmount)), h / 2) // In a line
    let h1 = createVector(rpos.x + 20, rpos.y + 20)
    let h2 = createVector(rpos.x - 20, rpos.y - 20)
    bpointArray.push(new Bpoint(rpos, h1, h2, false))
  }
  //  for (let i = 0; i < bpointArray; i++){
  // bpointArray[i].nextBpoint =
  //  }
}

function draw() {
  background(240)
  for (let i = 0; i < bpointArray.length; i++) {
    bpointArray[i].calcMouse();
    bpointArray[i].displayBpoint();
  }
  drawBezier()
}

function Bpoint(pos, h1pos, h2pos, cornerstatus) {
  this.location = createVector(pos.x, pos.y);
  this.h1location = createVector(h1pos.x, h1pos.y);
  this.h2location = createVector(h2pos.x, h2pos.y);
  this.clickable
  this.h1clickable
  this.h2clickable
  this.bpointsize = 20
  this.hsize = this.bpointsize - 5 // Handle size
  this.isCorner = cornerstatus // Is this a Bezier corner
  this.mouseVector = createVector()

  this.drag = function() { // If point is clickable and last activated, drag with mouse
    if (this.clickable && activeBpoint == this.location) {
      this.location.x = mouseX
      this.location.y = mouseY
      activeBezier = this
    } else if (this.h1clickable && activeBpoint == this.h1location) {
      if (this.isCorner) {
        this.h1location.x = mouseX
        this.h1location.y = mouseY
      } else {
        this.h1location.x = mouseX
        this.h1location.y = mouseY
        this.h2location = p5.Vector.lerp(this.h1location, this.location, 2) // defines h2 as in the path between h1 and Bpoint multiplied by 2
      }
    } else if (this.h2clickable && activeBpoint == this.h2location) {
      if (this.isCorner) {
        this.h2location.x = mouseX;
        this.h2location.y = mouseY;
      } else {
        this.h2location.x = mouseX
        this.h2location.y = mouseY
        this.h1location = p5.Vector.lerp(this.h2location, this.location, 2)
      }
    }
  }
  this.calcMouse = function() { //evaluating pointClickable for each of the 3 points
    if (pointClickable(this.location, this.bpointsize)) {
      this.clickable = true
      //canvas.style.cursor='move'; //You could change pointer styles
    } else {
      this.clickable = false
    }
    if (pointClickable(this.h1location, this.hsize)) {
      this.h1clickable = true
    } else {
      this.h1clickable = false
    }
    if (pointClickable(this.h2location, this.hsize)) {
      this.h2clickable = true
    } else {
      this.h2clickable = false
    }
  }
  this.activate = function() { // Ocurrs only on mousepressed activate bpoint

    //this.active = !this.active; // invert active state
    activeBezier = this;
  }
  this.displayBpoint = function() { // draw points and links in screen
    stroke(100)
    strokeWeight(1)
    line(this.location.x, this.location.y, this.h1location.x, this.h1location.y)
    line(this.location.x, this.location.y, this.h2location.x, this.h2location.y)
    noStroke()
    if (activeBezier == this) {
      fill(50, 150, 255)
    } else {
      fill(0, 0, 255)
    }
    ellipse(this.location.x, this.location.y, this.bpointsize)
    stroke(255, 0, 0)
    fill(240)
    ellipse(this.h1location.x, this.h1location.y, this.hsize)
    stroke(200, 100, 0)
    ellipse(this.h2location.x, this.h2location.y, this.hsize)

  }
}

function pointClickable(point, size) { // Is my mouse over this point?
  let distance
  if (mouseX > point.x - 100 && mouseX < point.x + 100 && mouseY > point.y - 100 && mouseY < point.y + 100) { //gaining 4-5 fps
    distance = dist(mouseX, mouseY, point.x, point.y); // calc distance betwwen mouse and this pos
    if (distance < size / 2) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function drawBezier() {
  stroke(20);
  strokeWeight(5);
  noFill();
  beginShape();
  for (let i = 0; i < bpointArray.length - 1; i++) { // Draw bezier
    bezier(bpointArray[i].location.x, bpointArray[i].location.y, //anchor1
      bpointArray[i].h2location.x, bpointArray[i].h2location.y, //control1
      bpointArray[i + 1].h1location.x, bpointArray[i + 1].h1location.y, //control2
      bpointArray[i + 1].location.x, bpointArray[i + 1].location.y) //anchor2
  }
  bezier(bpointArray[bpointArray.length - 1].location.x, bpointArray[bpointArray.length - 1].location.y, // connect last one w/first
    bpointArray[bpointArray.length - 1].h2location.x, bpointArray[bpointArray.length - 1].h2location.y,
    bpointArray[0].h1location.x, bpointArray[0].h1location.y,
    bpointArray[0].location.x, bpointArray[0].location.y)
  endShape();
}

function createHandle() {}

function keyPressed() {}

function mousePressed() { //Points activate with a click before being able to drag them
  for (let i = 0; i < bpointArray.length; i++) {
    if (pointClickable(bpointArray[i].location, bpointArray[i].bpointsize)) {
      activeBpoint = bpointArray[i].location
    } else if (pointClickable(bpointArray[i].h1location, bpointArray[i].hsize)) {
      activeBpoint = bpointArray[i].h1location
    } else if (pointClickable(bpointArray[i].h2location, bpointArray[i].hsize)) {
      activeBpoint = bpointArray[i].h2location
    }
  }
}

function mouseDragged() {
  for (let i = 0; i < bpointArray.length; i++) {
    bpointArray[i].drag();
  }
  return false; // prevent default
}
