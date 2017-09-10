Boot = function(game){}

Boot.prototype = {
	preload:function(){
		//se encargará de cargar la barra de carga
		this.game.load.image("preloadbar","assets/preloader-bar.png");

		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
	},
	create:function(){
		this.game.state.start("Preload");
	}

}