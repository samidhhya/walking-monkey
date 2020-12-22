var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground,invisibleGround

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}





function setup(){
 createCanvas(600, 200); 
 
  
monkey = createSprite(50,160,20,50);
monkey.addAnimation("running", monkey_running);
  

monkey.scale =0.2;
  
  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  
  
  
  
 
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  

  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug =false
  
  score = 0;
}


function draw() {
  
  background(180);

  text("survival time: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    
    ground.velocityX = -(4 + 3* score/100)
   
    score = score + Math.round(getFrameRate()/60);
    
   
   
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
       monkey.velocityY = -12;
    }
    
    //add gravity
   monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnBanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
       
        gameState = END;
       
      
    }
  }
   else if (gameState === END) {
      
     
     
    
     
     
      ground.velocityX = 0;
     monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
   }
  
 

  monkey.collide(invisibleGround);
  
 
    


  drawSprites();
}



function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnBanana() {
 
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
   banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
   banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

