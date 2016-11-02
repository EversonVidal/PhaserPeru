Preload = function(){}
Preload.prototype = {
	preload:function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.load.image('background','assets/background.png');
		this.game.load.spritesheet('button-start','assets/button-start.png',401,143);
		this.game.load.image('monster-cover','assets/monster-cover.png');
		this.game.load.image('title','assets/title.png');
		this.game.load.image('button-pause','assets/button-pause.png');
		this.game.load.image('floor','assets/floor.png');
		this.game.load.image('score-bg','assets/score-bg.png');
		this.game.load.spritesheet('monster','assets/monster-idle.png',103,131);
		this.game.load.spritesheet('candy','assets/candy.png',82,98);
	},
	create:function(){
		this.game.state.start("Menu");
	}
}