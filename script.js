let myImage;
let originalImage;
let pixelationLevel = 2;

function preload() {
  originalImage = loadImage('GA.jpg');
  myImage = loadImage('GA.jpg');
}

function setup() {
  createCanvas(windowWidth-20,windowHeight-20);
  // scales the image down for speed. Adjust at your own risk.   
  if(myImage.width>myImage.height) {
    originalImage.resize(width*0.5,0); 
    myImage.resize(width*0.5,0); 
  } else {
    originalImage.resize(0,height*0.5);
    myImage.resize(0,height*0.5);
  }
}

function draw() {
  image(myImage,width/2-myImage.width/2, height/2-myImage.height/2);
  noLoop();
}

const manipulationDispatch = {
  "i": invertColors,
  "d": desaturate,
  "r": resetImage,
  "f": flipImage,
  "p": pixelateImage,
  "c": randomColors,
  "b": blurImageblackwhite
}

function keyPressed() {
  if( key in manipulationDispatch ) {
    myImage.loadPixels();
    manipulationDispatch[key]();
    myImage.updatePixels();
    redraw();
  } else {
    if( keyCode === SHIFT ) {
      pixelationLevel += 2;

      resetImage();
     pixelateImage();
    }
  }
}

function resetImage() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      myImage.set(x,y,originalImage.get(x,y));
    }
  }
}

function flipImage() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      myImage.set(x,y,originalImage.get(myImage.width-x,y));
    }
  }
}

function desaturate() {
  const desaturateAmount = 0.8;
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {   
      let originalPixel = myImage.get(x,y);
      const r = red(originalPixel);
      const g = green(originalPixel);
      const b = blue(originalPixel);
      const LUMA = (Math.min(r,g,b) + Math.max(r,g,b))/2
      myImage.set(x,y, color(
        r + desaturateAmount * (LUMA-r),
        g + desaturateAmount * (LUMA-g),
        b + desaturateAmount * (LUMA-b)
      ));
    }
  }
}

function invertColors() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x,y);
      myImage.set( x, y, color(
        255-red(originalPixel),
        255-green(originalPixel),
        255-blue(originalPixel)
      ));
    }
  }
}

function pixelateImage() {
  for( let x = 0; x < myImage.width; x+=pixelationLevel ) {
    for( let y = 0; y < myImage.height; y+=pixelationLevel ) { 
      let r = g = b = 0;
      for( let i = 0; i < pixelationLevel; i++ ) {
        for( let j = 0; j < pixelationLevel; j++ ) {
          let p = myImage.get(x+i,y+j);
          r += red(p);
          g += green(p);
          b += blue(p);
        }
      }
      const pls = pixelationLevel * pixelationLevel;
      const c = color(r /= pls,g /= pls,b /= pls);
      for( let i = 0; i < pixelationLevel; i++ ) {
        for( let j = 0; j < pixelationLevel; j++ ) {
          myImage.set(x+i,y+j,c);
        }
      }
    }
  }     
}
// Justin's Filter
// Help from Mr. Oswald

function randomColors() {
 for( let x = 0; x < myImage.width; x++ ) {
   for( let y = 0; y < myImage.height; y++ ) {
     let originalPixel = myImage.get(x,y);
     myImage.set( x, y, color(
       random(300)-red(originalPixel),
       random(300)-green(originalPixel),
       random(300)-blue(originalPixel)
     ));
    }
  }
}
// Brendan's filter
// Changes colors of the pixels, makes them random within the given color range

function blurImageblackwhite() {
const z = 150/1500 ;
let zep = [[ z , z , z ], [ z , z , z ], [ z , z , z ]];
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      let originalPixel = myImage.get(x,y);
      let sum = 0
      for (bx = -1; bx <= 1; bx++) {
        for (by = -1; by <= 1; by++) {
          let posx = x + bx;
          let posy = y + by;
          let addon = red(myImage.get(posx, posy));
          sum += zep[bx+1][by+1] * addon;
        }
      }
      myImage.set(x, y, sum);
    }
  }
}

// Seth's filter
// this filter takes time to load
// Inspiration: https://p5js.org/examples/image-blur.html