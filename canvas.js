const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth - 4
canvas.height = innerHeight - 4

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth - 4
  canvas.height = innerHeight - 4
})

// addEventListener('resize', () => {
//   clk.x = canvas.width/2
//   clk.y = canvas.height/2
// })



var imgLoc = ['fish/green.png','fish/orange.png','fish/carp.png','fish/angel.png','fish/bass.png','fish/catf.png',
              'fish/coel.png','fish/dace.png','fish/eel.png','fish/killif.png','fish/knife.png','fish/salmon.png',
              'fish/smelt.png','fish/snapper.png','fish/steel.png','fish/string.png','fish/sweet.png','fish/trout.png']
var fishPics = new Array();
for(var j = 0; j < imgLoc.length;j++) {
  fishPics[j] = new Image();
  fishPics[j].src = imgLoc[j];
}
console.log(fishPics)




class Fish {
  constructor(imgsrc) {
    this.x = (canvas.width - 30) * Math.random() + 15
    this.y = (canvas.height - 30) * Math.random() + 15
    this.newX = (canvas.width - 30) * Math.random() + 15
    this.newY = (canvas.height - 30) * Math.random() + 15
    this.imgsrc = imgsrc
    this.flipped
  }

  draw() {
    c.fillRect(this.x, this.y, 4, 4)
    // c.drawImage(this.imgsrc, this.x - 100, this.y - 100, 200, 200)
    drawImage1(this.imgsrc,this.x-100, this.y-100, 155, 155,0, this.flipped)
    this.swim()
  }

  async swim() {
    while (Math.abs(this.x - this.newX) > 10 && Math.abs(this.y - this.newY) > 10) {
      await sleep(40 * Math.random() + 40)
      if (this.x < this.newX) { this.x += .016; this.flipped = true } else { this.x -= .016; this.flipped = false }
      await sleep(150 * Math.random() + 50)
      if (this.y < this.newY) { this.y += .002 } else { this.y -= .002 }
    }
  }

  goToPoint() {
    this.newX = (canvas.width) * Math.random() 
    this.newY = (canvas.height) * Math.random() 
  }

  update() {
    this.draw()
  }
}




var fishArr2 = new Array();
for(var j = 0; j < imgLoc.length; j++) {
  let asd = new Image();
  asd.src = imgLoc[j]
  fishArr2[j] = new Fish(asd);
}
console.log(fishArr2)




setInterval(function () {
  fishArr2.forEach(f => {
    f.goToPoint()
  });
}, 5000)

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  var my_gradient = c.createLinearGradient(0, 0, 0, canvas.height);
  my_gradient.addColorStop(0, "#CCE0FF");
  my_gradient.addColorStop(1, "#0066FF");
  c.fillStyle = my_gradient;
  c.fillRect(0, 0, canvas.width, canvas.width);

  fishArr2.forEach(f => {
    f.update()
  })


}

animate()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//https://nookipedia.com/wiki/Category:Animal_Crossing_fish_sprites_upscaled





function drawImage1(img, x, y, width, height, deg, flip, flop, center) {

  c.save();

  if (typeof width === "undefined") width = img.width;
  if (typeof height === "undefined") height = img.height;
  if (typeof center === "undefined") center = false;

  // Set rotation point to center of image, instead of top/left
  if (center) {
    x -= width / 2;
    y -= height / 2;
  }

  // Set the origin to the center of the image
  c.translate(x + width / 2, y + height / 2);

  // Rotate the canvas around the origin
  var rad = 2 * Math.PI - deg * Math.PI / 180;
  c.rotate(rad);

  // Flip/flop the canvas
  if (flip) flipScale = -1; else flipScale = 1;
  if (flop) flopScale = -1; else flopScale = 1;
  c.scale(flipScale, flopScale);

  // Draw the image    
  c.drawImage(img, -width / 2, -height / 2, width, height);

  c.restore();
}

