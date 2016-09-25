//constructor
Preload = function(){}


//AGregamos funciones al prototype del objeto
//https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/prototype
Preload.prototype = {
	//cada state que creemos va a tener los metodos ya trabajados preload,create,update
	//cambiamos la forma de declarar funciones
	/* ya no function create(){

	}
	ahora preload:function(){
	
	}
	*/
	preload:function(){
		//para hacer referencia al game vamos a llamar como this.game
		this.game.load.spritesheet("numbers","assets/numbers.png",100,100);
		this.game.load.image("gametitle","assets/gametitle.png");
		this.game.load.image("play","assets/play.png");
		this.game.load.image("higher","assets/higher.png");
		this.game.load.image("lower","assets/lower.png");
		this.game.load.image("gameover","assets/gameover.png");
		//para separar funciones vamos a utilizar ,
	},
	create:function(){
		//cambiar de state
		this.game.state.start('Menu')
	}
}