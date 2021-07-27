var boy1
var ground
var boy1img
var obstacleGroup
var gamestate = 'play'
var boy3img
var count
var sound

function preload(){
boy1img = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png","boy7.png","boy8.png")
ground1img = loadAnimation("ground1.png")
Landmineimg = loadImage("Landmine.png")
spikeballimg = loadImage("Spikeball.png")
boy3img = loadImage("boy3.png")
sound = loadSound("superepic.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  ground = createSprite(windowWidth/2,windowHeight-20,windowWidth,50);
  boy1 = createSprite(80,windowHeight-170,60,60);
  boy1.setCollider("rectangle",0,0,50,80);
  boy1.debug = false;
  boy1.addAnimation("boy1",boy1img);
  boy1.addAnimation("boy3",boy3img);
  ground.velocityX = -5
  ground.addAnimation("ground1",ground1img)
  ground.scale = 1.5;
  boy1.scale = 1.5;
  count = 0;

  invisibleGround = createSprite(windowWidth/2,windowHeight-160,windowWidth,50);
invisibleGround.visible = false;
  obstacleGroup= new Group();

}

function draw() {
  background(0); 
  textSize(30);
  fill("white");
  text("score:" + count,windowWidth-140,150)
  boy1.collide(invisibleGround); 
  drawSprites();
  if(gamestate === 'play'){
    sound.play()
    count=count + Math.round(frameRate()/30);
    if(ground.x < 0){
      ground.x = ground.width/2
    }
    spawnObstacles(); 
  
  if (obstacleGroup.isTouching(boy1)){
  gamestate = 'end'
  }
  }

  if (gamestate === 'end'){
    sound.stop()
    text('gameover',windowWidth/2,windowHeight/2)
    ground.velocityX = 0
    obstacleGroup.setVelocityXEach(0)
    boy1.changeAnimation("boy3",boy3img)
  }
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(displayWidth,windowHeight-250,40,40)
    obstacle.debug = false;
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle)
    var rand = Math.round(random(1,2))
    if (rand === 1){
      obstacle.addImage(Landmineimg)
      obstacle.scale = 0.3
    }
    else if(rand === 2){
      obstacle.addImage(spikeballimg)
      obstacle.scale = 0.1
    }
  }
}
