let video;
let poseNet;
let pose;

function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);

    poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function draw() {
    image(video, 0, 0, width, height);

    // We can call both functions to draw all keypoints and the skeletons
    if (pose) {
        googlyEyes();
    }
}



function googlyEyes() {
    eye(pose.rightEye.x, pose.rightEye.y, 70, 1);
    eye(pose.leftEye.x, pose.leftEye.y, 70, -1);
}

//The googly eyes are copied from Brunoruchiga's example
//https://editor.p5js.org/brunoruchiga/sketches/ByrqL6UJE

// Create googly eye effect on coords, with size and direction
function eye(x, y, size, n) {
    let angle = frameCount * 0.2;

    fill(255);
    noStroke();
    ellipse(x, y, size, size);

    fill(56);
    noStroke();
    ellipse(x + cos(angle * n) * size / 5, y + sin(angle * n) * size / 5, size / 2, size / 2);
}

function modelReady() {
    select('#status').html('model Loaded');
}