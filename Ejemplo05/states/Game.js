Game = function(){}
Game.prototype = {
	create:function(){
		this.higher = this.game.add.sprite(this.game.world.centerX,0,'higher');
		this.higher.anchor.setTo(0.5);
		this.higher.y = this.higher.height;
		this.lower = this.game.add.sprite(this.game.world.centerX,0,'lower');
		this.lower.y = this.game.height -this.lower.height;
		this.lower.anchor.setTo(0.5);
		this.lower.inputEnabled = true;
		this.higher.inputEnabled = true;
		this.lower.events.onInputDown.add(this.callLower,this);
		this.higher.events.onInputDown.add(this.callHiger,this);
		
		
		this. min = 0;
		this.max = 9;
		this.random = this.game.rnd.integerInRange(this. min,this.max);
		//al ser un spritesheet posee fotogramas
		//como ultimo parametro los sprites tiene la proiedad frame por defecto es 0
		this.number = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'numbers',this.random);
		this.number.anchor.setTo(0.5);
	},
	callHiger:function(){
		if(this.number.frame < this.max){
			this.number.frame++;
		}
	},
	callLower:function(){
		if(this.number.frame > this. min){
			this.number.frame--;
		}
	}
}