var order=[];
var current=[];

function setup() {
  createCanvas(500, 500);
  createOrder();
}

function draw() {
  beginShape();
  for (var i=0; i<order.length; i++) {
    var index = order[i];
    var col = index % 4;  // use modulo (remainder) to get column of our index
    var row = floor(index / 4); // floor the division to get row of our index
    
    var x = map(col, 0, 3, 0, width);
    var y = map(row, 0, 3, 0, height);
    
    vertex(x, y);
  }
  endShape();
}

// this function will create a permutation of the array
// of indexes corresponding to our 16 points
function createOrder() {
  // order is our final permutation list
  order = [];     // clear order if we had filled it before
  var all = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];  // make new array of our indexes to sample from
  for (var i=0; i<16; i++) {
    var index = floor(random(all.length));  // pick a random index
    order.push(all[index]); // append that element from 'all' into 'order'
    all.splice(index, 1); // remove it from 'all' so we don't sample from it again
    println("all: "+all);   // print all and order to see what we have
    println("order: "+order);
  }
}