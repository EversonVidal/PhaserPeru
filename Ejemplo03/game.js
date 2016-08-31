window.onload = function(){

		var game = new Phaser.Game(360, 640, Phaser.AUTO,'',
					{preload:preload,create:create}),
			itemSelected = '',
			pet;

		function preload(){  
		    game.load.image('apple', 'img/apple.png'); 
		    game.load.image('candy', 'img/candy.png');
		    game.load.image('toy', 'img/rubber_duck.png');
		    game.load.image('backyard', 'img/backyard.png'); 
		    //http://phaser.io/docs/2.3.0/Phaser.Loader.html#spritesheet
		    //para cargar spritesheeets además de poner su key y ruta, ancho y alto de los fotogramas, cantidad de frames que va a tener, margin y spacing a veces el 
		    //corte no es exacto
		    game.load.spritesheet('pet','img/pet.png',97,83,5,1,1);
		}

		function create(){
			var background = game.add.sprite(0,0,'backyard');
			var duck = game.add.sprite(120,450,'toy');
	        var apple = game.add.sprite(200,450,'apple'); 
	        var candy = game.add.sprite(50,450,'candy');
	        // si quieren sacar el punto que está a la mitad del escenario
	        //game.world.centerX
	        pet = game.add.sprite(game.world.centerX,100,'pet');
	        pet.anchor.setTo(0.5);
	        //todo sprite tiene un propiedad animations
	        //el metodo add, agrega animaciones al sprite
	        // recibde dos parametros el nombre de la animacion y los frames como un array, los frames comienzan en 0
	        pet.animations.add("happy",[1,2,3,2,1]);
	        //el metodo play reproduce la animacion
	        // recibe tres parametros nombre de la animacion , fotogramas por segundo y si hace loop
	        pet.animations.play('happy',12, true);

	        //metí los tres elementos a un array
	        elements = [duck, apple, candy];
        
	        elements.forEach(function(element){
	        	//para activar el click en un sprite se debe hacer habilitar la prop inputEnabled
	            element.inputEnabled = true;
	            element.anchor.setTo(0.5);
	            //para hacer click sobre un sprite llamamos a la propiedad events.onInputDown.add
	            //itemSelection  es la funcion que va a ejecutar el click
	            element.events.onInputDown.add(itemSelection);
	        });
	        background.inputEnabled = true;
	        background.events.onInputDown.add(placeItem);
		}

		function placeItem(sprite, event){
			if(itemSelected !=''){
                clone = game.add.sprite(
                    event.position.x,
                    event.position.y,
                    itemSelected
                );
                clone.anchor.setTo(0.5);
            }
		}

		//esta funcion recibe dos parametros, el sprite al que se hizo click y el evento que lo activó
		function itemSelection(sprite, event){
			console.log(event);
			//muestra la posición donde se activo el evento
			console.log(event.position);
			elements.forEach(function(element){
                element.alpha = 1;
            });
			itemSelected = sprite.key;
            sprite.alpha = 0.6;    
		}

}
		