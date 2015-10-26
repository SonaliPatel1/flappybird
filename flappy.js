// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/submarine2.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("pipe","assets/pipe.png");
game.load.image("background","assets/backgroundsea.jpg");
}
var score = -1;
var labelScore;
var player;
var pipes = [];

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FF3OP4");
    var bg = game.add.image(0, 0,"background");
    bg.width = 790;
    bg.height = 400;
    game.add.text(350, 10, "Welcome to the bottom of the sea",
    {font: "30px Impact", fill: "#FFFFFF"});
    player = game.add.sprite(10, 200, "playerImg");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 200;
    player.width = 50;
    player.height = 50;
    player.x = 150;
    player.y = 200;
   game.input
      .onDown
      .add(clickHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);

    labelScore = game.add.text(20, 20, "0");

    console.log("score")


    game.input.keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);
    generatePipe();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
    var pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    generatePipe);
}

//when the user clicks this will pop-up
function clickHandler(event) {
    var submarine = game.add.sprite(event.x, event.y, "playerImg");
    submarine.width = 100;
    submarine.height = 63;
    changeScore();

}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}

function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
}
function spaceHandler() {
    game.sound.play("score");
}


function moveUp() {
    player.y = player.y - 30;
}
function moveDown() {
    player.y = player.y + 30;
}
function generatePipe() {
    var gapStart = game.rnd.integerInRange(1, 5);
    for(var count=0; count < 8; count++) {
            if (count != gapStart && count != gapStart + 1 && count != gapStart + 2) {
                addPipeBlock(700, count*50);
            }
        }
    changeScore()
}
function addPipeBlock(x, y) {
    // create a new pipe block
    var block = game.add.sprite(x,y,"pipe");
    // insert it in the 'pipes' array
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
}
function playerJump() {
    player.body.velocity.y = -200;
}
function update() {
    game.physics.arcade
        .overlap(player,
    pipes,
    gameOver);

    if (player.y > 400){
        gameOver();
    }

}

function gameOver(){

    location.reload();


}
