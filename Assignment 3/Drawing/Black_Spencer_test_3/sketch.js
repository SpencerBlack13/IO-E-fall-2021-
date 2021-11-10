/* 
November 8th, 2021 - Spencer Black

-Arduino code uploaded and setup
-P5.serial controller
-Sketch.js

This code was based off of Doug Whitton's 
play 3 analog sensors that output sound and circle graphic
The Arduino file that's running is "threeSensorExample"
*/

var x = 0;
var y = 0;
var prev_x = 0;
var prev_y = 0;



let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let diameter0 = 0, diameter1 = 0, diameter2 = 0;

var button = 0;

function setup() {

///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
///////////////////////////////////////////////////////////////////    
    
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();
  console.log("serial.list()   ", serial.list());

  ///////////////////////////////////////////////////////////////////////
  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("COM3");
 /////////////////////////////////////////////////////////////////////////////
  
  // Here are the callbacks that you can register
  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);

createCanvas(windowWidth, windowHeight);

  // Set background colour
  background( 204 );

  // Set line thickness
  strokeWeight( 2 );
    
}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////

// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}



// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 

  //Sensors
  //button  
  diameter0 = splitter[0];                 
    //potentiometer 1
  diameter1 = splitter[1];
    //potentiometer 2
  diameter2 = splitter[2]; 
}




function draw() {
    
    function button(){
    if  (diameter0 == 1){
          fill( 255, 255, 255);
          rect( 0, 0, width, height);
    }
}
    
    
//This is the serial monitor for the potentiometer
//text(latestData, 10,10);
    
  //The cirlce 
  ellipseMode(RADIUS);    
  fill(0,0,127);
  noStroke(); 
    
    //one cirlce is moved on the X and Y axis
     var positionY = map(diameter1, 0, 1020, 0, windowHeight);
     var positionX = map(diameter2, 0, 1020, 0, windowWidth);
  
    ellipse(positionX, positionY, 50, 50);
    ellipseMode(RADIUS);    

//I took this code from Creative Technology Lab 
//https://github.com/creativetechnologylab/etch-a-sketch-p5js

  // Draw a line from current to previous X,Y
  line( x, y, prev_x, prev_y );

  // Store X,Y position for next frame
  prev_x = x;
  prev_y = y;

  // Set the fill colour to transparent white
  fill( 255, 255, 255, 1.5);

  // Turn off stroke
  //noStroke(on);

  // Fill screen with transparent white
  rect( 0, 0, width, height );
//I took this code from Creative Technology Lab 
    
}


 