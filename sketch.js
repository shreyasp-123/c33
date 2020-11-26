const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, bird2, bird3, bird4, slingshot;
var selection, flying, pigSnort
var score = 0;
var birds = []

var gameState = "onSling";

function preload() {
    getBackgroundImg();
    selection = loadSound("sounds/selection.wav")
    flying = loadSound("sounds/fly.mp3")
    pigSnort = loadSound("sounds/pigSnort.ogg")
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150, 170)
    bird3 = new Bird(100, 170)
    bird4 = new Bird(50, 170)
    birds.push(bird4)
    birds.push(bird3)
    birds.push(bird2)
    birds.push(bird)

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
    
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    textSize(30)
    fill("white")
    text("Score: " + score, width-150, 50)
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display()
    bird3.display()
    bird4.display()

    platform.display();
    //log6.display();
    slingshot.display();
    pig1.score();
    pig3.score();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length - 1].body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    birds.pop()
    flying.play();
}

function keyPressed(){
    if(keyCode === 32 && birds[birds.length - 1].body.speed < 1){
        if(birds.length >= 0){
            Matter.Body.setPosition(birds[birds.length - 1].body, {x: 200, y: 50})
            selection.play()
            slingshot.attach(birds[birds.length - 1].body);
            gameState = "onSling"
        }

    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Los_Angeles");
    var responseJSON = await response.json()
    console.log(responseJSON)
    var dt = responseJSON.datetime;
    console.log(dt)
    var hour = dt.slice(11, 13)
    if(hour>= 06&& hour<19){
        bg = "sprites/bg.png"
    } else {bg = "sprites/bg2.jpg"}
    backgroundImg = loadImage(bg)
    console.log(bg)
}