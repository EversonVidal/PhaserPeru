Preload = function(game){}

Preload.prototype = {
	preload:function(){
		//Phaser contiene un método setPreloadSprite 
		//se encarga de poner una imagen y escalarla
		//por dentro esot hace un bytesLoaded/bytesTotal como es hacía antiguamente
		this.preloader = this.game.add.sprite(0,0,'preloadbar');
		this.preloader.x = this.game.world.centerX - (this.preloader.width/2);
		this.preloader.y = this.game.world.centerY -  (this.preloader.height/2);
		this.game.load.setPreloadSprite(this.preloader);

		this.game.load.image('titlepage', 'assets/titlepage.png');

		this.game.load.audio('explosion', ['assets/explosion.ogg']);
    	this.game.load.audio('fire', ['assets/enemy-fire.ogg']);

		this.game.load.image('circulo', 'assets/circulo.png');
		this.game.load.image('shoot', 'assets/arrowButton.png');
		this.game.load.image('arrow', 'assets/actionButton.png');
	    this.game.load.image('sea', 'assets/sea.png');
	    this.game.load.image('bullet', 'assets/bullet.png');
	    this.game.load.image('enemyBullet', 'assets/enemy-bullet.png');
	    this.game.load.image('powerup1', 'assets/powerup1.png');
	    this.game.load.spritesheet('greenEnemy', 'assets/enemy.png', 32, 32);
	    this.game.load.spritesheet('whiteEnemy', 'assets/shooting-enemy.png', 32, 32);
	    this.game.load.spritesheet('boss', 'assets/boss.png', 93, 75);
	    this.game.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
	    this.game.load.spritesheet('player', 'assets/player.png', 64, 64);
	},
	create:function(){
		this.game.state.start("Menu");
	}

}