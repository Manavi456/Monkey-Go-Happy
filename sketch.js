var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground;

var monkey , monkey_running;

var bananaImage, obstacleImage;

var bananaGroup, obstacleGroup;

var score;

var survivalTime;

var gameOver;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  
}



function setup() {
  createCanvas(600, 300)

  //create monkey sprite
  monkey = createSprite(25, 250, 20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1; 
  
  //create ground sprite
  ground = createSprite(300,290,600,20);
  ground.velocityX = -4;
  ground.shapeColor=("gainsboro")
 
  //create Obstacle and Food Groups
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  survivalTime = 0;
  score = 0;
  
}


function draw() {
 background("floralwhite");
    //displaying score
  stroke("white");
  textSize(20);
  fill("black");
  text("Score:" + score, 100, 50)
  
  stroke("black");
  textSize(20);
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("SurvivalTime:"+ survivalTime, 450, 50)

  
  if(gameState===PLAY){
    
     if(ground.width/2){
     ground.x = 300}
    
    if(keyDown("space") && monkey.y >= 150){
        monkey.velocityY = -12; 
    }
    
    if(bananaGroup.isTouching(monkey)){
       bananaGroup.destroyEach();
        score=score+1;
    }

    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8; 
    
        if(obstacleGroup.isTouching(monkey)){
            gameState = END;
          
          text("GAME OVER", 300, 150);
          
                  monkey.visible = false;
                  
          
                  ground.velocityX = 0;
                  monkey.velocityX = 0;
          
          
        } else if (gameState===END){
      
          
                  obstacleGroup.setVelocityXEach(0);
                  bananaGroup.setVelocityXEach(0);
          
                  obstacleGroup.setLifetimeEach(-1);
                  bananaGroup.setLifetimeEach(-1);
            
  
        }
    
    food();
    
    obstacles();
    
  }
  
 monkey.collide(ground);
  drawSprites();
  
}

function food() {
  
  if(frameCount%80===0){
    var Banana = createSprite(600, 180, 20, 20);
    Banana.velocityX = (-4);
    Banana.addImage(bananaImage)
    Banana.scale = 0.1
    Banana.y = Math.round(random(130,200));
    Banana.lifetime = 200;
    bananaGroup.add(Banana);
  }
}

function obstacles() {
  if(frameCount%300===0){
    var Obstacle = createSprite(600, 290, 20, 20);
    Obstacle.velocityX = (-4);
    Obstacle.addImage(obstacleImage);
    Obstacle.scale = 0.1;
    Obstacle.x = Math.round(random(120, 200));
    Obstacle.lifetime = 200  
    obstacleGroup.add(Obstacle);
  }
}




