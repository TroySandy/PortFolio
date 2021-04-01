const myTurtle = new Image();
myTurtle.src = "turtle.jpeg";
myTurtle.addEventListener("load", function () {
  const canvas2 = document.getElementById("canvas2");
  const ctx = canvas2.getContext("2d");
  canvas2.width = document.getElementsByClassName('turtle').width;
  canvas2.height = document.getElementsByClassName('turtle').height;

  ctx.drawImage(myTurtle, 0, 0, canvas2.width, canvas2.height);
  const pixels2 = ctx.getImageData(0, 0, canvas2.width, canvas2.height);
  ctx.clearRect(0,0, canvas2.width, canvas2.height)

  let particlesArray2 = [];
  const numberOfParticles2 = 10000;

  let mappedImage2 = [];
  for (let y = 0; y < canvas2.height; y++) {
    let row = [];
    for (let x = 0; x < canvas2.width; x++) {
      const red2 = pixels2.data[(y * 4 * pixels2.width) + (x * 4)];
      const green2 = pixels2.data[(y * 4 * pixels2.width) + (x * 4 + 1)];
      const blue2 = pixels2.data[(y * 4 * pixels2.width) + (x * 4 + 2)];
      const brightness = calculateRelativeBrightness(red2, green2, blue2);
      const cell2 = [
        cellBrightness = brightness
      ];
      row.push(cell2);
    }
    mappedImage2.push(row);
  }
console.log(mappedImage2);
  function calculateRelativeBrightness(red2, green2, blue2) {
    return Math.sqrt(
      (red2 * red2) * 0.299 + (green2 * green2) * 0.587 + (blue2 * blue2) * 0.114
    )/100
  }

  class Particle2 {
    constructor() {
      this.x = Math.random() * canvas2.width;
      this.y = 0;
      this.speed = 0;
      this.velocity = Math.random() * 0.5;
      this.size = Math.random() * 1.5;
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
    }
    
    update() {
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      this.speed = mappedImage2[this.position1][this.position2][0];
      let movement = (2.5 - this.speed) + this.velocity;

      this.y += movement;
      if (this.y >= canvas2.height) {
        this.y = 0;
        this.x = Math.random() * canvas2.width;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  function init() {
    for (let i = 0; i < numberOfParticles2; i++) {
      particlesArray2.push(new Particle2());
    }
  }
  init();
  function animate() {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas2.width, canvas2.height);
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < particlesArray2.length; i++) {
      particlesArray2[i].update();
      ctx.globalAlpha = particlesArray2[i].speed * 0.5;
      particlesArray2[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
});
