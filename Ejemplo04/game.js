// el script se va a ejecutar una vez se haya cargado el html
// pueden utilizar el document ready de jquery
window.onload = function(){
	var game = new Phaser.Game(360,640,Phaser.AUTO,'',
			{preload:preload,create:create}
		),
		elements = [],
		pet = {},
		clone = {},
		uiSelected = false,
		itemSelected = '';

	function preload(){
		game.load.image('background',
			'assets/backyard.png');
		game.load.image('apple',
			'assets/apple.png');
		game.load.image('duck',
			'assets/rubber_duck.png');
		game.load.image('candy',
			'assets/candy.png');
		game.load.spritesheet(
			'pet','assets/pet.png',97,83,5,1,1);


		//con este linea hacemos que el juego se adapte a cualquier resolucion
		//http://phaser.io/docs/2.4.4/Phaser.ScaleManager.html#scaleMode les dejo las otras
		//constantes que pueden
		game.scale.scaleMode = 
			Phaser.ScaleManager.SHOW_ALL;
		//con estas dos lineas siempre mantenemos centrado el proyecto
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
	}

	function create(){
		var background =
			game.add.sprite(0,0,'background');

		pet = game.add.sprite(0,0,'pet');
		pet.anchor.setTo(0.5);
		pet.x = game.world.centerX;
		pet.y = 100;
		pet.animations.add("happy",[1,2,3,2,1]);
		
		var apple = game.add.sprite(
			100,450,'apple');

		apple.anchor.setTo(0.5);
		var candy = game.add.sprite(
			200,450,'candy');
		candy.anchor.setTo(0.5);

		var duck = game.add.sprite(
			300,450,'duck');
		duck.anchor.setTo(0.5);

		elements = [apple, candy, duck];
		elements.forEach(function(element){
			element.inputEnabled = true;
			element.events.onInputDown.add(selectItem);
		});
		background.inputEnabled = true;
		background.events.onInputDown.add(placeItem);
	}

	function placeItem(sprite, event){
		if(itemSelected != ''){
			clone = game.add.sprite(
				event.position.x,
				event.position.y,
				itemSelected
				);
			clone.anchor.setTo(0.5);
			pet.bringToTop();
			itemSelected = '';
			//http://www.webopedia.com/TERM/T/tweening.html
			//Tambien pueden utilizar tweenlite
			//game.add.tween(objeto).to(propiedades),tiempo(milisegundos)

			var tween = game.add.tween(pet).to({x:clone.x,y:clone.y},500);
			//para que el tween inicie deben llamar al metodo start
			tween.start();
			//para agregar una funcion una vez haya terminado el tween
			//Pueden hacerlo asi
			tween.onComplete.add(giveItem);
			// o asi usando funciones anonimas
			/* tween.onComplete.add(function(){

			})*/
		}
	}

	function giveItem(){
		//una vez terminado el tween resetear=mos la variable uiSelected
		pet.animations.play("happy",12);
		uiSelected = false;
		// para eliminar tenemos dos metodo .kill o .destroy
		//EN este ejemplo vamos a ver destroy
		//Luego vamos a explicar la diferencia entre ambos
		clone.destroy();
		//clone.kill();
	}

	function selectItem(sprite){
		//una pequeña validacion para que solo seleccione uno con el click
		if(!uiSelected){
			elements.forEach(function(element){
				if(element.alpha != 1){
					element.alpha = 1;	
				}
			});
			itemSelected = sprite.key;
			sprite.alpha = 0.7;	
			uiSelected = true;
		}
	}
}


