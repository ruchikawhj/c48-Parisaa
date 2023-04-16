var PLAY=1,END=0,SUPER=2;
var gameState=PLAY;
var animation="player";

var player,playerAnimation,playerAvatar;

var bgImage,bg;

var coinsCollected=0,monsterKilled=0;

var invisibleGround;

var obstacle,obstacleGroup,o1,o2;

var coin, coinGroup, coinImage;

var power,powerImage,powerGroup;

var sword,swordImage,swordGroup;

var monster, monsterAnimation, monsterGroup;
var villain, villainAnimation;
var ninjaStar, ninjaStarImage, ninjaStarsGroup;

function preload(){
  bgImage=loadImage("assets/bgCity.jpg");

  playerAnimation=loadAnimation("assets/boy1.png","assets/boy2.png","assets/boy3.png","assets/boy4.png","assets/boy5.png","assets/boy6.png","assets/boy7.png")
  playerAvatar=loadAnimation("assets/c0.png","assets/c1.png","assets/c2.png","assets/c3.png","assets/c4.png","assets/c5.png","assets/c6.png","assets/c7.png","assets/c8.png","assets/c9.png","assets/c10.png","assets/c11.png","assets/c12.png","assets/c13.png","assets/c14.png","assets/c15.png", "assets/c16.png")

  monsterAnimation = loadAnimation("assets/m1.png", "assets/m2.png","assets/m3.png","assets/m4.png","assets/m5.png","assets/m6.png")
  villainAnimation = loadAnimation("assets/v1.png","assets/v2.png","assets/v3.png","assets/v4.png","assets/v5.png","assets/v6.png","assets/v7.png","assets/v8.png")
  
  o1=loadImage("assets/o1.png");
  o2=loadImage("assets/o2.png");

  ninjaStarImage = loadImage("assets/ninjaStar.png");

  coinImage=loadImage("assets/coin.png");

  powerImage=loadImage("assets/powerImg.png");

  swordImage=loadImage("assets/sword.png")
}

function setup(){
createCanvas(windowWidth,windowHeight);

bg=createSprite(width/2,height/2);
bg.addImage(bgImage);



playerAnimation.frameDelay=3;
//playerAvatar.frameDelay=2;
player=createSprite(150,height-350);
player.addAnimation("running",playerAnimation);
player.addAnimation("avatar",playerAvatar);
animation="player"
player.scale=0.7
//player.debug=true;

player.setCollider("rectangle",0,0,350,250)
invisibleGround=createSprite(width/2,height-175,width,20);
invisibleGround.visible=false;

obstacleGroup=new Group();
coinGroup=new Group();
powerGroup=new Group();
swordGroup=new Group();
monsterGroup = new Group();
ninjaStarsGroup = new Group();

}
function draw(){
  background(0);
  if(gameState===PLAY){
  bg.velocityX=-20;
  if(bg.x<450){
    bg.x=width/2
  }
  if(keyDown("space")&&player.y>height/2-100){
    player.velocityY=-10;
  }
  player.velocityY+=0.8;

  for(var i=0;i<coinGroup.length;i++){
    if(coinGroup.get(i).isTouching(player)){
      coinGroup.get(i).destroy();
      coinsCollected+=1;
    }
  }

  for(var i=0;i<powerGroup.length;i++){
    if(powerGroup.get(i).isTouching(player)){
      powerGroup.get(i).destroy();
      animation="avatar";
      player.changeAnimation("avatar");
      player.scale=0.9;
    }
  }

  if (keyDown("t")) {
    throwSword();
  }

  for(var i =0; i<monsterGroup.length;i++){
    if(monsterGroup.get(i).isTouching(swordGroup)){
      monsterGroup.get(i).destroy();
      monsterKilled+=1
    }
  }

  for(var i=0;i<monsterGroup.length;i++){
    
    if(monsterGroup.get(i).isTouching(player)){
     
      if(animation=="avatar"){
        console.log("collided")
        player.changeAnimation("running");
        animation="player"
        monsterGroup.get(i).destroy();
      }
      if(animation=="player"){
        gameState=END;
      }
    }
  }
  for(var i=0;i<obstacleGroup.length;i++){
    if(obstacleGroup.get(i).isTouching(player)){
      
      if(animation=="avatar"){
        console.log("collided")
        player.changeAnimation("running");
        animation="player";
        obstacleGroup.get(i).destroy();
      }
      if(animation=="player"){
        gameState=END;
      }
    }
  }

  if(monsterKilled===20){
    coinGroup.destroyEach();
    powerGroup.destroyEach();
    monsterGroup.destroyEach();
    swordGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameState=SUPER;
  

  }


 
  drawSprites();
  textSize(25);
  fill("yellow");
  text("Coins Collected: "+coinsCollected,width-300,150);
  text("Monsters Killed: "+monsterKilled,width-300,120)
  //spawnNinjaStars();
  }
  else if(gameState===END){
  /*  player.destroy();
 
    ob
    bg.destroy();*/
    textSize(30);
    fill("yellow");
    text("Game Over!!!!",width/2-100,height/2)

  }
  if(gameState===SUPER){
    spawnVillian();
    drawSprites();
  }
  player.collide(invisibleGround);




}

function spawnObstacles(){
  if(frameCount%120===0){
    obstacle=createSprite(width,height-200);
    var x=Math.round(random(1,2));
    obstacle.velocityX=-6;
    

    if(x==1){
      obstacle.addImage(o1);
      obstacle.scale=0.5;
      obstacle.setCollider("rectangle",0,0,175,175)
    }
    else{
      obstacle.addImage(o2);
      obstacle.scale=0.3;
      obstacle.setCollider("rectangle",0,0,200,200)
    }

    
    obstacle.lifetime=1000;
    obstacleGroup.add(obstacle);
  }


}


function spawnCoins(){
  if(frameCount%60===0){
    coin=createSprite(width,height-200);
    coin.addImage(coinImage)
    coin.y=Math.round(random(height/2-200,height-400))
    coin.velocityX=-6;
    coin.scale=0.15;
    coin.lifetime=1000;
    coinGroup.add(coin);
  }


}

function spawnPower(){
  if(frameCount%620===0){
    power=createSprite(width,height-200);
    power.addImage(powerImage)
    power.y=Math.round(random(height/2-200,height-400))
    power.velocityX=-6;
    power.scale=0.3;
    power.lifetime=1000;
    powerGroup.add(power);
  }


}

function throwSword() {
  sword = createSprite(70, 240, 10, 40);
  sword.addImage(swordImage);
  sword.rotation = -30;
  sword.scale = 0.4;
  sword.velocityY = 1;
  sword.x = player.x;
  sword.y = player.y;
  sword.velocityX = 6;
  sword.lifetime = 80;
 // sword.debug=true;
  sword.setCollider("circle",0,0,100)
  swordGroup.add(sword);
}

function spawnMonster() {
if(frameCount%160===0){
  monster=createSprite(width,height-220);
  monster.addAnimation("monster",monsterAnimation);
  monster.y=Math.round(random(height/2-100,height-220));
  monster.velocityX=-8;
  monster.scale = 0.5 
  monster.lifetime=1000;
  //monster.debug=true
  monster.setCollider("rectangle",0,50,250,300)
  monsterGroup.add(monster);
}
}

function spawnVillian(){

}