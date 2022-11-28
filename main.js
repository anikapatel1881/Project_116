noseX = 0;
noseY = 0;

function preload(){
    dog_nose = loadImage("dog.png");
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();

    //Access the webcam:
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();

    //Initiaze PoseNet:
    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 400, 400);
    image(dog_nose, noseX, noseY, 200, 250);
}

function take_snapshot(){
    save("myFilterImage.png");
}

function modelLoaded(){
    console.log("Model loaded successfully");
}

function gotPoses(results){
    if(results.length > 0){
        noseX = results[0].pose.nose.x - 100;
        noseY = results[0].pose.nose.y - 150;
        //console.log("nose coord x = " + results[0].pose.nose.x);
        //console.log("nose coord y = " + results[0].pose.nose.y);
    }
}