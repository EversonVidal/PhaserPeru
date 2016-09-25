Menu = function(){}

Menu.prototype = {
	create:function(){
		//las variables que queremos usar en todo el archivo debe ser declaradas como this.nombrevariable
		this.title = this.game.add.sprite(this.game.world.centerX,100,'gametitle');
		this.title.anchor.setTo(0.5);
		//boton recibe dos parametros mas
		//la funcion que va a ejecutar en click
		//contexto http://ryanmorr.com/understanding-scope-and-context-in-javascript/
		this.start = this.game.add.button(this.game.world.centerX,this.game.world.centerY,'play',this.startGame,this);
		this.start.anchor.setTo(0.5);
	},
	startGame:function(){
		this.game.state.start('Game');
	}
}