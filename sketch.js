var player1,player1Img;
var player2,player2Img;

var p1,p1Image;
var p2,p2Image;

var enemy,enemyImg;
var enemyGroup;

var bullet1,bullet1Img;
var bullet1Group;

var bullet2,bullet2Img;
var bullet2Group;

var bg,bgImg;

var INFO = 0;
var PLAY = 1;
var END = 2;
var gameState = INFO;

var heartP1_1,heart1Img;
var heartP1_2,heart2Img;
var heartP1_3,heart3Img;

var heartP2_1,heart1Img;
var heartP2_2,heart2Img;
var heartP2_3,heart3Img;

var life1 = 3;
var life2 = 3;

var score1 = 0;
var score2 = 0;

var wall1,wall2;

var gameOver,gameOverImg;
var restart,restartImg;
var play,playImg;

function preload(){
  bgImg = loadImage("images/bgImage.png");

  playerImg = loadImage("images/playerImg.png");
  enemyImg = loadImage("images/enemyImg.png");

  bullet1Img = loadImage("images/bulletImg.png");
  bullet2Img = loadImage("images/bulletImg.png");

  heart1Img = loadImage("images/heart_1.png");
  heart2Img = loadImage("images/heart_2.png");
  heart3Img = loadImage("images/heart_3.png");

  gameOverImg = loadImage("images/gameoverImg.png");
  restartImg = loadImage("images/restartImg.png");
  playImg = loadImage("images/playImg.png");

  p1Image = loadImage("images/p1Img.png");
  p2Image = loadImage("images/p2Img.png");
}

function setup(){
  createCanvas(windowWidth-20,windowHeight-20);
  
  bg = createSprite(windowWidth/2,windowHeight/2);
  bg.addImage(bgImg);
  bg.scale = 1.49;
  
  player1 = createSprite(windowWidth/2+400,windowHeight-200);
  player1.addImage(playerImg);
  player1.scale = 0.5;
  player1.setCollider("rectangle",0,50,100,200);

  p1 = createSprite(player1.x,player1.y+80);
  p1.addImage(p1Image);
  p1.scale = 0.2;
    
  player2 = createSprite(windowWidth/2-400,windowHeight-200);
  player2.addImage(playerImg);
  player2.scale = 0.5;
  player2.setCollider("rectangle",0,50,100,200);

  p2 = createSprite(player2.x,player2.y+80);
  p2.addImage(p2Image);
  p2.scale = 0.2;

  wall1 = createSprite(windowWidth/2-600,windowHeight/2,20,windowHeight);
  wall1.visible = false;
  wall2 = createSprite(windowWidth/2+600,windowHeight/2,20,windowHeight);
  wall2.visible = false;
  
  heartP1_1 = createSprite(windowWidth-100,50);
  heartP1_1.addImage(heart1Img);
  heartP1_1.scale = 0.2;
  heartP1_1.visible = false;
  
  heartP1_2 = createSprite(windowWidth-100,50);
  heartP1_2.addImage(heart2Img);
  heartP1_2.scale = 0.2;
  heartP1_2.visible = false;
  
  heartP1_3 = createSprite(windowWidth-100,50);
  heartP1_3.addImage(heart3Img);
  heartP1_3.scale = 0.2;
  
  heartP2_1 = createSprite(windowWidth-100,120);
  heartP2_1.addImage(heart1Img);
  heartP2_1.scale = 0.2;
  heartP2_1.visible = false;
  
  heartP2_2 = createSprite(windowWidth-100,120);
  heartP2_2.addImage(heart2Img);
  heartP2_2.scale = 0.2;
  heartP2_2.visible = false;
  
  heartP2_3 = createSprite(windowWidth-100,120);
  heartP2_3.addImage(heart3Img);
  heartP2_3.scale = 0.2;

  gameOver = createSprite(windowWidth/2,windowHeight/2);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  restart = createSprite(windowWidth/2,windowHeight/2+100);
  restart.addImage(restartImg);
  restart.visible = false;

  play = createSprite(windowWidth/2-50,windowHeight/2);
  play.addImage(playImg);
  play.scale = 0.5;
  play.setCollider("rectangle",0,0,350,125);
  play.visible = false;
  
  enemyGroup = new Group();
  bullet1Group = new Group();
  bullet2Group = new Group();
}
function draw(){
  background(rgb(194,174,104));

  // If game state is INFO
  if(gameState===INFO){
    // console.log("Game state is INFO");
    player1.visible = false;
    player2.visible = false;
    heartP1_3.visible = false;
    heartP1_2.visible = false;
    heartP1_1.visible = false;
    heartP2_3.visible = false;
    heartP2_2.visible = false;
    heartP2_1.visible = false;
    p1.visible = false;
    p2.visible = false;
    bg.visible = false;
    play.visible = true;
    
    textSize(30);
    strokeWeight(2);
    stroke("green");
    fill("orange");
    text("Welcome to",windowWidth/2-120,100);
    textSize(50);
    fill("red");
    strokeWeight(4);
    stroke("yellow");
    text("Shooting Game",windowWidth/2-220,180);
    textSize(30);
    strokeWeight(4);
    stroke("green");
    fill("lightblue");
    text("Player 2:",100,200);
    text("'A' to move Left",70,250);
    text("'D' to move Right",70,300);
    text("'Q' to Shoot",70,350);

    text("Player 1:",windowWidth-400,200);
    text("'Left arrow' to move Left",windowWidth-400,250);
    text("'Right arrow' to move Right",windowWidth-400,300);
    text("'L' to Shoot",windowWidth-400,350);

    if(mousePressedOver(play)){
      gameState = PLAY;
    }
  }
  // If game state is PLAY
  else if(gameState===PLAY){
    
    player1.visible = true;
    player2.visible = true;
    heartP1_3.visible = true;
    heartP1_2.visible = true;
    heartP1_1.visible = true;
    heartP2_3.visible = true;
    heartP2_2.visible = true;
    heartP2_1.visible = true;
    p1.visible = true;
    p2.visible = true;
    bg.visible = true;
    play.visible = false;

    p1.x = player1.x;
    p2.x = player2.x;
      
    // console.log("Game state is PLAY");
    if(keyWentDown("l")){
      bullet1 = createSprite(player1.x+20,player1.y-67,10,50);
      bullet1.addImage(bullet1Img);
      bullet1.velocityY = -25;
      bullet1.lifetime = 500;
      bullet1.scale = 0.3;
      bullet1.setCollider("rectangle",0,0,40,40);
      bullet1Group.add(bullet1);
  }

  if(keyWentDown("q")){
      bullet2 = createSprite(player2.x+20,player2.y-67,10,50);
      bullet2.addImage(bullet2Img);
      bullet2.velocityY = -25;
      bullet2.lifetime = 500;
      bullet2.scale = 0.3;
      bullet2.setCollider("rectangle",0,0,40,40);
      bullet2Group.add(bullet2);
  }
  fill("white");
  textSize(15);
  text("P1 score: " + score1,10,50);
  text("P2 score: " + score2,10,100);
  
  if(keyDown(RIGHT_ARROW)) {
    player1.x = player1.x+15;
  }
  if(keyDown(LEFT_ARROW)) {
    player1.x = player1.x-15;
  }

  if(keyDown("d")) {
    player2.x = player2.x+15;
  }
  if(keyDown("a")) {
    player2.x = player2.x-15;
  }
  
  // Creating enemy sprites
  if(frameCount%60===0){
    enemy = createSprite(random(wall1.x+50,wall2.x-50),-100);
    enemy.addImage(enemyImg);
    enemy.velocityY = 7;
    enemy.scale = 0.5;
    enemy.setCollider("rectangle",0,0,120,120);
    enemy.lifetime = 600;
    enemyGroup.add(enemy);
  }

  if(enemyGroup.isTouching(bullet1Group)){
    for(var i=0;i<bullet1Group.length;i++){
      for(var y=0;y<enemyGroup.length;y++){
      if(enemyGroup[y].isTouching(bullet1Group[i])){
        enemyGroup[y].destroy();
        bullet1Group[i].destroy();
        score1 += 5;
      }
    }
  }
}
if(enemyGroup.isTouching(bullet2Group)){
  for(var i=0;i<bullet2Group.length;i++){
    for(var y=0;y<enemyGroup.length;y++){
    if(enemyGroup[y].isTouching(bullet2Group[i])){
      enemyGroup[y].destroy();
      bullet2Group[i].destroy();
      score2 += 5;
    }
  }
}
}
  // Creat heart for Player 1
  if(life1===3){
    heartP1_3.visible = true;
    heartP1_2.visible = false;
    heartP1_1.visible = false;
    // textSize(25);
    // fill("white");
    // text("You have 3 hearts",heart3.x-300,55);
    if(enemyGroup.isTouching(player1)){
      enemyGroup.destroyEach();
      life1 = 2;
    }
  }
  if(life1===2){
    heartP1_3.visible = false;
    heartP1_2.visible = true;
    heartP1_1.visible = false;
    // textSize(25);
    // fill("orange");
    // text("You have 2 hearts left",heart3.x-310,55);
    if(enemyGroup.isTouching(player1)){
      enemyGroup.destroyEach();
      life1 = 1;
    }
  }
  if(life1===1){
    heartP1_3.visible = false;
    heartP1_2.visible = false;
    heartP1_1.visible = true;
    // textSize(25);
    // fill("red");
    // text("!!You have only 1 heart left!!",heart3.x-370,55);
    if(enemyGroup.isTouching(player1)){
      life1 = 0;
      enemyGroup.destroyEach();
    }
  }
  if(life1===0){
    heartP1_3.visible = false;
    heartP1_2.visible = false;
    heartP1_1.visible = false;
    player1.visible = false;
    p1.visible = false;
    player1.x = windowWidth/2+400;
    player1.x = windowHeight-200;
    bullet1Group.destroyEach();
  }


  // Creat heart for Player 2
  if(life2===3){
    heartP2_3.visible = true;
    heartP2_2.visible = false;
    heartP2_1.visible = false;
    // textSize(25);
    // fill("white");
    // text("You have 3 hearts",heart3.x-300,55);
    if(enemyGroup.isTouching(player2)){
      enemyGroup.destroyEach();
      life2 = 2;
    }
  }
  if(life2===2){
    heartP2_3.visible = false;
    heartP2_2.visible = true;
    heartP2_1.visible = false;
    // textSize(25);
    // fill("orange");
    // text("You have 2 hearts left",heart3.x-310,55);
    if(enemyGroup.isTouching(player2)){
      enemyGroup.destroyEach();
      life2 = 1;
    }
  }
  if(life2===1){
    heartP2_3.visible = false;
    heartP2_2.visible = false;
    heartP2_1.visible = true;
    // textSize(25);
    // fill("red");
    // text("!!You have only 1 heart left!!",heart3.x-370,55);
    if(enemyGroup.isTouching(player2)){
      life2 = 0;
      enemyGroup.destroyEach();
    }
  }
  if(life2===0){
    heartP2_3.visible = false;
    heartP2_2.visible = false;
    heartP2_1.visible = false;
    player2.visible = false;
    p2.visible = false;
    player2.x = windowWidth/2+400;
    player2.x = windowHeight-200;
    bullet2Group.destroyEach();
  }
  
  // Condition for game state END
  if(life1===0 && life2===0){
    gameState = END;
    console.log("Game Over");
  }

  // textSize(20);
  // fill("white");
  // text("Player 1",player1.x-30,player1.y+80);
  // text("Player 2",player2.x-30,player2.y+80);
  
  
  }
  else if(gameState===END){
    // console.log("Game state is END");
    text("Game Over :(",windowWidth/2-100,windowHeight/2);
    gameOver.visible = true;
    restart.visible = true;
    textSize(20);
    fill("white");
    text("Player 1 score: " + score1,restart.x-50,restart.y+100);
    text("Player 2 score: " + score2,restart.x-50,restart.y+150);

    if(mousePressedOver(restart)){
      reset();
    }
  }
  player1.collide(wall1);
  player1.collide(wall2);
  player2.collide(wall1);
  player2.collide(wall2);
  drawSprites();
}
function reset(){
  score1 = 0;
  score2 = 0;
  
  gameOver.visible = false;
  restart.visible = false;
  player1.visible = true;
  player2.visible = true;

  life2 = 3;
  life1 = 3;
  gameState = INFO;
}