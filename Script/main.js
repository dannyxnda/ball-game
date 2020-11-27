const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const BALL_RADIUS = 5
canvas.width = 500
canvas.height = 699

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

const PADDLE_HEIGHT = 5
const PADDLE_WIDTH = 50
let paddleX = (canvas.width - PADDLE_WIDTH) / 2

let x = canvas.width / 2
let y = canvas.height - PADDLE_HEIGHT

let dx = 5
let dy = -5

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

  // move direction control
  if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
    dx = -dx
  }
  if (y + dy < BALL_RADIUS) {
    dy = -dy
  } else if (y + dy > canvas.height - BALL_RADIUS) {
    if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
      dy = -dy
    } else {
      alert('GAME OVER')
      document.location.reload()
      clearInterval(interval)
    }
  }

  // key control
  if (rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
    paddleX += 3
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 3
  }

  x += dx
  y += dy
}

const interval = setInterval(draw, 10)
