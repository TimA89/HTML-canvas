const canvas = document.getElementById('canvas')
// getContext - identifies type if drawwing 2d- is  value 2-dimensional
// Now we have the 2D rendering context for a canvas and we can draw within it.
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

Simple squares ----------------------------------------------
Styling of fill

ctx.fillStyle = "yellow"
// fillRect takes 4 arguments x, y, width, height
ctx.fillRect(100, 100, 100, 100)
// we can add code to style it independatly
ctx.fillStyle = "green"
ctx.rect(400, 100, 100, 100)
// ctx.strokeStyle = "pink"
ctx.stroke()
ctx.fillRect(100, 400, 100, 100)

-------------------------------------------------------------

// Line --------------------------------------------------------
// starting a path

ctx.beginPath()
ctx.moveTo(50,300)
// continue to
ctx.lineTo(300, 100)
ctx.lineTo(400, 300)
// add after showing stroke
ctx.strokeStyle = "pink"
// we need to call a stroke method to show a line colored
ctx.stroke()

// -------------------------------------------------------------

// Circle ------------------------------------------------------

ctx.beginPath()
// x, y, radius, startAngle, endAngle, counterClockwise?
ctx.arc(300, 300, 30, 0, Math.PI * 2, false)
ctx.strokeStyle = "blue"
ctx.stroke()

// -------------------------------------------------------------

// we can copy paste code or write a for loop

// More than one circle ----------------------------------------

for (let i = 0; i < 3; i++) {
  ctx.beginPath()
  ctx.arc(300, 300, 30, 0, Math.PI * 2, false)
  ctx.strokeStyle = "blue"
  ctx.stroke()
}

// Circles stack one on top of each other and become bold
// not to comfy
// we can copy paste code 3 times, but DRY, thats why for loop

for (let i = 0; i < 3; i++) {
  // random returns a value 0-1 we multiply by W and H so walues are spreded
  const x = Math.random() * window.innerWidth
  const y = Math.random() * window.innerHeight
  ctx.beginPath()
  ctx.arc(x, y, 30, 0, Math.PI * 2, false)
  ctx.strokeStyle = "blue"
  ctx.stroke()
}

// -------------------------------------------------------------

// we can copy creation of circle ------------------------

ctx.beginPath()
ctx.arc(200, 300, 30, 0, Math.PI * 2, false)
ctx.strokeStyle = "blue"
ctx.stroke()

and add loop for it as function calling on another function

function animate() {
  requestAnimationFrame(animate)
  console.log('blah')
}
animate()
// ------------------------------------------------------------

// animation almost works like refreshing a page and every time
// its replace we moving circle
// add our circle code into loop

// declare var for coordinates outside of function
// first try with 200 for x,y

let x = 200 //Math.random() * window.innerWidth //200
// than add velocity and after y
// adding velocity wich is a spead(as defined by x+=1)
let dx = 4 //(Math.random() - 0.5) * 8//4
let y = Math.random() * window.innerHeight //200
let dy = (Math.random() - 0.5) * 8//4
const radius = 30
function animate() {
  // delete previous add new so we only have circle
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  requestAnimationFrame(animate)
  ctx.beginPath()
  ctx.arc(x, y, 30, 0, Math.PI * 2, false)
  ctx.strokeStyle = "blue"
  ctx.stroke()
  // console.log('blah')
  // creating an if statement so x and y wont increase borders
  // if (x + radius > innerWidth) {
  // add or operator so it wont hit second side
  if (x + radius > innerWidth || x - radius < 0) {
    dx = -dx
  }
  if (y + radius > innerHeight || y - radius < 0) {
    dy = -dy
  }
  // changing x each loop
  x += dx
  y += dy
}
// and invoke a function
 animate()
//
// -----------------------------------------------------------

// keep this code here so we can reuse it

let x = Math.random() * innerWidth
let dx = (Math.random() - 0.5) * 8
let y = Math.random() * innerHeight
let dy = (Math.random() - 0.5) * 8
const radius = 30

// we wont to create multiple circles instead of DRY ing previous
// code we shoud do the callback

const Circle = function(x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  // after adding update function
  this.dx = dx
  this.dy = dy
  // after updated this in upload
  this.radius = radius
//
  this.draw = function () {
  // create draw method woth conlole.log first
   // console.log('hey')
//
  // then add our code
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.strokeStyle = "blue"
    ctx.stroke()
    // after for loop to create 100 circles done
    // ctx.fill()
  }
//
//   // now we need to create update function to specify movement
//   // of our circle
//   // no THIS first
  this.update = function () {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy
      }
      // changing x and y each loop
      this.x += this.dx
      this.y += this.dy
      // we need to invoke draw withing update so it will draw
      // new circles everytime we move previous one
      this.draw()
  }
  // this.draw()
}
//
// // // this will create only one circle
// const circle = new Circle(200, 300, 4, 4, 30)
// circle.draw()
//
// // but we want to have multiple Circles
const circleArray = []
// // for loop to create 100 circles
for (var i = 0; i < 100; i++) {
  // first have radius lower, but move it up so it would not have half circles
  const radius = 30
  // original x,y Math.random() * innerWidth
  // we need to take diametr away and add radius
  // change color of circles
  let x = Math.random() * (innerWidth)// - radius * 2) + radius
  let dx = (Math.random() - 0.5) * 8
  let y = Math.random() * (innerHeight)// - radius * 2) + radius
  let dy = (Math.random() - 0.5) * 8
  // const radius = 30
  circleArray.push(new Circle(x, y, dx, dy, radius))
  // we are still not able to draw circles, cause we need to add
  // a for loop in animate function
}
//
function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)

  // using array with 100 circles to draw
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update()
  }
  // calling update function so position will change
  // circle.update()
}
 animate()
