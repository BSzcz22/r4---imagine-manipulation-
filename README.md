Image Manipulation
==================
P5 has a wide variety of tools to work with images. But, before we can actually do that, we need to do a bit of setup. Here is a brief example:
```javascript
let myImage; // a variable to store the image

// we use preload here, which runs before setup.
// This is important because loading an image takes time
//   and we need to wait to start our sketch until
//   the things in preload are complete. 
function preload() { 
  myImage = loadImage("path/to/imagefile.imageExtension");
}

// ... setup

function draw() {
  image(myImage,0,0);
}
```
If we think about images as a collection of pixels, it is a pretty easy step to think of those pixels on a grid[^1]. P5 has a wide variety of tools to work with the pixels on this grid. 


Before we start mucking with pixels, though, we need to call `myImage.loadPixels()` before hand, and then `myImage.updatePixels()` after. 

Here are a few highlights: 
* `myImage.get(x,y)` -  gets the pixelactually, a [p5.Color](https://p5js.org/reference/#/p5.Color) at a given (x,y) location.
* `myImage.set(x,y,color)` - sets the pixel at a given location to a particular color.
* There are functions to get the individual channel values of a color: `red(color)`,`green(color)`,`blue(color)` 

## Assignment

You are to develop three distinct image filters. Your filters need to operate by iterating over all the pixels of the image and making some adjustment to each pixel. You can blur, pixelate, make it sepia toned, increase the saturation, etc. Ideally, you do some research into how these filters work and then implement them yourself. 

[^1] - It actually turns out that the pixels aren't stored in a grid, or even as pixels. They are stored in a single array as consecutive channel elements. This array is called [`pixels`](https://p5js.org/reference/#/p5/pixels)