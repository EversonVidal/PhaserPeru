window.onload = function(){
	//360 = ancho
		//640 = alto
		//Phaser.AUTO = existen 3 tipos
		//Phaser.CANVAS = utiliza procesador
		//Phaser.WEBGL = utiliza la tarjeta de video si el browser lo permite
		//Phaser.AUTO si queremos que el framework solo decida que usa
		//por el momento dejamos en vacio el 4to param
		var game = new Phaser.Game(360, 640, Phaser.AUTO,'',{preload:preload,create:create});


		//{} = objeto, durante los primers ejemplos vamos a usar esta estuctura
		// este objeto debe hacer referencia a dos metodos de Phaser preload y create
		//Debemos crear ambos metodos, si desean pueden cambiarles el nombre
		// {preload:michiquitocoketopreload,create:michiquitocoketocreate}

		function preload(){  
			//preload se encarga de cargar nuestros assets
			//el objeto game tiene una propiedad load
			//en este caso vamos a usar image para cargar imagenes
			//image recibe dos parameros, un key (alias con el que hacemos referencia a este asset) y la url del assets
		    game.load.image('apple', 'img/apple.png'); 
		    game.load.image('candy', 'img/candy.png');
		    game.load.image('toy', 'img/rubber_duck.png');
		    game.load.image('backyard', 'img/backyard.png');   
		    //una vez se hayan cargado el metodo los mandara al create
		}

		function create(){
			//game.add.sprite agrega los sprites al escenario
			//los dos primeros parm son los puntos en X Y(plano cartesiano) que van a aparecer
			//llamamos al alias(preload) del asset 
			var background = game.add.sprite(0,0,'backyard');
			var apple = game.add.sprite(100,450,'apple');
			var candy = game.add.sprite(200,450,'candy');
			var toy = game.add.sprite(200,150,'toy');
			
		}
}
		