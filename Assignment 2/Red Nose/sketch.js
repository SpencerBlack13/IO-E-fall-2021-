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
        fill(255, 0, 0);
        ellipse(pose.nose.x, pose.nose.y, 64);
    }
}

function modelReady() {
    select('#status').html('model Loaded');
}