var capImg='';
var status='';
var objects=[];
function preload() {
    capImg=loadImage('dog_cat.jpg')
}
function setup() {
    canvas=createCanvas(700,450);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML='status:detectando objetos';
}

function modelLoaded() {
    console.log('modelo carregado');
    status=true;
    objectDetector.detect(capImg,gotResult);
}
function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    console.log(results)
    objects=results
}
function draw() {
    image(capImg,0,0,699,449);
    // fill('green');
    // text('dog',170,50); 
    // noFill();
    // stroke('red');
    // rect(160,30,180,350);

    // stroke('green');
    // fill('blue');
    // text('cat',350,50);
    // noFill();
   
    // rect(350,30,300,350);
    if (status!='') {
        for (var i= 0;  i<objects.length; i++ ) {
            document.getElementById('status').innerHTML='status: objeto detectado';
            fill('yellow');
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+''+percent+'%',objects[i].x,objects[i].y);
            noFill();
            stroke('black');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }        
    }
}
