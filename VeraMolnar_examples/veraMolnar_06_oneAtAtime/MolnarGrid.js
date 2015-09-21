function MolnarGrid(drawX, drawY, drawWidth, drawHeight, gridSizeX, gridSizeY, margin) {
  
  this.drawX = drawX;
  this.drawY = drawY;
  this.drawWidth = drawWidth;
  this.drawHeight = drawHeight;
  
  this.gridSizeX = gridSizeX;
  this.gridSizeY = gridSizeY;
  
  this.margin = margin;
  
  this.order=[];   // order is the 16-element array of our 16 corners in order
  this.lastToDraw = 0; // we want to draw the ordered vertices from 0->lastToDraw
  this.frameRemainder = 0;
  
  // this function will create a permutation of the array
  // of indexes corresponding to our 16 points
  this.getPosition = function(index) {
    var col = index % this.gridSizeX;  // use modulo (remainder) to get column of our index
    var row = floor(index / this.gridSizeX); // floor the division to get row of our index
    var x = map(col, 0, this.gridSizeX-1, this.drawX+this.margin, this.drawX+this.drawWidth-this.margin);
    var y = map(row, 0, this.gridSizeY-1, this.drawY+this.margin, this.drawY+this.drawHeight-this.margin);
    return {x: x, y: y};
  };

  // this function will create a permutation of the array
  // of indexes corresponding to our 16 points
  this.createOrder = function() {
    // order is our final permutation list
    this.order = [];     // clear order if we had filled it before
    
    // make new array of our indexes to sample from
    var all = [];
    for (var i=0; i<this.gridSizeX*this.gridSizeY; i++) {
      all.push(i);
    }
    
    for (var i=0; i<this.gridSizeX*this.gridSizeY; i++) {
      var index = floor(random(all.length));  // pick a random index
      this.order.push(all[index]); // append that element from 'all' into 'order'
      all.splice(index, 1); // remove it from 'all' so we don't sample from it again
      //println("all: "+all);   // print all and order to see what we have
      //println("order: "+this.order);
    }
  };
  
  // in order to be able to control when one grid is being updated we
  // removed the "update" function out of "draw" so we can control a 
  // single molnar grid at a time
  this.update = function() {
    // we can add 1 to lastToDraw every 15 frames like so
    this.frameRemainder = frameCount % frameInterval;
    if (this.frameRemainder == 0) {   // this will evaluate to true every 60 frames
      this.lastToDraw = this.lastToDraw + 1;
      this.lastToDraw = min(this.lastToDraw, this.gridSizeX*this.gridSizeY); // we don't want lastToDraw to exceed the number of vertices we have
    }
  };
  
  // we need a function to check if we are finished animating
  // this molnar grid. we know it's done when "lastToDraw" is equal to the number of vertices we have
  this.isDone = function() {
    if (this.lastToDraw == this.gridSizeX*this.gridSizeY) {
      return true;
    }
    else {
      return false;
    }
  };
  
  // draw our grid
  this.draw = function() {
    stroke(255);
    
    // this will draw all the current vertices
    beginShape();
    for (var i=0; i<this.lastToDraw; i++) {
      var index = this.order[i];
      var position = this.getPosition(index);
      if (curvedVertices) {
        curveVertex(position.x, position.y);
      }
      else {
        vertex(position.x, position.y);
      }
    }
    endShape();
    
    // before we reach the end, we can interpolate to the next vertex
    
    if (this.lastToDraw < this.gridSizeX*this.gridSizeY-1) {
    
      // we can use lerp (see lerp_101) to interpolate between
      // the last current vertex and the next current vertex. 
      // frameRemainder / frameInterval is our amount to interpolate
      var t = this.frameRemainder / frameInterval;
      var indexCurrent = this.order[this.lastToDraw - 1];  // index of our current last vertex
      var indexNext = this.order[min(this.lastToDraw, this.gridSizeX*this.gridSizeY-1)];   // next vertex, but don't exceed how many vertices we have
      
      // let's interpolate between (x, y) at indexCurrent and (x, y) at indexNext 
      var positionCurrent = this.getPosition(indexCurrent);
      var positionNext = this.getPosition(indexNext);
      
      // now let's get the x, y interpolated between positionCurrent and positionNext
      var xNext = lerp(positionCurrent.x, positionNext.x, t);
      var yNext = lerp(positionCurrent.y, positionNext.y, t);
      
      // draw the line from our last vertex to (xNext, yNext)
      line(positionCurrent.x, positionCurrent.y, xNext, yNext);
    }
  };

};