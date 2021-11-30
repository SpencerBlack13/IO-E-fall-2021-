/* 
November 2021 - Spencer Black 
The code uses posenet and displays the video as circles

I based my code off of code from second year that converted the video into circles
*/

let cam;
let stepSize = 8;
let vwidth = 640, vheight = 480;
let pxl, rslt;

let poseNet, pose;
let maxColorSpeed, minColorSpeed;

//let r, g, b;

let amt, startColour, newColour;
 
function setup() {
    createCanvas(windowWidth, windowHeight);
    cam = createCapture(VIDEO);
    
    cam.hide();
    noStroke();

    // Posenet setup
    poseNet = ml5.poseNet(cam, modelReady);
    poseNet.on('pose', gotPoses);
    
    // Color setup
    moveThreshold = 5;
    //Speed in which the colours change colour Min - Max
    minColorSpeed = 0.000001;
    maxColorSpeed = 0.0001;
    
    //Randomizing colours 
    startColor = color(255,255,255);
    newColor = color(random(255),random(255),random(255));
    amt = 0;
    
    fill(startColor);
}

function gotPoses(poses){
    if (poses.length > 0){
      pose = poses[0].pose
    }
}
 
function draw() {
    //background black
    background(0);
    
    cam.loadPixels();
    for (let y = 0; y < vheight; y += stepSize) {
    for (let x = 0; x < vwidth; x += stepSize) {
        
      fill(lerpColor(startColor, newColor, amt));

        // Changes the colours through posenet 
        //Lerp determines the position of your nose and adjusts the colour speed acordingly 
      if (pose){
        let lerpValue = lerp(minColorSpeed, maxColorSpeed, pose.nose.x / windowWidth);
        amt += lerpValue;
      }else{
        amt += minColorSpeed;
      }

      if(amt >= 1){
        amt = 0.0;
        startColor = newColor;
        newColor = color(random(255),random(255),random(255));
      }

      const i = y * vwidth + x;
      const darkness = (250 - cam.pixels[i * 4]) / 255;
      let radius=(stepSize * darkness) * 2;
      ellipse(map(x, 0, vwidth, 0, width), map(y, 0, vheight, 0, height), radius, radius);
    }
  }
}

function modelReady(){
    select('#status').html('model Loaded');  
}