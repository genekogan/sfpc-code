// this example is the same as veraMolnar_05_multipleGrids
// except we've made it so that only one grid is updated a time, and it
// goes in order.  

var frameInterval = 4; // how many frames per segment
var numMolnarGridsX = 5;
var numMolnarGridsY = 5;
var gridSizeX = 4;
var gridSizeY = 4;

var molnarGrids = [];
var indexActive = 0;

var curvedVertices = false;

function setup() {
  createCanvas(500, 500);
  noFill();

  for (var y=0; y<numMolnarGridsY; y++) {
    for (var x=0; x<numMolnarGridsX; x++) {
      var mx = map(x, 0, numMolnarGridsX, 0, width);
      var my = map(y, 0, numMolnarGridsY, 0, height);
      var mwidth = width / numMolnarGridsX;
      var mheight = height / numMolnarGridsY;
      var margin = 10;
      
      var m = new MolnarGrid(mx, my, mwidth, mheight, gridSizeX, gridSizeY, margin);
      m.createOrder();
      molnarGrids.push(m);
    }
  }
}

function draw() {
  background(0);
  
  molnarGrids[indexActive].update();
  
  // check if it's done... if it is, set to update the next molnar grid
  if (molnarGrids[indexActive].isDone()) {
    indexActive = indexActive + 1;
    indexActive = min(indexActive, molnarGrids.length-1);
  }
  
  for (var i=0; i<molnarGrids.length; i++) {
    molnarGrids[i].draw();
  }
}

