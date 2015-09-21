function setup() {
  createCanvas(500, 500);
  
  // map lets you take a variable in one range
  // and remap it into another range
  
  // map takes 5 arguments
  // 1) the value to remap (0.75)
  // 2-3) the input range (0, 1)
  // 4-5) the output range (200, 500)
  // and it will return the value between
  // the output range which is equivalent
  var x = map(0.75, 0, 1, 200, 500);
  println(x);
  
}

function draw() {
  
}