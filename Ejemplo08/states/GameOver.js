GameOver = function(){}
GameOver.prototype = {
	create:function(){
		this.background = this.game.add.sprite(0,0,'background');
		this.gameover = this.game.add.button(this.game.world.centerX,this.game.world.centerY,'gameover',this.goMenu);
		this.gameover.anchor.setTo(0.5);
	},
	goMenu:function(){
		this.game.state.start("Menu");
	}
}