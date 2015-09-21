function setup() {
  
  // lerp is a function which lets you interpolate two values
  
  // for example, if we want to find the number which is 25% of the 
  // way between 2 and 7, we would do it like this
  var x = lerp(2, 7, 0.25);
  println(x);
  
  
  // x = 3.25
  // 3.25 is 25% of the way between 2 and 7
  
  // lerp is very similar to map
  // lerp(2, 7, x) = map(x, 0, 1, 2, 7)
  
}

function draw() {
  
}