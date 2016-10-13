window.onload = function(){
	var game = new Phaser.Game(320,480,Phaser.AUTO);
	
	game.state.add('Boot',Boot);
	game.state.add('Preload',Preload);
	game.state.add('Menu',Menu);
	game.state.add('Game',Game);
	game.state.add('Gameover',Gameover);
	game.state.start('Boot');
}	
