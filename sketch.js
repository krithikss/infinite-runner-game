var tower, towerimg

var door, doorimg, doorGroup

var climber, climberimg, climberGroup

var ghost, ghostimg

var invisibleBlock, invisibleBlockGroup

var gameState = "play"

function preload(){
  towerimg = loadImage("tower.png")
  doorimg = loadImage("door.png")
  climberimg = loadImage("climber.png")
  ghostimg = loadImage("ghost-standing.png")
}

function setup(){
  createCanvas(600,600)
  tower = createSprite(300,300)
  tower.addImage(towerimg)
  tower.velocityY = 1

  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostimg)
  ghost.scale = 0.35

  doorGroup = createGroup()

  climberGroup = createGroup()

  invisibleBlockGroup = createGroup()
}

function draw(){
  background(0)

  if(tower.y>600){
    tower.y = 300
  }

  if(keyDown("space")||keyDown("up")){
    ghost.velocityY = -5
  }

  ghost.velocityY = ghost.velocityY + 0.8

  if(keyDown("left")){
    ghost.x = ghost.x - 3
  }

  if(keyDown("right")){
    ghost.x = ghost.x + 3
  }

  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }

  if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
    ghost.destroy()
  }

  spawnObstacles()

  drawSprites()
}

function spawnObstacles(){
  if(frameCount%240 === 0){
    door = createSprite(200,-50)
    door.addImage(doorimg)
    door.x = Math.round(random(120,400))
    door.velocityY = 1
    door.lifetime = 750
    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1
    doorGroup.add(door)

    climber = createSprite(200,10)
    climber.addImage(climberimg)
    climber.x = door.x
    climber.velocityY = 1
    climber.lifetime = 750
    ghost.depth = climber.depth
    ghost.depth = ghost.depth + 1
    climberGroup.add(climber)

    invisibleBlock = createSprite(200,15)
    invisibleBlock.x = door.x
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.velocityY = 1
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.debug = true
  }
}

