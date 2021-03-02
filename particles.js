class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.r = random(1,8);
    this.xSpeed = random(-1,1);
    this.ySpeed = random(-2,0.2);
    this.acc = new Vec2(0,random(0.1,0.2));
  }

// creation of a particle.
  createParticle() {
    noStroke();
    fill('rgba(200,169,169,0.5)');
    circle(this.x,this.y,this.r);
  }

// setting the particle in motion.
  moveParticle() {
    this.xSpeed += this.acc.x;
    this.ySpeed += this.acc.y;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        stroke('rgba(255,255,255,0.04)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}
