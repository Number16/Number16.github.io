var imgs_available = [];
var imgs_shuffled = [];
var img;
var imgs = [];
var generate_btn_tapped = false;

var w = 10;
  var h = 10;






function setup() {



  if (windowWidth * 1.2 > windowHeight) {
    h = min(windowHeight, 600);
    w = h / 1.2;
  } else {
    w = min(500, windowWidth);
    h = w * 1.2;
  }

  createCanvas(w, h);



  for (var i = 1; i<26; i++) {
    imgs_available.push(String(i));
  }

  imgs_shuffled = imgs_available.sort(() => 0.5 - Math.random());

  for (var i = 0; i<25; i++) {
    imgs.push(loadImage('imgs_shuffled[i] + '.png'));
  }



}

function draw() {

  background(255);
        textSize(15);

  textAlign(CENTER);


  let a = w / 125.0;

  let b = w / 5.0 - w/500;

  let c = w / 5.0;

  let d = w / 5.0 - a;


  if (generate_btn_tapped == true) {

  text('Create your personal WWDC bingo\nat https:/lekskeks.com/wwdc-bingo', c*2.5, c/2);
       for (var i = 0; i<5; i++) {
    for (var j = 0; j<5; j++) {
      image(imgs[5*j + i], a + i*b, c + a + j*b, d, d);

    }
  }
  } else {
      text('Tap to generate your personal WWDC bingo', c*2.5, c);


  }





}

function touchStarted() {
  if (generate_btn_tapped == true) {
      save("bingo.png");
  } else {
    generate_btn_tapped = true;
  }


}
