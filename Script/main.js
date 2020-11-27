const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const BALL_RADIUS = 10

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50); // coordinates - width/height
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 70, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.stroke();
// ctx.closePath();

let x = canvas.width / 2
let y = canvas.height - 20

let dx = 2
let dy = -2

const PADDLE_HEIGHT = 10
const PADDLE_WIDTH = 75
let paddleX = (canvas.width - PADDLE_WIDTH) / 2

let rightPressed = false
let leftPressed = false

function keyDownHandler (e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true
  }
}

function keyUpHandler (e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false
  }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function drawBall () {
  ctx.beginPath()
  ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function drawPaddle () {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPaddle()

  if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
    dx = -dx
  }
  if (y + dy > canvas.height - BALL_RADIUS || y + dy < BALL_RADIUS) {
    dy = -dy
  }
  if (rightPressed) {
    paddleX += 5
    if (paddleX + PADDLE_WIDTH > canvas.width) {
      paddleX = canvas.width - PADDLE_WIDTH
    }
  } else if (leftPressed) {
    paddleX -= 5
    if (paddleX < 0) {
      paddleX = 0
    }
  }

  x += dx
  y += dy
}

setInterval(draw, 10)
