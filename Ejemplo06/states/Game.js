Game = function(){}
Game.prototype = {
	create:function(){
		//Para comenzar a usar fisica basta con activar que sistema vamos a usar
		//ARCADE, P2, Ninja y Box2D
		//vamoa a usar ARCADE
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//le podemos algo de gravedad, esta en pixeles, no metros pos segundo
		this.game.physics.arcade.gravity.y = 1000;
		this.background = this.game.add.sprite(0,0,'background');
		this.floor = this.game.add.sprite(0,0,'floor');
		//Para activar la fisica en una sprite llamaos al metodo this.game.physics.arcade.enable
		this.game.physics.arcade.enable(this.floor);
		//Por defecto todos los cuerpos son afectados por la gravedad si no queremos que esta lo afecte
		//.body se habilita una vez hayamos llamado al .enable
		//body.allowGravity
		this.floor.body.allowGravity = false;
		//si queremos ver el cuerpo fisico del sprite usamos el metodo render que esta mas abajo
		//Al ejecutar el codigo por primera vez vamos a ver que el cuerpo toma el ancho y alto del sprite
		//Este cuerpo se puede modificar de la sgte forma
		//.setSize(ancho del cuerpo, alto del cuerpo, offsetX, offsetY)
		//los dos ultimos son valores que se suman a la posicion actual del sprite para mover el cuerpo
		this.floor.body.setSize(this.game.width,this.floor.height*0.5,0,80);

		this.player = this.game.add.sprite(0,150,"monster");
		this.player.x = this.player.width*0.5;
		this.player.anchor.setTo(0.5);
		this.player.animations.add('walking',[0,1,2,3,4,5,6,7,8,9,10,11,12],10,true);
		this.player.animations.play("walking",12,true);
		this.player_lifes = 1;
		//para crear textos this.game.add.sprite
		// como ultimo parametro recibe un objecto style como css
		var style = {
			font : '32px Arial',
			fill : "#000"
		};
		this.life_txt = this.game.add.text(
			10,10,'Life: '+ this.player_lifes, style
		);

		this.game.physics.arcade.enable(this.player);
		//Si queremos validar que el personaje se mueva dentro del escenario y tenemos fisica activada
		//.collideWorldBounds = true
		this.player.body.collideWorldBounds = true;
		//Para usar las flechas del teclado llamamos al metodo createCursorKeys, devuelve un objeto con las 4 flechas mapeadas
		//.up .left. right. down
		// estos objetos tienen dos propiedades isDown (presionado) .isUp (se solto) devuelven boolean
		this.keys = this.game.input.keyboard.createCursorKeys();

		this.score = 0;
		this.scoreTxt = this.game.add.text(
			this.game.width-200,10,'Score: '+ this.score, style
		);

		this.elements = 0;
	},
	render:function(){
		//this.game.debug vaa  dibujar los cuerpos de cada sprite
        this.game.debug.body(this.floor);
        this.game.debug.body(this.player);
	},
	update:function(){
		// como son booleanos comenzamos a poner ifs

		if(this.keys.left.isDown){
			//como estamoe en fisica vamos a mover los cuerpos, aumentandp su velocidad
			//boy.velocity es un vector X e Y, como solo queremos moverlo horizontalmente usamos X
			this.player.body.velocity.x += -150;
			//lo malo es que nuestro personaje solo esta mirando hacia un lado
			//Por defecto todo sprite tiene una escala de 1
			//1 = 100% 0 =0% no se ve
			//Si deseamos que mire hacia el otro lado (izquierda) lo ponemos como -1, 
			//si es 1 o -1 depende mucho de hacia donde este mirando nuestro sprite
			//.scale.setTo(x,y)
			//como no queremos cambiar su escala en Y lo dejamos en 1
			this.player.scale.setTo(-1,1);
		}
		if(this.keys.right.isDown){
			this.player.body.velocity.x += 150;
			//Si queremos que mire para la derecha lo dejamos en 1 ambos ejes
			this.player.scale.setTo(1,1);
		}
	}
}