// in order to have multiple grids, we need to turn our code from before
// into a class "MolnarGrid" which has all the properties and methods
// we previously created. 
// so we have done that in the new class MolnarGrid inside MolnarGrid.js

var frameInterval = 20; // how many frames per segment

var numMolnarGridsX = 10;
var numMolnarGridsY = 10;

var gridSizeX = 8;
var gridSizeY = 8;

var molnarGrids = [];

function setup() {
  createCanvas(500, 500);
  noFill();

  for (var x=0; x<numMolnarGridsX; x++) {
    for (var y=0; y<numMolnarGridsY; y++) {
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
  for (var i=0; i<molnarGrids.length; i++) {
    molnarGrids[i].draw();
  }
}

