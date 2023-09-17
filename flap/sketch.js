let bird;
let pipes = [];
let score = 0;
let gameOver = false;
let pipeInterval = 150;  // Adjust this for desired distance between pipes
let gap = 180; 
let pipeCounter = 0; 
let autoPlay = true;  
let logo;

function preload() {
  logo = loadImage('logo.png');
}

function setup() {
  createCanvas(300, 300);
  bird = new Bird();
  pipes.push(new Pipe());
  noStroke();

    // Add touchstart event listener to the canvas
  canvas.elt.addEventListener('touchstart', function (event) {
    event.preventDefault(); // Prevent default behavior
    autoPlay = false;
    jumpBird();
  });
}


function draw() {
  background('#F9F9FE');
  if (!autoPlay) {  // Only display score when not on autopilot
    displayScore();
  }

  bird.update();
  bird.show();
  bird.autoPlay(); 

  for (let i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

if (pipes[i].hits(bird)) {
  resetGame();  // Reset game instead of going to game over
  return;  // Exit the draw function early
}

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      if (!autoPlay) {  // Only increment score when not on autopilot
        score++;
      }
      console.log(score);
    }
  }

  if (pipeCounter >= pipeInterval) {
    pipes.push(new Pipe());
    pipeCounter = 0; 
  } else {
    pipeCounter++;
  }
}

function resetGame() {
  bird = new Bird();
  pipes = [];
  score = 0;  // Nullify score
  pipeCounter = pipeInterval;  // Force a pipe to be added on the next frame
}

function displayScore() {
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(score, width/2, 30);
}

function touchStarted() {
    autoPlay = false;
    jumpBird();
}



function jumpBird() {
  if (!gameOver) {
    bird.up();
  } else {
    restartGame();
  }
}

function restartGame() {
  bird = new Bird();
  pipes = [];
  score = 0;
  gameOver = false;
  pipeCounter = pipeInterval;  // Force a pipe to be added on the next frame
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.lift = -16;
    this.velocity = 0;
    this.lastJumpTime = 0; // Timestamp of the last jump
    this.jumpCooldown = 320; // Cooldown period in milliseconds (0.5 seconds for instance)
    this.angle = 0;  // Current angle
    this.targetAngle = 0;  // Target angle based on velocity
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
    // Update target angle based on altitude
    this.targetAngle = map(this.y, 0, height, -PI / 4, PI / 4);
    
    // Smoothly transition to target angle using lerp
    this.angle = lerp(this.angle, this.targetAngle, 0.05);  // 0.05 is the interpolation amount (adjust to desired smoothness)
  }

show() {
    push();  // Save current drawing state
    translate(this.x, this.y);  // Move to the bird's location
    
    // Map the velocity to the desired rotation range
    let angle = map(this.velocity, -16, 16, -PI / 4, PI / 4);
    // rotate(angle);
    
    imageMode(CENTER);
    image(logo, 0, 0, 64, 64);  // Draw the logo at the translated position

    pop();  // Restore original drawing state
}



  up() {
    this.velocity += this.lift;
  }
  
autoPlay() {
  if (autoPlay) {
    let currentTime = millis(); // Get the current time in milliseconds

    for (let pipe of pipes) {
      // Only consider pipes that are ahead of the bird
      if (pipe.x + pipe.w > this.x) {
        // If the bird's altitude is lower than the bottom of the gap
        if (this.y > pipe.bottom - 50) {
          // Only jump if enough time has passed since the last jump
          if (currentTime - this.lastJumpTime > this.jumpCooldown) {
            this.up();
            this.lastJumpTime = currentTime; // Update the timestamp of the last jump
          }
        }
        break;  // After finding the upcoming pipe, break out of the loop
      }
    }
  }
}
  
}

class Pipe {
  constructor() {
    this.top = random(height - gap);
    this.bottom = this.top + gap;
    this.x = width;
    this.w = 60;
    this.speed = 2;
    let colors = ['#FFC400', '#FF3366', '#3C69F5'];
    this.color = colors[floor(random(colors.length))];
  }

  hits(bird) {
    if ((bird.y - 32 < this.top) || (bird.y + 32 > this.bottom)) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }

  show() {
     fill(this.color);  // light blue color
    let borderRadius = 40;  // Example rounded value
    
    rect(this.x, 0-40, this.w, this.top+40, borderRadius);
    rect(this.x, this.bottom, this.w, height - this.bottom + 40, borderRadius);
  }
}

