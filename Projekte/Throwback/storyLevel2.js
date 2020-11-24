class storyLevel2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'storyLevel2'
        });
    }
    preload() {
        this.load.image('Level2Ground', 'assets/tiled/BodenLevel2.png');
        this.load.image('Level2Background', 'assets/tiled/HintergrundLevel2.png');
        this.load.image('Level2Sofa', 'assets/tiled/SofaLevel2.png');
        this.load.image('Level2Pflanze', 'assets/tiled/PflanzeLevel2.png');
        this.load.image('Level2Lampe', 'assets/tiled/LampeLevel2.png');
        this.load.image('Level2Lavalampe', 'assets/tiled/LavalampeLevel2.png');
        this.load.image('Level2Fernseher', 'assets/tiled/FernseherLevel2.png');
        this.load.image('Level2FleischPflanze', 'assets/tiled/FleischpflanzeLevel2.png');
        this.load.image('Level2Hund', 'assets/tiled/HundLevel2.png');
        this.load.image('Level2Tisch', 'assets/tiled/TischLevel2.png');
        this.load.image('herz', 'assets/herz.png');

        this.load.image('Level2HimmelFenster', 'assets/tiled/HimmelLevel2.png');
        this.load.image('Level2WandStrasse', 'assets/tiled/lvl1Ground.png');


        this.load.tilemapTiledJSON('map2', 'assets/tiled/Level2.json');

        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 64,
            frameHeight: 96
        });

        this.load.spritesheet('portalAusgang', 'assets/portalVonRechts.png', {
            frameWidth: 64,
            frameHeight: 96
        });

        this.load.spritesheet('portalEingang', 'assets/portalVonUnten.png', {
            frameWidth: 96,
            frameHeight: 64
        });
        console.log("story level 2");
    }
    create() {

        //HINTERGRUND
        map2 = this.make.tilemap({
            key: 'map2'
        });
        var Ground = map2.addTilesetImage('Ground', 'Level2Ground');
        var Background = map2.addTilesetImage('Background', 'Level2Background');
        var Fleischpflanze = map2.addTilesetImage('Fleischpflanze', 'Level2FleischPflanze');
        var Fernseher = map2.addTilesetImage('Fernseher', 'Level2Fernseher');
        var Sofa = map2.addTilesetImage('Sofa', 'Level2Sofa');

        var Pflanze = map2.addTilesetImage('Pflanze', 'Level2Pflanze');
        var Tisch = map2.addTilesetImage('Tisch', 'Level2Tisch');
        var Hund = map2.addTilesetImage('Hund', 'Level2Hund');
        var Lavalampe = map2.addTilesetImage('Lavalampe', 'Level2Lavalampe');
        var Lampe = map2.addTilesetImage('Lampe', 'Level2Lampe');
        var HimmelFenster = map2.addTilesetImage('HimmelFenster', 'Level2HimmelFenster');
        var SteinWand = map2.addTilesetImage('SteinWand', 'Level2WandStrasse');

        //Layer [tilesetimage]	
        hintergrund = map2.createStaticLayer('BackgroundLevel2', [Background, SteinWand, HimmelFenster], 0, 0)
        boden = map2.createStaticLayer('GroundLevel2', [Ground, SteinWand], 0, 0);
        hindernisse = map2.createStaticLayer('HindernisseLevel2', [Fernseher, Fleischpflanze], 0, 0)
        dekoKollision = map2.createStaticLayer('DekoKollisionLevel2', [Fernseher, Fleischpflanze, Tisch, Sofa, Fernseher, Pflanze], 0, 0)
        deko = map2.createStaticLayer('DekoHintergrundLevel2', [Lavalampe, Lampe, Hund, Fernseher, Pflanze], 0, 0)

        boden.x = -500 * 31;
        hintergrund.x = -500 * 31;
        hindernisse.x = -500 * 31;
        deko.x = -500 * 31;
        dekoKollision.x = -500 * 31;

        //PORTALE
        portalAusgang = this.physics.add.sprite(300, 465, 'portalAusgang'); //POSTITION VON DER ER RUNTER FÄLLT
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

        portalEingang = this.physics.add.sprite(-12950, 570, 'portalEingang'); //POSTITION VON DER ER RUNTER FÄLLT
        this.anims.create({
            key: 'startEingang',
            frames: this.anims.generateFrameNumbers('portalEingang', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 9,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });
        portalEingang.body.allowGravity = false;


        //PLAYER
        player = this.physics.add.sprite(300, 465, 'dude'); //POSTITION VON DER ER RUNTER FÄLLT

        this.physics.add.collider(player, map2.bodenLayer);
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


        //Collision
        this.physics.add.collider(player, hindernisse, death, null, this);
        this.physics.add.collider(player, dekoKollision);
        this.physics.add.collider(player, portalEingang, nextLevel2, null, this);

        hindernisse.setCollisionByExclusion([-1]);
        dekoKollision.setCollisionByExclusion([-1]);

        this.physics.add.collider(player, boden);
        map2.setCollisionByProperty({
            collision: true
        });

        boden.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, boden);

        //KAMERA
        this.cameras.main.setBounds(-15500, 0, map2.widthInPixels, map2.heightInPixels);
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
    update() {

        portalAusgang.anims.play('startAusgang', true);
        portalEingang.anims.play('startEingang', true);

        player.setVelocityX(-120);
        player.anims.play('left', true);

        if (cameraX == this.cameras.main.scrollX && player.x > -18100 && player.x < -100) {
            player.anims.play('stands', true);
        }

        if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor() && player.y > 300) {

            player.setVelocityY(-420);
            let jumpSound = new Audio();
            jumpSound.src = 'assets/sound/jump.mp3';
            jumpSound.volume = 0.5;
            jumpSound.play();
        }
        if (player.y > 680) {

            player.setVelocityX(0);
            player.anims.play('left', false);
            gameOver(this);
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
    }
}

function nextLevel2() {
    this.scene.stop('storyLevel2');
    this.scene.start('storyLevel3');
    console.log("next Level");
    leben = 3;
}
