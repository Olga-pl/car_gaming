const config = {
  width: 700,
  height: 600,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug : false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
let car;
let cursors;
let background;
let barriers;
let barrier1;
let collision;
let count = 0;
let speed = 3;
let score = 0;
let scoreText;
let doubleSpeed = 0;
let end;
let refresh; 

function preload() {
  this.load.spritesheet("route", "/img/road.png", {
    frameWidth: 800,
    frameHeight: 600
  });
  this.load.image("car", "/img/car2.png");
  this.load.image("barrier", "/img/caisse_opt.png");
  this.load.image("refresh", "/img/refresh.png")
}

function create() {
  // this.add.image(400, 300, "route");
  this.tileSprite = this.add.tileSprite(0, 0, 1600, 1200, "route");

  barriers = this.physics.add.sprite(Math.floor(Math.random() * 650) + 50, 0, 'barrier').setOrigin(1);
  barrier1 = this.physics.add.sprite(600, 0, 'barrier').setOrigin(1);


  // barrier1 = barrier1.create(600, 0, 'barrier').setOrigin(0);
  // barrier2 = barrier.create(300, 0, 'barrier').setOrigin(0);

  car = this.physics.add.image(600, 600, "car");
  car.body.collideWorldBounds = true;

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(car, barriers, collisionHandler)
  this.physics.add.collider(car, barrier1, collisionHandler)

  // collision = this.physics.add.overlap(car, barrier1, collisionHandler, null, this)

  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });

  // refresh = this.add.image(230, 35, 'refresh')
  // refresh.setInteractive().on('pointerdown', ()=> this.scene.start('preload'))

}

function update() {
  if (end === 1) {
    this.tileSprite.tilePositionY = 0;
    this.scene.restart();
    return;
  }
  this.tileSprite.tilePositionY -= speed;

  car.y += 3

  barriers.y += speed
  // barrier2.y += 3
  if (barriers.y > 600) {
    count +=1;
    score += 1;
    doubleSpeed += 1;
    scoreText.setText('Score: ' + score);
    console.log(score)
    if(count == 3){
      count = 0
      speed = speed + 0.5
    }
    if(doubleSpeed == 10 || doubleSpeed == 20 || doubleSpeed == 50){
    speed = speed + 2
    }
    barriers.y = 0;
    barriers.x = Math.floor(Math.random() * 650) + 50
    //barriers.x = 50
    // barrier1 = barrier1.setOrigin(1);
  }

  // barrier1.y += 3
  // // barrier2.y += 3
  // if (barrier1.y > 300) {
  //   barrier1.y = 0;
  //   barrier1.x = Math.floor(Math.random() * 500) + 150
  // }
  car.setVelocityX(0);

  if (cursors.right.isDown) {
    car.setVelocity(speed*100, 0);
  }
  if (cursors.left.isDown) {
    car.setVelocity(-speed*100, 0);
  }
  // if (cursors.up.isDown) {
  //   console.log("up")
  //   car.setVelocityY(-400);
  // }
  // if (cursors.down.isDown) {
  //   console.log("up")
  //   car.setVelocityY(400);
  // }
}

function collisionHandler() {
  console.log("stop game")
  end = 1;
//  this.tileSprite.tilePositionY = 0;
}

// function clickButton(){
//   console.log("button clicked")
//   game.destroy();
// }