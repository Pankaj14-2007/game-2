
var  fatPerson, fatRunner, fatPerson_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg;

function preload(){
 
  backgroundImg = loadImage("assets/backgroundImg.png")
 
  fatRunner= loadAnimation("assets/fat1.png","assets/fat2.png","assets/fat3.png","assets/fat 4.png");

  groundImage = loadImage("assets/ground.png");
  
  obstacle1 = loadImage("assets/obstacle1.png");
  obstacle2 = loadImage("assets/obstacle2.png");
  obstacle3 = loadImage("assets/obstacle3.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fatPerson = createSprite(100,height-70,20,50);
  fatPerson.addAnimation("running", fatRunner);
  fatPerson.scale = 1.08;
  fatPerson.setCollider("circle",0,0,40);

  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(6);

  obstaclesGroup = new Group();
  
  
}

function draw() {
  
  background(backgroundImg);
  
 
    if(touches.length > 0 && fatPerson.y  >= height-120) {
       
      fatPerson.velocityY = -10;
       touches = [];
    }
    
      fatPerson.velocityY = fatPerson.velocityY + 0.8
    
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
    fatPerson.collide(invisibleGround);
    
    
    spawnObstacles();
  
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
  
   drawSprites();
    
  
  }




function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(windowWidth,height-95,100,40);
   
  
    obstacle.velocityX = -(6);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 300;
    obstacle.depth = fatPerson.depth;
    fatPerson.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

