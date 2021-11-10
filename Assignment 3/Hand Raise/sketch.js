/* 
November 8th, 2021 - Spencer Black

-Sketch.js
-poseNet
-Audio

This code is based off of my project 2 assignment 2 the clown nose
*/


let video;
let poseNet;
let pose;

// sound clip of someone saying hello 
const music = new Audio('assets/hello.mp3');

//img
function preload() {
    img1 = loadImage('assets/hello.png');
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

    // We can call both functions to draw all keypoints and the skeletons
    if (pose) {
        handRaise();

    }
}

function handRaise() {
    if (pose.rightWrist.y < (windowHeight / 4)) {
        music.play();
        
        //position is based on the position of the nose
        image(img1, pose.nose.x+80, pose.nose.y-80, 400, 200);
    } else {
        music.pause();
    }
}


function modelReady() {
    select('#status').html('model Loaded');
}