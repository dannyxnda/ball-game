const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const BALL_RADIUS = 5
canvas.width = 500
canvas.height = 699

const PADDLE_HEIGHT = 5
const PADDLE_WIDTH = 70
let PADDLE_SPEED = 5
let paddleX = (canvas.width - PADDLE_WIDTH) / 2

let x = canvas.width / 2
let y = canvas.height - 2 * PADDLE_HEIGHT

let dx = 5
let dy = -5

let rightPressed = false
let leftPressed = false

const increaseSpeed = (currentSpeed) => currentSpeed < 0 && Math.abs(currentSpeed) < 20
  ? currentSpeed - 0.1
  : currentSpeed + 0.1

let pressed = false

function keyDownHandler (e) {
  pressed = true
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

let firstTime = true
let score = 0

function draw () {
  if (!pressed && !firstTime) return
  firstTime = false
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
      dy = -increaseSpeed(dy)
      dx = increaseSpeed(dx)
      if (PADDLE_SPEED < 8) PADDLE_SPEED += 0.1
      score += 1
      document.getElementById('score').innerHTML = score
    } else {
      alert('GAME OVER')
      document.location.reload()
      clearInterval(interval)
    }
  }

  // key control
  if (rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
    paddleX += PADDLE_SPEED
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLE_SPEED
  }

  x += dx
  y += dy
}

const interval = setInterval(draw, 10)
