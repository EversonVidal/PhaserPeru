Menu = function(){}

Menu.prototype = {
	create:function(){
	},
	startGame:function(){
		this.game.state.start('Game');
	}
}