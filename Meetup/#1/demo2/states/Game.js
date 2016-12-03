Game = function(){}
Game.prototype = {
	create:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.enemiesArray = ['greenEnemy','whiteEnemy','boss'];
		this.sea = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'sea');
		this.sea.autoScroll(0,30);
		this.player = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'player');
		this.player.anchor.setTo(0.5);
		this.keys = this.input.keyboard.createCursorKeys();
		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.bullets = this.game.add.group();
		this.elapsed = 0;
		this.enemies = this.game.add.group();
		this.enemyGeneration = 0;
	},
	update:function(){
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		if(this.keys.up.isDown){
			this.player.body.velocity.y = -100;
		}
		if(this.keys.down.isDown){
			this.player.body.velocity.y = 100;
		}
		if(this.keys.left.isDown){
			this.player.body.velocity.x = -100;
		}
		if(this.keys.right.isDown){
			this.player.body.velocity.x = 100;
		}
		this.elapsed+=this.game.time.elapsed;
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
			if(this.elapsed>=500){
				this.elapsed = 0;
				this.createBullets();
			}
		}
		this.enemyGeneration+=this.game.time.elapsed;
		if(this.enemyGeneration>=1000){
			this.enemyGeneration = 0;
			this.generateEnemy();
		}
	},
	generateEnemy:function(){
		var index = this.rnd.integerInRange(0,this.enemiesArray.length-1);
		var x = this.rnd.realInRange(100,400);
		var enemy = this.game.add.sprite(x,-100,this.enemiesArray[index]);
		this.enemies.add(enemy);
		this.game.physics.arcade.enable(enemy);
		enemy.body.velocity.y = 100;
	},
	createBullets:function(){
		var bullet = this.game.add.sprite(this.player.x,this.player.y,'bullet');
		bullet.anchor.setTo(0.5);
		this.game.physics.arcade.enable(bullet);
		bullet.body.velocity.y = -200;
		bullet.outOfBoundsKill = true;
		bullet.checkWorldBounds = true;
		bullet.events.onOutOfBounds.add(function(){
			console.log('aaa');
		},this);
	}
}