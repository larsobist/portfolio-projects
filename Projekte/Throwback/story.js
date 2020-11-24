//alle
var player;
var map;
var map2;
var map3;
var map4;

var cursors;
var leben = 3;
var lebenText;
var herz1;
var herz2;
var herz3;
var cameraX = 0;
var boden;

var portalAusgang;
var portalEingang;

//lvl1
var dekoration;
var himmel;
var auto;
var portal;

//lvl2
var hintergrund;
var portal;
var hindernisse;
var dekoKollision;
var deko;
//lvl 3
var routeWW2;
var beschleunigung = -100;
var dekoHintergrund;
var bomben;
var bomben1;
var bomben2;
var bomben3;

//lvl4
var boden20er;
var hintergrund20er;
var cursors;
var bounds;
var top;
var tor;
var portrait;
var beschleunigung = -100;

function story() {
    document.getElementById("storyEinleitung").style.display = "none";
    
    let config = {
        type: Phaser.AUTO,
        top: 0,
        left: 0,
        width: 1000,
        height: 608,
        parent: "field",
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 300
                },
                debug: false
            }
        },
        scene: [storyLevel1, storyLevel2, storyLevel3, storyLevel4]

    };
    let game = new Phaser.Game(config);
}

function openGameOverScreen() {
    document.getElementById("gameOver").style.display = "block";
}

function gameOver(game) {
    player.setVelocityX(0);
    player.anims.play('left', false);
    leben--;

    if (leben <= 0) {
        let gameOverSound = new Audio();
        gameOverSound.src = 'assets/sound/gameOver.mp3';
        gameOverSound.volume = 0.5;
        gameOverSound.play();

        openGameOverScreen();

        let canvas = document.querySelector("canvas");
        canvas.parentNode.removeChild(canvas);

    } else {
        let errorSound = new Audio();
        errorSound.src = 'assets/sound/error.mp3';
        errorSound.volume = 0.5;
        errorSound.play();
        game.scene.restart();
    }
}

function storyGeschafft() {
    this.scene.stop('storyLevel4');
    let canvas = document.querySelector("canvas");
    canvas.parentNode.removeChild(canvas);
    document.getElementById("storyGeschafft").style.display = "block";
    console.log("story complete");
}

function death() {
    player.setVelocityX(0);
    player.anims.play('left', false);
    leben--;

    if (leben <= 0) {
        let gameOverSound = new Audio();
        gameOverSound.src = 'assets/sound/gameOver.mp3';
        gameOverSound.volume = 0.5;
        gameOverSound.play();

        openGameOverScreen();

        let canvas = document.querySelector("canvas");
        canvas.parentNode.removeChild(canvas);
    } else {
        let errorSound = new Audio();
        errorSound.src = 'assets/sound/error.mp3';
        errorSound.volume = 0.5;
        errorSound.play();

        this.scene.restart();
    }
}
