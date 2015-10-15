function setup() {
  createCanvas(500, 500); 
  noLoop();
}

function draw() {
  drawBox(0, 0, width, height, 10);
}

function drawBox(x, y, w, h, level) {
  
  // if the level is 0, draw
  // the rectangle to the screen
  if (level == 0) {
    fill(random(255), random(255), random(255));
    rect(x, y, w, h);
  }
  
  // otherwise, if the level is > 0,
  // split the rectangle(x, y, w, h) into
  // two rectangles whose level is (level-1),
  // and call drawBox on those two ("children")
  else {
    
    // if level > 0, we split the rectangle into two.
    // we can do a "coin flip" to decide whether to split
    // horizontally or vertically
    
    // "coin flip"
    if (random(1) < 0.5) {
      // let's split the rectangle(x, y, w, h) horizontally
      // at a percentage t {between 0 and 1}
      var t = random(1);
    
      // therefore we will have two rectangles
      // 1: x, y, w * t, h
      // 2: x + w * t, y, w * (1-t), h
      drawBox(x, y, w * t, h, level-1);
      drawBox(x + w * t, y, w * (1-t), h, level-1);
    }
    
    else {
      // let's split the rectangle vertically
      // same idea as the horizontal split
      
      // pick a random percentage
      var t = random(1);
      
      drawBox(x, y, w, h * t, level-1);
      drawBox(x, y + h * t, w, h * (1-t), level-1);
    }
  }
}

function mousePressed() {
  redraw();
}