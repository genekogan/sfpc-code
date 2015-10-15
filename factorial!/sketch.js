var x, y;

function setup() {
  createCanvas(500, 500);
  textSize(32);
  x = 8;
  
  y = factorial(x);
  
  // factorial(8)  ????
  // factorial(8) = 8 * factorial(7)
  // = 8 * ( 7 * factorial(6) )
  // = 8 * ( 7 * ( 6 * factorial(5) ) )
  // ....
  // = 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1!
  
}

function draw() {
  background(255);
  text(x+"! = "+y, 100, 100); 
}

// basic recursive function
// this will calculate the factorial of x
function factorial(x) {
  if (x == 1) return 1;
  else        return x * factorial(x-1);
}