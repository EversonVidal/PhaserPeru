window.onload = function(){

		var game = new Phaser.Game(360, 640, Phaser.AUTO,'',
					{preload:preload,create:create,update:update});
		var elements = ['apple', 'candy', 'toy'];
		var elapsed = 0;
		var boundX = 0;
		var boundY = 0;

		function preload(){  
		    game.load.image('apple', 'img/apple.png'); 
		    game.load.image('candy', 'img/candy.png');
		    game.load.image('toy', 'img/rubber_duck.png');
		    game.load.image('backyard', 'img/backyard.png');   
		}

		function create(){
			//por defecto el punto de referencia de todos los sprites estan en la esquina superior izquierda
			var background = game.add.sprite(0,0,'backyard');
		}

		//el metodo update es el loop del juego
		//trata de correr en 60fps baja hasta 50 o menos dependiendo la capacidad de la pc o dispositivo
		function update(){
			//delta de tiempo es la diferencia de frame y frame
			//da en segundos
			elapsed+=game.time.elapsed;
			if(elapsed>=1000){
				elapsed = 0;
				createItem();
			}
		}

		function createItem(){
			//random de enteros entre un minimo y maximo
			var index = game.rnd.integerInRange(0, elements.length -1);
			var item = game.add.sprite(0,0, elements[index]);
			//cambiamos el punto de referencia con la propiedad anchor y llamamos al metodo 
			//setTo va de 0 a 1
			//0.5 es la mitad
			item.anchor.setTo(0.5);
			//random de numeros reales entre la posicion inicial y final donde van a salir los elementos
			boundX = item.width*0.5;
			boundY = item.height*0.5;
			item.x = game.rnd.realInRange(boundX, game.width - boundX);
			item.y = game.rnd.realInRange(boundY, game.height - boundY)
			
		}
}
		