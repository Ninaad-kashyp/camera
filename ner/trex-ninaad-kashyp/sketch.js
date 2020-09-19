var j,l;
var PLAY=1,END=0,SERVE=2;
var score
var obstaclesanimation,obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cloudanimation,cloudsGroup
var trex1,trex2,trexcollided,trex, trex_running, trex_collided,trex12,trex13;
var ground, invisibleGround, groundImage;
var bird,birdanimation,birdstop,b2;
var gameOver,gameoveranimation,restart,restartanimation;
var coins,coinAnimation;
var song1,song2,song3,song4;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudanimation=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  birdanimation=loadAnimation("fly1-removebg-preview.png","fly2-removebg-preview.png")
  gameoveranimation=loadImage("gameOver.png");
  restartanimation=loadImage("restart.png");
  trex12=loadImage("trex1.png")
  b2=loadImage("fly1-removebg-preview.png")
  coinAnimation=loadImage("Star-Game-Gold-Coin.png")
  song1=loadSound("coin.mp3.wav")
  song2=loadSound("download.mp3")
  song3=loadSound("download (1).mp3")
  song4=loadSound("download (2).mp3")
  
 
}

function setup() {
  createCanvas(600, 200);
  gameState=SERVE;
  cloudsGroup=new Group()
  obstaclesGroup=new Group()
  birdsGroup=new Group()
  birdstopGroup=new Group()
  coinsGroup=new Group()
  
    trex1 = createSprite(34,180,20,50);
    trex1.scale = 0.5;
    trex1.addImage("stop",trex12)

    trex=createSprite(34,180,20,50);
    trex.addAnimation("t",trex_running);
    trex.scale=0.5;
    trex.visible=false;
  

    trexcollided=createSprite(34,180,20,50);
    trexcollided.addImage("j",trex_collided)
    trexcollided.scale=0.5;
    trexcollided.visible=false;

    

   
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
 
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  gameOver = createSprite(300,90,40,10);
  gameOver.addImage(gameoveranimation);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart =createSprite(300,120,10,10);
  restart.addImage(restartanimation);
  restart.scale = 0.5;
  restart.visible=false;

  j=createSprite(300,100,600,200);
  j.visible=false;

 

  l=createSprite(300,100,600,200);
  l.visible=false;

  score=0
  level=0
  coins=0
}

function draw() {
  
  background("white");
  
  if (gameState===SERVE){
   
    textFont("monotypecorsivia")
    fill("blue")
    text("welcome",150,100);
    fill("green")
    text("to",200,100)
    fill("red")
    text("trex!",213,100);
    fill("yellow")
    text("tap",238,100);
    fill("blue")
    text("anywhere to ",260,100);
    fill("green")
    text("start tap anywhere to jump",325,100);
    if (mousePressedOver(j)) {
      gameState=PLAY
      trex1.visible=false;
      
    }
    
  }

  if (gameState===PLAY){
    
     trex1.visible=false;
     trex.visible=true;
    ground.velocityX = -(6 + 3*score/100);
  score=score+Math.round(getFrameRate()/60);

  textFont("georgia");
  textSize(12)
  text("score:"+score,500,50);
  text("levels:"+level,300,50);
  fill("green")
  text("coins:"+coins,100,50);
  
  if (score%100===0) {
    level=level+1;
    song4.play()
  }
  
  if (score>555 ) {
    fly();
    
  }
  
  if(mousePressedOver(l) && trex.y>=150) {
    trex.velocityY = -11;
    song2.play()
   
    
    
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(trex.isTouching(obstaclesGroup)){
    gameState=END
    song3.play()
    
  }

 if (trex.isTouching(coinsGroup)) {
   
   coinsGroup.destroyEach()
   coins=coins+1;
   song1.play()
   
 }
 
 
 coi();
  spawnclouds();
  spawnobstacles();
  
  
} else if (gameState===END) {
  
  trexcollided.visible=true;
  trex.visible=false;
  gameOver.visible=true;
  restart.visible=true;
  fill("red")
  textSize(14)
  textFont("georgia")
  text("coins collected",227,50);
  fill("blue")
  textSize(14)
  textFont("georgia")
  text("by you",320,50);
  fill("green")
  textSize(14)
  textFont("georgia")
  text("is"+coins,364,50)

  if (score>200 && coins>30) {
    textFont("georgia")
    textSize(14)
    fill("violet")
    text("you win 🎉🎊😊👍",250,70);
    
  } else {
    textFont("georgia")
    textSize(14)
    fill("violet")
    text("you lose 😭😭😭",250,70);

    
  }

  ground.velocityX=0;
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  birdsGroup.setLifetimeEach(-1);
  birdstopGroup.setLifetimeEach(-1);
  coinsGroup.setLifetimeEach(-1);
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  birdsGroup.setVelocityXEach(0);
  birdstopGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
  birdstopGroup.setVisibleEach(true);
  birdsGroup.setVisibleEach(false);
  if (mousePressedOver(restart)) {
    reset();
    
  }
  

}

trexcollided.collide(invisibleGround);
trex1.collide(invisibleGround);
trex.collide(invisibleGround);

  drawSprites();
  
}

function spawnclouds(){
  if (frameCount%60===0){
    var cloud=createSprite(600,320,40,10);
    
    cloud.addImage(cloudanimation);
    cloud.scale=0.5;
    cloud.velocityX=-3
    cloud.y=Math.round(random(80,120));
    cloud.lifetime=600;
    cloudsGroup.add(cloud);
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    }
}

function spawnobstacles(){
  
  if(camera.position.x=trex.x && frameCount%90===0){
    var obstacles=createSprite(650,160,10,40);
    obstacles.velocityX=-(6 + 3*score/100);
    var Rand=Math.round(random(1,6));
    switch(Rand){
      case 1:obstacles.addImage(obstacle1);
              break;
      case 2:obstacles.addImage(obstacle2);
              break;
      case 3:obstacles.addImage(obstacle3);
              break;
      case 4:obstacles.addImage(obstacle4);
              break;
      case 5:obstacles.addImage(obstacle5);
              break;
      case 6:obstacles.addImage(obstacle6);
              break;
      default:break;                 
    }
    obstacles.scale=0.6;
    obstacles.lifetime=600;
    obstaclesGroup.add(obstacles);
  }
}

function fly(){
  var f=Math.round(random(90,300))
  if (frameCount%f===0) {
    bird=createSprite(700,100,20,20);
    bird.addAnimation("b",birdanimation);
    bird.scale=0.2;
   
    birdstop=createSprite(700,100,20,20);
  
  birdstop.addImage("7",b2)
  
  birdstop.scale=0.2;
  birdstop.visible=false;
  
    bird.velocityX=-3;  
    birdstop.velocityX=-3;

     var ra=Math.round(random(120,90));
     var k=Math.round(random(120,90))
     bird.Y=ra;
     birdstop.Y=k;
     bird.lifetime=600;
     birdstop.lifetime=600;
     birdsGroup.add(bird);
     birdstopGroup.add(birdstop);

  

    
     
    
     
   }

 
}

function coi() {
  if(frameCount%100===0){
  coin=createSprite(650,106,10,10);
  coin.addImage("i",coinAnimation);
  coin.scale=0.05
  coin.velocityX=- (6 + 3*score/100);
   coin.lifetime=200;
   coinsGroup.add(coin);
  }
  
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  birdsGroup.destroyEach();
  coinsGroup.destroyEach();
  birdsGroup.setVisibleEach(true);
  birdstopGroup.setVisibleEach(false);
  
  
  trex.visible=true;
  trex.y=180;
  trex.x=34
  trexcollided.visible=false;
 
  score=0;
  level=0;
  coins=0;
  
}
