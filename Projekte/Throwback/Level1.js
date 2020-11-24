function Level1() {


    var config = {
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
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    var game = new Phaser.Game(config);
    var player;
    var boden;
    var dekoration;
    var tod;
    var himmel;
    var auto;
    var lebenText;
    var portal;
    var leben = 3;
    var herz1;
    var herz2;
    var herz3;
    var cameraX = 0;

    function preload() {
        this.load.image('Level1Ground', 'assets/tiled/lvl1Ground.png');
        this.load.image('Level1Extras', 'assets/tiled/lvl1Background.png');
        this.load.tilemapTiledJSON('map', 'assets/tiled/lvl1.json');
        this.load.image('herz', 'assets/herz.png');

        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 64,
            frameHeight: 96
        });
        this.load.spritesheet('portalAusgang', 'assets/portalVonLinks.png', {
            frameWidth: 64,
            frameHeight: 96
        });
    }

    function create() {

        //HINTERGRUND
        map = this.make.tilemap({
            key: 'map'
        });
        //tileset preload
        var Ground = map.addTilesetImage('Ground', 'Level1Ground');
        var Extras = map.addTilesetImage('Background', 'Level1Extras');

        himmel = map.createStaticLayer('Skylvl1', [Extras], 0, 0);
        boden = map.createStaticLayer('Groundlvl1', [Ground, Extras], 0, 0);
        dekoration = map.createStaticLayer('Backgroundlvl1', [Extras], 0, 0);
        auto = map.createStaticLayer('Autolvl1', [Extras], 0, 0);

        boden.x = -360 * 31;
        auto.x = -360 * 31;
        dekoration.x = -360 * 31;
        himmel.x = -360 * 31;

        //PLAYER
        player = this.physics.add.sprite(70, 175, 'dude'); //POSTITION VON DER ER RUNTER FÄLLT

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 10,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });

        this.anims.create({
            key: 'stands',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 4,
                end: 4
            }),
            frameRate: 1,
            repeat: -1
        });

        //PORTAL
        portalAusgang = this.physics.add.sprite(-10000, 370, 'portalAusgang'); //POSTITION VON DER ER RUNTER FÄLLT
        this.anims.create({
            key: 'startAusgang',
            frames: this.anims.generateFrameNumbers('portalAusgang', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 9,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });
        portalAusgang.body.allowGravity = false;

        //Collision
        this.physics.add.collider(player, portalAusgang, levelGeschafft, null, this);

        boden.setCollisionByExclusion([-1]);
        auto.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, auto, death, null, this);
        this.physics.world.collide(player, boden);

        this.physics.add.collider(player, boden);
        map.setCollisionByProperty({
            collision: true
        });

        //camera
        this.cameras.main.setBounds(-11160, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);

        //Leben
        herz1 = this.add.image(20, 25, 'herz');
        herz1.setScrollFactor(0);
        herz2 = this.add.image(60, 25, 'herz');
        herz2.setScrollFactor(0);
        herz3 = this.add.image(100, 25, 'herz');
        herz3.setScrollFactor(0);

        //TASTATUR
        cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {

        portalAusgang.anims.play('startAusgang', true);

        if (this.gameStarts == true) {
            player.setVelocityX(-150);
            player.anims.play('left', true);
        }

        if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
            this.gameStarts = true;
            player.setVelocityY(-250);
            let jumpSound = new Audio();
            jumpSound.src = 'assets/sound/jump.mp3';
            jumpSound.volume = 0.5;
            jumpSound.play();
        }
        if (player.y > 680) {
            deathFall(this);
        }
        if (leben < 3) {
            herz3.visible = false;
            if (leben < 2) {
                herz2.visible = false;
                if (leben == 0) {
                    herz1.visible = false;
                }
            }
        }

        //zeige andere Animation, wenn player steht
        if (player.x == 70) {
            player.anims.play('stands', true);
        }

        if (cameraX < -700 && cameraX == this.cameras.main.scrollX) {
            player.anims.play('stands', true);
        }

        cameraX = this.cameras.main.scrollX;
    }

    function death() {
        leben--;
        if (leben <= 0) {
            let gameOverSound = new Audio();
            gameOverSound.src = 'assets/sound/gameOver.mp3';
            gameOverSound.volume = 0.5;
            gameOverSound.play();
            this.scene.stop();
            openGameOverScreen();
        } else {
            let errorSound = new Audio();
            errorSound.src = 'assets/sound/error.mp3';
            errorSound.volume = 0.5;
            errorSound.play();

            this.scene.restart();
        }
    }

    function deathFall(game) {
        leben--;
        if (leben <= 0) {
            let gameOverSound = new Audio();
            gameOverSound.src = 'assets/sound/gameOver.mp3';
            gameOverSound.volume = 0.5;
            gameOverSound.play();
            game.scene.stop();
            openGameOverScreen();
        } else {
            let errorSound = new Audio();
            errorSound.src = 'assets/sound/error.mp3';
            errorSound.volume = 0.5;
            errorSound.play();

            game.scene.restart();
        }
    }

    function openGameOverScreen() {
        document.getElementById("gameOver").style.display = "block";
        let canvas = document.querySelector("canvas");
        canvas.parentNode.removeChild(canvas);
    }

    function levelGeschafft() {
        document.getElementById("levelGeschafft").style.display = "block";
        console.log("Level complete");
        let canvas = document.querySelector("canvas");
        canvas.parentNode.removeChild(canvas);
    }
}
