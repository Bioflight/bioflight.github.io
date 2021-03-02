class Bullet {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.r = random(5,8);
    this.g = round(random(0,5),0);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.acc = new Vec2(0.1,random(-0.2,0.2));
    if(this.g==5){this.r = 12}
  }

// creation of a particle.
  createParticle() {
    noStroke();
    if(this.g==5)fill(100,200,100);
    else{fill(100,100,200)}
    circle(this.x,this.y,this.r);
  }

// setting the particle in motion.
  moveParticle() {
    this.xSpeed += this.acc.x;
    this.ySpeed += this.acc.y;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}
