class storyLevel4 extends Phaser.Scene {

    constructor() {
        super({
            key: 'storyLevel4'
        });
    }

    preload() {
        this.load.image('Tor', 'assets/tiled/GatsbyBackground.jpg');
        this.load.image('Boden_houseSide', 'assets/tiled/20sFloor_2.png');
        this.load.image('Boden_kariert', 'assets/tiled/20sFloor_houseSide.png');
        this.load.image('Hintergrund', 'assets/tiled/hintergrund_red_gold3.png');
        this.load.image('Piano', 'assets/tiled/piano_ohneFluegel_2_PS.png');
        this.load.image('Chair', 'assets/tiled/pianoChair_PS.png');
        this.load.image('Bottle', 'assets/tiled/bottlePS.png');
        this.load.image('Plattenspieler', 'assets/tiled/Plattenspieler_PS.png');
        this.load.image('Portrait_brownFrame', 'assets/tiled/marilynMonroePS_brownFrame.png');
        this.load.image('Portrait_goldenFrame', 'assets/tiled/marilynMonroePS_goldenFrame.png');
        this.load.image('Portrait_patternFrame', 'assets/tiled/marilynMonroePS_goldenPatternFrame.png');
        this.load.tilemapTiledJSON('map4', 'assets/tiled/20erKarte.json');
        this.load.image('herz', 'assets/herz.png');

        this.load.spritesheet('portalAusgang', 'assets/portalAusgang.png', {
            frameWidth: 96,
            frameHeight: 64
        });

        this.load.spritesheet('portalEingang', 'assets/portalVonLinks.png', {
            frameWidth: 64,
            frameHeight: 96
        });

        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 64,
            frameHeight: 96
        });
        console.log("story level 4");
    }

    create() {

        //HINTERGRUND
        map4 = this.make.tilemap({
            key: 'map4'
        });
        var Background = map4.addTilesetImage('20erHintergrund', 'Hintergrund');
        var Tor = map4.addTilesetImage('GassenTor', 'Tor');
        var Ground = map4.addTilesetImage('20erBoden2', 'Boden_houseSide');
        var Ground_kariert = map4.addTilesetImage('20erBoden_houseSide', 'Boden_kariert');
        var Piano = map4.addTilesetImage('pianoOhneFluegelTileset', 'Piano');
        var Chair = map4.addTilesetImage('pianoChairTileset', 'Chair');
        var Bottle = map4.addTilesetImage('FlascheTileset', 'Bottle');
        var Plattenspieler = map4.addTilesetImage('Plattenspieler_Tileset', 'Plattenspieler');
        var PlattenspielerTeile = map4.addTilesetImage('Plattenspieler_Tileset', 'Plattenspieler');
        var Portrait_brownFrame = map4.addTilesetImage('MarilynMonroeBrown', 'Portrait_brownFrame');
        var Portrait_goldenFrame = map4.addTilesetImage('GoldenPortraitTileset', 'Portrait_goldenFrame');
        var Portrait_patternFrame = map4.addTilesetImage('GoldenPatternPortraitTileset', 'Portrait_patternFrame');

        hintergrund = map4.createStaticLayer('Hintergrund', [Background], 0, 0);
        tor = map4.createStaticLayer('Tor', [Tor], 0, 0);
        boden = map4.createStaticLayer('Boden_houseSide', [Ground, Ground_kariert, Piano, Chair, Bottle, Plattenspieler], 0, 0); //Layer [tilesetimage   
        portrait = map4.createStaticLayer('Portrait', [Portrait_brownFrame, Portrait_goldenFrame, Portrait_patternFrame, PlattenspielerTeile], 0, 0);

        hintergrund.x = -1150 * 31;
        tor.x = -1150 * 31;
        boden.x = -1150 * 31;
        portrait.x = -1150 * 31;

        //Portalausgang
        portalAusgang = this.physics.add.sprite(1100, 40, 'portalAusgang');
        this.anims.create({
            key: 'startPortal',
            frames: this.anims.generateFrameNumbers('portalAusgang', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 9,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });

        portalAusgang.body.allowGravity = false;

        portalEingang = this.physics.add.sprite(100, 465, 'portalEingang');

        this.anims.create({
            key: 'startPortalLinks',
            frames: this.anims.generateFrameNumbers('portalEingang', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 9,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });

        portalEingang.body.allowGravity = false;

        //PLAYER
        player = this.physics.add.sprite(1100, 100, 'dude'); //POSTITION VON DER ER RUNTER FÄLLT
        this.physics.add.collider(player, boden);
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

        this.physics.add.collider(player, portalEingang, storyGeschafft, null, this);

        boden.setCollisionByExclusion([-1]);
        this.physics.world.bounds.widht = boden.width;
        this.physics.world.bounds.height = boden.height;

        this.physics.world.setBounds(-1150 * 31, 0, map4.widthInPixels, map4.heightInPixels);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        map4.setCollisionByProperty({
            collision: true
        });

        this.cameras.main.setBounds(-1150 * 31, 0, map4.widthInPixels, map4.heightInPixels);
        this.cameras.main.startFollow(player);

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
        if (player.body.onFloor()) {
            this.gameStarts = true;
        }

        if (this.gameStarts == true) {
            player.setVelocityX(-300);
            player.anims.play('left', true);
        }

        portalAusgang.anims.play('startPortal', true);
        portalEingang.anims.play('startPortalLinks', true);

        if (cameraX < -200 && cameraX == this.cameras.main.scrollX && player.x > -18100) {
            player.anims.play('stands', true);
        }

        if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
            player.setVelocityY(-250);
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
        cameraX = this.cameras.main.scrollX;
    }
}
