window.onload = function(){
	//declaramos la variable game como hemos venido trabajando
	var game = new Phaser.Game(320,480,Phaser.AUTO);
	//ahora dividimos las pantallas del juego en states
	//Para registrar un state del juego llamamos al metodo state.add
	//recibe dos parametros key y nombre de la clase a usar
	game.state.add('Preload',Preload);
	game.state.add('Menu',Menu);
	game.state.add('Game',Game);
	game.state.add('Gameover',Gameover);
	//para llamar a un state usamos el metodo .start y pasamos el key a cargar
	game.state.start('Preload');
}	
