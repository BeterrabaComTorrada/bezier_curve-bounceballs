let p0, p1, p2, p3;
let velP0, velP1, velP2, velP3;  

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  noFill();


  p0 = createVector(100, 500);  
  p1 = createVector(300, 100);  
  p2 = createVector(500, 100);  
  p3 = createVector(600, 500);  

 
  velP0 = createVector(1, 0.5);  
  velP1 = createVector(2, 1.5);  
  velP2 = createVector(-2, -1.5);  
  velP3 = createVector(-1, 0.5);  
}

function draw() {
  background(0);  

  
  moveAndBounce(p0, velP0);
  moveAndBounce(p1, velP1);
  moveAndBounce(p2, velP2);
  moveAndBounce(p3, velP3);

  
  strokeWeight(2);
  for (let t = 0; t <= 1; t += 0.01) {
    let x = bezierPoint(p0.x, p1.x, p2.x, p3.x, t);
    let y = bezierPoint(p0.y, p1.y, p2.y, p3.y, t);
    
   
    stroke(t * 360, 255, 255);
    point(x, y);
  }

  
  strokeWeight(10);
  
  stroke(0, 255, 255);  
  point(p0.x, p0.y);
  
  stroke(120, 255, 255); 
  point(p1.x, p1.y);
  
  stroke(240, 255, 255); 
  point(p2.x, p2.y);
  
  stroke(60, 255, 255);  
  point(p3.x, p3.y);
}


function moveAndBounce(point, velocity) {
  point.add(velocity); 

 
  if (point.x > width || point.x < 0) {
    velocity.x *= -1;  
  }
  if (point.y > height || point.y < 0) {
    velocity.y *= -1;  
  }


  if (abs(velocity.x) < 0.5) {
    velocity.x = velocity.x < 0 ? -0.5 : 0.5;
  }
  if (abs(velocity.y) < 0.5) {
    velocity.y = velocity.y < 0 ? -0.5 : 0.5;
  }
}
