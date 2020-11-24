function Level3() {

    var config = {
        type: Phaser.AUTO,
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
        },
        audio: {
            disableWebAudio: true
        }
    };

    var game = new Phaser.Game(config);
    var map;
    var cursors;
    var player;
    var routeWW2;
    var leben = 3;
    var beschleunigung = -100;
    var dekoHintergrund;
    var bomben;
    var bomben1;
    var bomben2;
    var bomben3;
    var portalAusgang;
    var portalEingang;
    var cameraX = 0;

    var herz1;
    var herz2;
    var herz3;

    function preload() {

        this.load.image('panzerTiles', 'assets/tiled/panzerUnscharf.png');
        this.load.image('panzerKleinTiled', 'assets/tiled/panzer.png');
        this.load.image('ruineTiles', 'assets/tiled/ruine.png');
        this.load.tilemapTiledJSON('map', 'assets/tiled/MapLvl3.json');
        this.load.image('bodenTiles', 'assets/tiled/BodenLvl3.png');
        this.load.image('mauerTiles', 'assets/tiled/mauer.png');
        this.load.image('zaunTiles', 'assets/tiled/zaun.png');
        this.load.image('zaunKleinTiles', 'assets/tiled/ZaunKlein.png');

        this.load.image('backgroundTiles', 'assets/tiled/BackgroundLevel3.png');
        this.load.image('dekoBack', 'assets/tiled/backgroundSmoke.png');
        this.load.image('herz', 'assets/herz.png');

        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 64,
            frameHeight: 96
        });

        this.load.spritesheet('portalAusgang', 'assets/portalAusgang.png', {
            frameWidth: 96,
            frameHeight: 64
        });

        this.load.spritesheet('portalEingang', 'assets/portalVonUnten.png', {
            frameWidth: 96,
            frameHeight: 64
        });

        this.load.spritesheet('bomben', 'assets/bomben.png', {
            frameWidth: 32,
            frameHeight: 20
        });
    }

    function create() {
        //HINTERGRUND
        map = this.make.tilemap({
            key: 'map'
        });
        var bodenImg = map.addTilesetImage('BodenLvl3', 'bodenTiles');
        var ruineImg = map.addTilesetImage('ruine', 'ruineTiles');
        var backImg = map.addTilesetImage('BackgroundLevel3', 'backgroundTiles');
        var zaunImg = map.addTilesetImage('Zaun', 'zaunTiles');
        var zaunKleinImg = map.addTilesetImage('ZaunKlein', 'zaunKleinTiles');
        var panzerImg = map.addTilesetImage('panzerUnscharf', 'panzerTiles');
        var panzerKleinImg = map.addTilesetImage('panzerKlein', 'panzerKleinTiled');
        var mauerImg = map.addTilesetImage('mauer', 'mauerTiles');
        var smokeImg = map.addTilesetImage('backgroundSmoke', 'dekoBack');

        var hintergrund = map.createStaticLayer('himmel', [backImg], 0, 0);
        hintergrund.x = -600 * 31;

        dekoHintergrund = map.createStaticLayer('dekoBackground', [smokeImg], 0, 0);
        dekoHintergrund.x = -600 * 31;

        var deathLayer = map.createStaticLayer('deathLayer', [zaunImg, zaunKleinImg], 0, 0);
        deathLayer.x = -600 * 31;

        var dekoLayer = map.createStaticLayer('dekoLayer', [ruineImg, panzerImg, backImg, zaunImg, panzerKleinImg], 0, 0);
        dekoLayer.x = -600 * 31;

        routeWW2 = map.createStaticLayer('boden', [bodenImg], 0, 0);
        routeWW2.x = -600 * 31;

        var collisionLayer = map.createStaticLayer('colliderLayer', [panzerImg, mauerImg], 0, 0);
        collisionLayer.x = -600 * 31;

        //PORTAL
        portalAusgang = this.physics.add.sprite(500, 40, 'portalAusgang');
        this.anims.create({
            key: 'startePortalAusgang',
            frames: this.anims.generateFrameNumbers('portalAusgang', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 9,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });

        portalAusgang.body.allowGravity = false;

        portalEingang = this.physics.add.sprite(-18520, 460, 'portalEingang');
        this.anims.create({
            key: 'startePortalEingang',
            frames: this.anims.generateFrameNumbers('portalEingang', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 9,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });

        portalEingang.body.allowGravity = false;


        //PLAYER
        player = this.physics.add.sprite(500, 80, 'dude');

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

        //-------------------BOMBEN-----------

        bomben = this.physics.add.sprite(-1330, 0, 'bomben');
        bomben1 = this.physics.add.sprite(-4930, 0, 'bomben');
        bomben2 = this.physics.add.sprite(-9800, 0, 'bomben');
        bomben3 = this.physics.add.sprite(-15900, 0, 'bomben');
        this.anims.create({
            key: 'startBomben',
            frames: this.anims.generateFrameNumbers('bomben', {
                start: 0,
                end: 4 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 8,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });

        //--------------------CAMERA---------------

        this.cameras.main.setBounds(-600 * 31, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);

        //----------------------COLLISION

        routeWW2.setCollisionByExclusion([-1]);
        collisionLayer.setCollisionByExclusion([-1]);
        deathLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(bomben, routeWW2);
        this.physics.add.collider(bomben1, routeWW2);
        this.physics.add.collider(bomben2, routeWW2);
        this.physics.add.collider(bomben3, routeWW2);
        this.physics.add.collider(player, routeWW2);
        this.physics.add.collider(player, collisionLayer);
        this.physics.add.collider(player, bomben, death, null, this);
        this.physics.add.collider(player, bomben1, death, null, this);
        this.physics.add.collider(player, bomben2, death, null, this);
        this.physics.add.collider(player, bomben3, death, null, this);
        this.physics.add.collider(player, deathLayer, death, null, this);
        this.physics.add.collider(player, portalEingang, levelGeschafft, null, this);

        //-----------------------LEBEN
        herz1 = this.add.image(20, 25, 'herz');
        herz1.setScrollFactor(0);
        herz2 = this.add.image(60, 25, 'herz');
        herz2.setScrollFactor(0);
        herz3 = this.add.image(100, 25, 'herz');
        herz3.setScrollFactor(0);

        //---------------------------TASTATUR

        cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {

        //Leben - Anzeige
        if (leben < 3) {
            herz3.visible = false;
            if (leben < 2) {
                herz2.visible = false;
                if (leben <= 0) {
                    herz1.visible = false;
                }
            }
        }

        //Starten der Animationen
        bomben.anims.play('startBomben', true);
        bomben1.anims.play('startBomben', true);
        bomben2.anims.play('startBomben', true);
        bomben3.anims.play('startBomben', true);
        portalAusgang.anims.play('startePortalAusgang', true);
        portalEingang.anims.play('startePortalEingang', true);

        //langsames Erhoehen der Geschwindingkeit des Players
        if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor() && player.y > 300) {
            this.gameStarts = true;
            let jumpSound = new Audio();
            jumpSound.src = 'assets/sound/jump.mp3';
            jumpSound.volume = 0.5;
            jumpSound.play();
        }

        if (cursors.space.isDown || cursors.up.isDown) {
            if (beschleunigung < 300) {
                beschleunigung -= 0.2;
            }
        }

        //Lauf - Animation
        if (this.gameStarts == true) {
            player.setVelocityX(beschleunigung);
            player.anims.play('left', true);
        } else if (player.y == 464) {
            player.anims.play('stands', true);
        }

        //wenn player in ein Loch fällt
        if (player.y > 650) {
            gameOver(this);
        }

        //Sprung - Animation
        if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
            player.setVelocityY(-250);
        }

        //Perspektive erzeugen durch langserere Bewegungen
        dekoHintergrund.x -= 0.5;

        if (cameraX == this.cameras.main.scrollX) {
            dekoHintergrund.x += 0.5;
        }

        //zeige andere Animation, wenn player steht
        if (cameraX < -400 && cameraX == this.cameras.main.scrollX && player.x > -18100) {
            player.anims.play('stands', true);
        }

        cameraX = this.cameras.main.scrollX;
    }

    function gameOver(game) {
        beschleunigung = -100; //reset Wert
        game.gameStarts = false;
        leben--;
        if (leben <= 0) {
            let gameOverSound = new Audio();
            gameOverSound.src = 'assets/sound/gameOver.mp3';
            gameOverSound.volume = 0.5;
            gameOverSound.play();
            openGameOverScreen();
        } else {
            let errorSound = new Audio();
            errorSound.src = 'assets/sound/error.mp3';
            errorSound.volume = 0.5;
            errorSound.play();
            game.scene.restart();
        }
    }

    function death() {
        beschleunigung = -100; //reset Wert
        this.gameStarts = false;
        leben--;
        if (leben <= 0) {
            openGameOverScreen();
            let gameOverSound = new Audio();
            gameOverSound.src = 'assets/sound/gameOver.mp3';
            gameOverSound.volume = 0.5;
            gameOverSound.play();

            openGameOverScreen();
        } else {
            this.scene.restart();
            let errorSound = new Audio();
            errorSound.src = 'assets/sound/error.mp3';
            errorSound.volume = 0.5;
            errorSound.play();
        }
    }

    function openGameOverScreen() {
        document.getElementById("gameOver").style.display = "block";
        let canvas = document.querySelector("canvas");
        canvas.parentNode.removeChild(canvas);
    }

    function levelGeschafft() {
        document.getElementById("levelGeschafft").style.display = "block";
        let canvas = document.querySelector("canvas");
        console.log("Level complete");
        canvas.parentNode.removeChild(canvas);
    }
}
