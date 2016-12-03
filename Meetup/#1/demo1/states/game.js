Game =function(){}
Game.prototype = {
	create:function(){
		this.tweenComplete = false;
		this.background = this.add.sprite(0,0,'background');
		this.elements = ['chicken','horse','pig','sheep'];
		this.animals = this.game.add.group();
		this.sounds = [];
		this.currentAnimal, this.oldAnimal;
		this.elements.forEach(function(element, key){
			var sprite = this.add.sprite(-1000,this.game.world.centerY,element);
			this.animals.add(sprite);
			sprite.anchor.setTo(0.5);
			if(key==0){
				this.currentAnimal = sprite;
				sprite.x = this.game.world.centerX;
			}
			sprite.sound = this.game.add.audio(element+"Sound");
			sprite.inputEnabled = true;
			sprite.index  = key;
			sprite.input.pixelPerfectClick = true;
			sprite.animations.add('play',[0,1,2,0,1,2],3,false);
			sprite.events.onInputDown.add(this.playAnimation,this);
		},this);
		this.btnLeft = this.game.add.sprite(0,this.game.world.centerY,'arrow');
		this.btnLeft.anchor.setTo(0.5);
		this.btnLeft.x = 60;
		this.btnLeft.scale.setTo(-1,1);
		this.btnLeft.inputEnabled = true;
		this.btnLeft.direction = -1;
		this.btnLeft.events.onInputDown.add(this.changeAnimal,this);

		this.btnRight = this.game.add.sprite(0,this.game.world.centerY,'arrow');
		this.btnRight.anchor.setTo(0.5);
		this.btnRight.x = this.game.width - 60;
		this.btnRight.inputEnabled = true;
		this.btnRight.direction = 1;
		this.btnRight.events.onInputDown.add(this.changeAnimal,this);
	},
	playAnimation:function(sprite){
		sprite.play('play');
		sprite.sound.play();
	},
	changeAnimal:function(sprite){
		if(!this.tweenComplete){
			this.tweenComplete = true;
			this.oldAnimal = this.currentAnimal;
			var position = 0;
			var actual = 0;
			if(sprite.direction == 1){
				this.currentAnimal = this.animals.next();
				position = 1000;
			}else{
				this.currentAnimal = this.animals.previous();
				position = -1000;
			}
			var oldTween = this.game.add.tween(this.oldAnimal).to({x:position});
			oldTween.start();
			this.currentAnimal.x = -position;
			var newtween = this.game.add.tween(this.currentAnimal).to({x:this.game.world.centerX});
			newtween.start();
			newtween.onComplete.add(this.tweenOver,this);
		}
	},
	tweenOver:function(){
		this.tweenComplete = false;
	}
}