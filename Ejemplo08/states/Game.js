Game = function(){}
Game.prototype = {
	create:function(){
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 300;
		this.background = this.game.add.sprite(0,0,'background');
		this.floor = this.game.add.sprite(0,this.game.height - 150,'floor');
		this.game.physics.arcade.enable(this.floor);
		this.floor.body.allowGravity = false;
		this.floor.body.setSize(this.game.width,this.floor.height*0.5,0,80);

		this.player = this.game.add.sprite(0,650,"monster");
		this.player.x = this.player.width*0.5;
		this.player.anchor.setTo(0.5);
		this.player.animations.add('walking',[0,1,2,3,4,5,6,7,8,9,10,11,12],10,true);
		this.player.animations.play("walking",12,true);
		this.player_lifes = 3;
		var style = {
			font : '32px Arial',
			fill : "#000"
		};
		this.life_txt = this.game.add.text(
			10,10,'Life: '+ this.player_lifes, style
		);

		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.keys = this.game.input.keyboard.createCursorKeys();

		this.score = 0;
		this.scoreTxt = this.game.add.text(
			this.game.width-200,10,'Score: '+ this.score, style
		);
		this.floor.body.immovable = true;
		this.elements = 0;
		this.generationTime = 100000;

		this.elements  = this.game.add.group();
		this.elements.enableBody = true;
	},
	render:function(){
        //this.game.debug.body(this.floor);
        //this.game.debug.body(this.player);
	},
	update:function(){
		this.player.body.velocity.x = 0;
		this.generationTime +=this.game.time.elapsed;
		if(this.generationTime>=1500){
			this.generationTime = 0;
			var element = this.game.add.sprite(0,0,'candy');
			element.frame = this.game.rnd.integerInRange(0,4);
			element.y = -element.height;
			element.x = this.game.rnd.realInRange(0,this.game.width - element.width);
			element.anchor.setTo(0.5);
			this.elements.add(element);
		}
		this.elements.forEach(function(element){
			if(element.y>this.game.height){
				element.kill();
			}
		},this);
		this.game.physics.arcade.collide(this.player,this.floor);
		this.game.physics.arcade.overlap(this.player,this.elements,function(player,element){
			element.kill();
			this.score+=100;
			this.scoreTxt.text = "Score: "+this.score;
		},null, this);
		//Vamos a recorrer el grupo de elementos para destruirlos cuando salgan del escenario
		this.elements.forEach(function(element){
			var posY = element.y + (element.height*0.5);
			if(posY>this.game.height){
				//si sale  del escenario llamamos al metodo kill
				//Eliminamos del grupo (equivalante a splice)
				element.kill();
				this.elements.remove(element);
				//reducimos vida
				this.player_lifes--;
				//actulizamos caja de vidas
				this.life_txt.text = "Life :"+this.player_lifes;
				//mandamos al gameover
				if(this.player_lifes<=0){
					this.game.state.start("GameOver");
				}
			}
		},this);
		if(this.keys.left.isDown){
			this.player.body.velocity.x += -250;
			this.player.scale.setTo(-1,1);
		}
		if(this.keys.right.isDown){
			this.player.body.velocity.x += 250;
			this.player.scale.setTo(1,1);
		}
	}
}