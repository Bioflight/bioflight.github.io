objects = [new Ball(300, 400), new BulletSource(5, 400)];
bscore = 10;
z = 0;
zz = 0;
died = false;
hs = 0;
d = true;  
ghs = ""; 
rid = "";  
paused = true;
start = false;

function setup() {
  var renderer= createCanvas(600, 700);
  renderer.parent("left");
  rectMode(CENTER);
  if (document.cookie.includes("rid")) {
    rid = document.cookie.split("rid=")[1].split("; ")[0];
  } else {
    rid = String.fromCharCode(random(33, 121)) + String.fromCharCode(random(33, 121)) + String.fromCharCode(random(33, 121)) + String.fromCharCode(random(33, 121))
    document.cookie = "rid=" + rid + "; ";
  }
}

function Vec2(x, y) {
  this.x = x;
  this.y = y;
}

function BulletSource(x, y) {
  this.pos = new Vec2(x, y);
  this.bullets = []; // make a new class 4 dis
  this.tick = function() {
    if (!died&& !paused) {
      if (frameCount % 2 == 0) this.bullets.push(new Bullet(this.pos.x, this.pos.y));
      this.pos.y = frameCount % 800;
    }
  }
  this.render = function() {

    Array.from(this.bullets).forEach(function(i, j) {
      i.createParticle();
      if (!died&& !paused) {
        i.moveParticle();
        if (i.y > height || i.y < 0 || i.x > width) {
          this.bullets.splice(j, 1);
        }
      }
    }, this);
  }
}

function Ball(x, y) {
  this.particles = [];
  this.pos = new Vec2(x, y);
  this.vel = new Vec2(0, 0);
  this.acc = new Vec2(0, 0);
  this.speed = 0.6;
  this.boosts = 10;
  this.boost = function() {
    this.pos.x += this.vel.x * 20;
    this.pos.y += this.vel.y * 20;
  }
  this.render = function() {
    fill(105, 100, 150);
    circle(this.pos.x, this.pos.y, 20);
    Array.from(this.particles).forEach(function(i, j) {
      i.createParticle();
      i.moveParticle();
      if (i.y > height) {
        this.particles.splice(j, 1);
      }
    }, this);
  }
  this.tick = function() {
    this.particles.push(new Particle(this.pos.x, this.pos.y));
    objects[1].bullets.forEach(function(i) {
      if (dist(i.x, i.y, this.pos.x, this.pos.y) < i.r && i.g != 5 && !died&& !paused) {
        bscore--;
        z = 255;
      } else if (dist(i.x, i.y, this.pos.x, this.pos.y) < i.r && i.g == 5 && !died&& !paused) {
        this.boosts++;
        bscore++;
        zz = 255;

      }
    }, this);
    if (!died&& !paused) {
      this.vel.x += this.acc.x;
      this.vel.y += this.acc.y;
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;

      if (keyIsDown(87)) {
        this.vel.y -= this.speed;
      }
      if (keyIsDown(83)) {
        this.vel.y += this.speed;
      }
      if (keyIsDown(65)) {
        this.vel.x -= this.speed;
      }
      if (keyIsDown(68)) {
        this.vel.x += this.speed;
      }

      this.acc.x = -this.vel.x / 10;
      this.acc.y = -this.vel.y / 10;

      if (this.pos.y > height || this.pos.y < 0) {
        // bscore--;
        this.pos.x = 250;
        this.pos.y = 250;
      }
    }
  }

}

function keyPressed() {
  if (keyCode == 32) { // :) figured it out, this is to boost when spacebard
    if (objects[0].boosts > 0) {
      objects[0].boost();
      objects[0].boosts--;
    }
  }
  if (keyCode == 80) {
    paused = !paused;
    start = true;
  }
}

function draw() {
  z -= z / 10;
  zz -= zz / 10;
  background(z, zz, 0);
  objects.forEach(function(i, j) {
    i.tick();

  });
  if (paused){
    if (!start){
      background(10, 100, 100);
      textSize(50);
      text("Bioflight", width / 2 - 120, height / 2 - 20);
      textSize(30);
      text("Press P To Start", width / 2 - 115, height / 2 + 30);
      textSize(20);
    }else{
      background(100, 0, 100);
      textSize(50);
      text("Paused", width / 2 - 120, height / 2 - 20);
      textSize(30);
      text("Press P To Continue", width / 2 - 115, height / 2 + 30);
      textSize(20);
    }
  }
  if (bscore < 1) {
    if (d && hs < objects[0].boosts) {
      hs = objects[0].boosts
      fetch("https://pekopekolanddb.locknessko.repl.co/?n=" + rid + "&s=" + hs)
      fetch("https://pekopekolanddb.locknessko.repl.co/s").then(x => x.text()).then(y => ghs = y);
    }
    d = false;
    background(100, 0, 0);
    died = true;
    textSize(50);
    text("You Died", width / 2 - 120, height / 2 - 20);
    textSize(30);
    text("Click to Restart", width / 2 - 115, height / 2 + 30);
    textSize(20);

    text("Leaderboard\n" + ghs, width / 2 - 115, height / 2 + 80);
    if (mouseIsPressed) {
      bscore = 10;
      z = 255;

      zz = 200;
      died = false;
      objects[0].boosts = 10;
      objects[0].pos.x = width / 2;

      objects[0].pos.y = height / 2;
      d = true;
    }
  }
  objects.forEach(function(i, j) {
    i.render();
  });
  fill(180);
  textSize(20);
  text("Health " + bscore, 30, 30);
  text("ID " + rid, 320, 30);
  text("Boosts " + objects[0].boosts, 180, 30);


}
