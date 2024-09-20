let p0, p1, p2, p3;
let velP0, velP1, velP2, velP3;
let bola_ma, bola_ma_vel;  
let bola_colisao, bola_colisao_vel, bola_colisao_speed_mod = 0.1;  
let bola_colisao_size = 11;
let bola_ma_reposicionada = false;

function setup() {
  createCanvas(700, 700);
  colorMode(HSB);
  noFill();

  p0 = createVector(100, 500);  //Âncora
  p1 = createVector(300, 100);  //Controle
  p2 = createVector(500, 100);  //Controle
  p3 = createVector(600, 500);  //Âncora

  //velocidaded
  velP0 = createVector(1, 0.5); 
  velP1 = createVector(2, 1.5);  
  velP2 = createVector(-2, -1.5);  
  velP3 = createVector(-1, 0.5);  


  bola_ma = createVector(21, 1);
  bola_ma_vel = createVector(1.5, -1);

  
  bola_colisao = createVector(21, 400);
  bola_colisao_vel = createVector(2, 2);
}

function draw() {
  background(0);  

 
  moveAndBounce(p0, velP0);
  moveAndBounce(p1, velP1);
  moveAndBounce(p2, velP2);
  moveAndBounce(p3, velP3);


  moveAndBounce(bola_ma, bola_ma_vel);

  checkCollision(bola_colisao, velP0, p0);
  checkCollision(bola_colisao, velP1, p1);
  checkCollision(bola_colisao, velP2, p2);
  checkCollision(bola_colisao, velP3, p3);

  // checar colisão com a linha entre as âncoras
  checkCollisionWithLine(bola_colisao, p0, p3);
  moveAndBounce(bola_colisao, bola_colisao_vel, true);
  stroke(0, 100, 255);
  strokeWeight(bola_colisao_size);
  point(bola_ma.x, bola_ma.y);
  for (let t = 0; t <= 1; t += 0.01) {
    let x = bezierPoint(p0.x, p1.x, p2.x, p3.x, t);
    let y = bezierPoint(p0.y, p1.y, p2.y, p3.y, t);
    
    // Mudando a cor com base em t
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

  stroke(60, 100, 255);
  point(bola_ma.x, bola_ma.y);

  
  stroke(200, 255, 255);
  strokeWeight(bola_colisao_size);
  point(bola_colisao.x, bola_colisao.y);
  repel(p0);
  repel(p1);
  repel(p2);
  repel(p3);
}


function moveAndBounce(point, velocity, grow = false) {
  point.add(velocity);  // atualiza a posição do ponto com base na velocidade

  
  if (point.x > width || point.x < 0) {
    velocity.x *= -2;
    if (grow) bola_colisao_size += 0.1; //01 
  }
  if (point.y > height || point.y < 0) {
    velocity.y *= -2;
    if (grow) bola_colisao_size += 0.1; //0.1
  }

  //garantir que a velocidade não seja zero
  if (abs(velocity.x) < 0.5) {
    velocity.x = velocity.x < 0 ? -0.5 : 0.5;
  }
  if (abs(velocity.y) < 0.5) {
    velocity.y = velocity.y < 0 ? -0.5 : 0.5;
  }
}


// repulsão
function repel(point) {
  let distToBolaMa = dist(point.x, point.y, bola_ma.x, bola_ma.y);
  if (distToBolaMa < 100) {  // Se estiver próximo da bola má
    let repelForce = p5.Vector.sub(point, bola_ma);  
    repelForce.setMag(1);  
    point.add(repelForce); 
  }
}


function checkCollision(bola, velBola, ponto) {
  let distToPonto = dist(bola.x, bola.y, ponto.x, ponto.y);
  if (distToPonto < 10) {
    velBola.mult(-1);

    bola_colisao_vel.mult(1 + bola_colisao_speed_mod);
  }
}

function checkCollisionWithLine(bola, p0, p3) {
  let d = distToSegment(bola, p0, p3);
  if (d < 10) {
    bola_colisao_vel.mult(-1);

    bola_colisao_vel.mult(1 + bola_colisao_speed_mod);
  }
}

function distToSegment(p, v, w) {
  const l2 = distSq(v, w);
  if (l2 == 0) return dist(p, v);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = max(0, min(1, t));
  return dist(p, createVector(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y)));
}

function distSq(v, w) {
  return (v.x - w.x) * (v.x - w.x) + (v.y - w.y) * (v.y - w.y);
}
