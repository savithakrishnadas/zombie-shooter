var gameState="play"
var gameState="end"
 
var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var heart =3;

var zombieGroup;

var bullets=70;

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-200,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   
   bulletGroup = new Group();

    //creating group for zombies    
    zombieGroup = new Group();
}

function draw() {
  background(0); 


  if(gameState==="end"){

zombieGroup.destroyEach()
player.destroy()


  }

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullets = createSprite(displayWidth-1150,player.y-30,20,10);
  bullets.velocity =20
  bulletGroup.add(bullets)
  player.depth=bullet.depth;
  player.depth=player.depth+2;
  bullets=bullets-1;
  
  player.addImage(shooter_shooting)
  
 
 
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
//go to gamestate bullet when player runs out of bullets
if(bullets==0){
gameState="bullet";


}

//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){


 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       heart = heart-1;
       } 
 }
}

if(heart==0){
  heart1.visible=false
  gameState = "end";
}

if(heart==1){
  heart2.visible=false
}

if(heart==2){
  heart3.visible=false
 
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
    if(zombieGroup[i].isTouching(bulletGroup)){
         zombieGroup[i].destroy();
         bulletGroup.destroyEach();
         } 
   }
}
//calling the function to spawn zombies
enemy();

drawSprites();

//destroy zombie and player and display a message in gamestate "lost"
if(gameState =="lost"){
  textsize(100)
  fill("red")
text("Lost",400,400)
zombieGroup.destroyEach();
player.destroy();
}
//destroy  zombie and player and display a message in gamestate"won"
else if(gameState =="won"){
  textsize(100)
  fill("blue")
text("Won",400,400)
zombieGroup.destroyEach();
player.destroy();
}
//destroy zombie and player and bullets and display a message in gamestate"bullet"
else if (gameState =="bullet"){
  textsize(50)
  fill("red")
text("you ran out of bullets",470,410)
zombieGroup.destroyEach();
player.destroy();
bulletGroup.destroyEach();
}

}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}

 
 




