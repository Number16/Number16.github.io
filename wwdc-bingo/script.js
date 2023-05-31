var imgs_available = [];
var imgs_shuffled = [];
var imgs = [];
var centerImg;

var w = 10;
var h = 10;

function preload() {
  for (var i = 1; i <= 24; i++) {
    imgs_available.push(String(i) + '.png');
  }
  
  imgs_shuffled = imgs_available.sort(() => 0.5 - Math.random());

  for (var i = 0; i < 24; i++) {
    imgs.push(loadImage(imgs_shuffled[i]));
  }

  centerImg = loadImage('central.png');
}

function setup() {
  if (windowWidth * 1.2 > windowHeight) {
    h = min(windowHeight, 600);
    w = h / 1.2;
  } else {
    w = min(500, windowWidth);
    h = w * 1.2;
  }

  createCanvas(w, h);
  background(0);
  
  fill(255); // Set the text color to white
  textSize(30);
  textAlign(CENTER);
  text('WWDC BINGO', w/2, h/10 + 10);

  let a = w / 125.0;
  let b = w / 5.0 - w/500;
  let c = w / 5.0;
  let d = w / 5.0 - a;

  for (var i = 0; i<5; i++) {
    for (var j = 0; j<5; j++) {
      if(i == 2 && j == 2) {
        image(centerImg, a + i*b, c + a + j*b, d, d);
      } else {
        var img = imgs.shift();
        imgs.push(img);
        image(img, a + i*b, c + a + j*b, d, d);
      }
    }
  }
}

function touchStarted() {
  save("bingo.png");
}
