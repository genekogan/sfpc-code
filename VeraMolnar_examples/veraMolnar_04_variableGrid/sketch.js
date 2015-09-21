// we will modify veraMolnar_03_interpolated so that
// the size of the grid (4x4 in the previous examples) is variable

var gridSizeX = 6;
var gridSizeY = 6;

var order=[];   // order is the 16-element array of our 16 corners in order
var lastToDraw; // we want to draw the ordered vertices from 0->lastToDraw

var frameInterval = 20; // how many frames per segment

function setup() {
  createCanvas(500, 500);
  noFill();
  //frameRate(2);
  createOrder();
  lastToDraw = 1;
}

function draw() {
  
  // we can add 1 to lastToDraw every 15 frames like so
  var frameRemainder = frameCount % frameInterval;
  if (frameRemainder == 0) {   // this will evaluate to true every 60 frames
    lastToDraw = lastToDraw + 1;
    lastToDraw = min(lastToDraw, gridSizeX*gridSizeY); // we don't want lastToDraw to exceed the number of vertices we have
  }
  
  // this will draw all the current vertices
  beginShape();
  for (var i=0; i<lastToDraw; i++) {
    var index = order[i];
    var position = getPosition(index);
    vertex(position.x, position.y);
  }
  endShape();
  
  // before we reach the end, we can interpolate to the next vertex
  
  if (lastToDraw < gridSizeX*gridSizeY-1) {
  
    // we can use lerp (see lerp_101) to interpolate between
    // the last current vertex and the next current vertex. 
    // frameRemainder / frameInterval is our amount to interpolate
    var t = frameRemainder / frameInterval;
    var indexCurrent = order[lastToDraw - 1];  // index of our current last vertex
    var indexNext = order[min(lastToDraw, gridSizeX*gridSizeY-1)];   // next vertex, but don't exceed how many vertices we have
    
    // let's interpolate between (x, y) at indexCurrent and (x, y) at indexNext 
    var positionCurrent = getPosition(indexCurrent);
    var positionNext = getPosition(indexNext);
    
    // now let's get the x, y interpolated between positionCurrent and positionNext
    var xNext = lerp(positionCurrent.x, positionNext.x, t);
    var yNext = lerp(positionCurrent.y, positionNext.y, t);
    
    // draw the line from our last vertex to (xNext, yNext)
    line(positionCurrent.x, positionCurrent.y, xNext, yNext);
  }
}

// convenience function to get the (x, y) of any indexed vertex
function getPosition(index) {
  var col = index % gridSizeX;  // use modulo (remainder) to get column of our index
  var row = floor(index / gridSizeX); // floor the division to get row of our index
  var x = map(col, 0, gridSizeX-1, 100, width-100);
  var y = map(row, 0, gridSizeY-1, 100, height-100);
  return {x: x, y: y};
}

// this function will create a permutation of the array
// of indexes corresponding to our 16 points
function createOrder() {
  // order is our final permutation list
  order = [];     // clear order if we had filled it before
  
  // make new array of our indexes to sample from
  var all = [];
  for (var i=0; i<gridSizeX*gridSizeY; i++) {
    all.push(i);
  }
  
  for (var i=0; i<gridSizeX*gridSizeY; i++) {
    var index = floor(random(all.length));  // pick a random index
    order.push(all[index]); // append that element from 'all' into 'order'
    all.splice(index, 1); // remove it from 'all' so we don't sample from it again
    println("all: "+all);   // print all and order to see what we have
    println("order: "+order);
  }
}