let bee;
let flowers = [];
let gases = [];
let score = 0;
let lives = 3;

function setup() {
  createCanvas(900, 500);

  bee = {
    x: 100,
    y: height / 2,
    size: 25,
    speed: 5
  };

  for (let i = 0; i < 6; i++) {
    flowers.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: 18
    });
  }

  for (let i = 0; i < 4; i++) {
    gases.push({
      x: random(width),
      y: random(height),
      size: 30,
      speed: random(2, 4)
    });
  }
}

function draw() {
  background(144, 238, 144);

  moveBee();

  drawFlowers();
  drawGases();
  drawBee();

  fill(0);
  textSize(24);
  text("Flores polinizadas: " + score, 20, 30);
  text("Vidas: " + lives, 20, 60);

  checkCollisions();

  if (lives <= 0) {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("Fim de Jogo!", width / 2, height / 2 - 30);
    textSize(24);
    text("Pontuação: " + score, width / 2, height / 2 + 20);
    noLoop();
  }
}

function moveBee() {
  if (keyIsDown(LEFT_ARROW)) bee.x -= bee.speed;
  if (keyIsDown(RIGHT_ARROW)) bee.x += bee.speed;
  if (keyIsDown(UP_ARROW)) bee.y -= bee.speed;
  if (keyIsDown(DOWN_ARROW)) bee.y += bee.speed;

  bee.x = constrain(bee.x, 0, width);
  bee.y = constrain(bee.y, 0, height);
}

function drawBee() {
  push();
  translate(bee.x, bee.y);

  let beeWidth = 40;  // largura do corpo
  let beeHeight = 25; // altura do corpo
  let wingSize = 18;  // tamanho das asas

  // Asas
  fill(255, 255, 255, 180);
  stroke(200);
  strokeWeight(1);
  ellipse(-10, -10, wingSize, wingSize + 5);
  ellipse(10, -10, wingSize, wingSize + 5);

  // Corpo
  noStroke();
  fill(255, 220, 0);
  ellipse(0, 0, beeWidth, beeHeight);

  // Listras
  stroke(0);
  strokeWeight(3);
  line(-10, -12, -10, 12);
  line(0, -14, 0, 14);
  line(10, -12, 10, 12);

  // Cabeça
  noStroke();
  fill(255, 220, 0);
  ellipse(-18, 0, 20, 20);

  // Olhos
  fill(255);
  ellipse(-22, -4, 6, 6);
  ellipse(-22, 4, 6, 6);

  fill(0);
  ellipse(-23, -4, 3, 3);
  ellipse(-23, 4, 3, 3);

  // Antenas
  stroke(0);
  strokeWeight(1.5);
  line(-23, -8, -28, -18);
  line(-15, -8, -10, -18);

  noStroke();
  fill(0);
  ellipse(-28, -18, 3, 3);
  ellipse(-10, -18, 3, 3);

  // Ferrão
  fill(80);
  triangle(
    beeWidth / 2, -3,
    beeWidth / 2, 3,
    beeWidth / 2 + 8, 0
  );

  pop();
}

function drawFlowers() {
  for (let flower of flowers) {
    fill(255, 105, 180);

    for (let a = 0; a < TWO_PI; a += PI / 3) {
      ellipse(
        flower.x + cos(a) * 12,
        flower.y + sin(a) * 12,
        12,
        12
      );
    }

    fill(255, 255, 0);
    ellipse(flower.x, flower.y, 15, 15);
  }
}

function drawGases() {
  for (let gas of gases) {
    fill(120, 120, 120, 180);
    ellipse(gas.x, gas.y, gas.size * 2);

    gas.x -= gas.speed;

    if (gas.x < -50) {
      gas.x = width + 50;
      gas.y = random(height);
    }
  }
}

function checkCollisions() {
  // Flores
  for (let flower of flowers) {
    let d = dist(bee.x, bee.y, flower.x, flower.y);

    if (d < bee.size + flower.size) {
      score++;

      flower.x = random(50, width - 50);
      flower.y = random(50, height - 50);
    }
  }

  // Gases
  for (let gas of gases) {
    let d = dist(bee.x, bee.y, gas.x, gas.y);

    if (d < bee.size + gas.size) {
      lives--;

      gas.x = width + random(100, 300);
      gas.y = random(height);
    }
  }
}
