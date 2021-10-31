///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//I based my code off of this example 
//https://editor.p5js.org/AndreasRef/sketches/r1_w73FhQ
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

let video;
let poseNet; 
let poses = [];
let skeletons = [];

let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);

  pixelDensity(1);
  graphics = createGraphics(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);

  image(graphics, 0, 0, width, height);

  // Call the function to draw the skeleton
  drawSkeleton();
}



// A function to draw the skeleton
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
        // The lines used for skeleton 
      stroke( 255);
      strokeWeight(10);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// The callback that gets called every time there's an update from the model
function gotPoses(results) {
  poses = results;
}


function modelReady() {
  select('#status').html('model Loaded');
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//I based my code off of the example made by Andre
//https://editor.p5js.org/AndreasRef/sketches/r1_w73FhQ
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////