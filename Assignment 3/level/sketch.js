let video;
let poseNet;
let pose;

function preload() {
    img1 = loadImage('assets/robot.png');
    img2 = loadImage('assets/floor.png');

}

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
    image(img2, 0, 0, windowWidth, windowHeight);

    if (pose) {
        image(img1, pose.rightWrist.x, pose.rightWrist.y-150, 100, 150);
        //image(img1, pose.leftWrist.x, pose.leftWrist.y-150, 100, 150);
    }
    
}


function modelReady() {
    select('#status').html('model Loaded');
}