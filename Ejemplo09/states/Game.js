Game = function(game){}

Game.prototype ={
    create:function(){
        this.GRAVITY = 400;

        //como el fondo es muy pequeño, usamos tilesprite que permite repetir una textura o imagen
        // recibe coordenadas en x e y, ancho y alto que queremos que se repita
        //key que queremos cargar
        this.background =
                this.game.add.tileSprite(0,0,
                this.game.width,this.game.height,
                'background');
                //ventajas de usar un tileSprite, tiene un método que permite mover el sprite,
                //en x e y
        this.background.autoScroll(-200,0);
        this.player = this.game.add.sprite(0,0,'player');
        this.player.x = this.game.world.centerX - 350;
        this.player.y = this.game.world.centerY;
        this.player.scale.setTo(2);
        this.player.animations.add("fly", [0,1,2], 10, true);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = this.GRAVITY;
        this.game.physics.arcade.enable(this.player);
        this.player.body.allowGravity = false;
        //asignamos un evento de click al escenario
        this.game.input.onDown.add(this.flap,this);
        this.elapsed = 0;
        this.gameOver = false;
        this.walls = this.game.add.group();
        this.startGame = false;
        this.generationTime = 3000;
        this.flapVelocity = 300;

        //aparte de usar la funcion createCursorKeys que mapea las flechas del teclado

        //podemos detectar cualquier tecla, solo debemos pasar el keycode respectivo
        //les dejo este cheetsheet http://www.html5gamedevs.com/topic/10139-phaser-keyboard-codes-cheatsheet/
        // es solo una constante o enum que representa el keycode
        var flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        flapKey.onDown.add(this.flap, this);
        this.score = 0;

        //para darle estilo a un texto en phaser se crea un objeto con sus propiedas
        //se parece a css
        var style = {
            fontSize: "60px",
            fill: "#FFF",
            align: "center"
        };
        //para crear el texto llamamos al metodo add.text,
        //diferncia con los métodos objetos es q sus dos últimos parametros
        // son el texto que va a ir y el objeto con el estilo a poner
        this.maxScore = this.add.text(this.game.width - 800,0,"Max Score",style);
        this.maxScore.visible = false;

        //HTML5 trae un nuevo   un nuevo api para almacenar llamado localStorage

        //https://developer.mozilla.org/es/docs/Web/API/API_de_almacenamiento_web
        //funciona como las cookies ynos permite guardar strings

        //en el caso exista pintamos el puntaje guardado
        if(localStorage.jumps !=null){
          this.maxScore.text = "Max Score :"+localStorage.jumps;
          this.maxScore.visible = true;
        }
        this.scoreText = this.add.text(
         this.world.centerX,
         this.world.centerY,
         "PRESS ENTER TO PLAY",
         style);
         this.scoreText.anchor.setTo(0.5, 0.5);
    },
    flap:function(){
      if(!this.startGame){
          this.startGame = true;
          if(!this.player.body.allowGravity){
            this.player.body.allowGravity = true;
            this.scoreText.text ="Score : "+ this.score;
          }
      }else{
        if(this.player.alive){
          this.player.body.velocity.y = -this.flapVelocity;
        }else{
          this.reset();
        }
      }
    },
    update:function(){
      if(this.startGame){
        if(!this.gameOver){
            if(this.player.body.velocity.y > -20){
                this.player.frame = 3;
            }else{
                this.player.animations.play("fly");
            }
            this.elapsed+= this.game.time.elapsed;
            if(this.elapsed>=this.generationTime){
                this.elapsed = 0;
                this.spawnWalls();
            }
            //Como tenemos las paredes en un grupo podemos implementar pool de objetos

            //Pool de objetos hace referencia a tener un grupo de elementos desactivados para luego volverlos a crear
            //O crear hasta un límite y luego reutilizar
            //Para evitar consumir mucha memoria es mejor reutilizar que volver a crear
            //Todos los sprites en Phaser cuentan con un método kill(), que desactiva el objeto y hace que Phaser no lo considere en el update
            //Lo malo de kill es que el grupo aún los va a considerar como hijos, es por eso que el grupo cuenta con método para hacer referencia a los desactivados o "muertos"


            //Como en algún momento vamos a tener "muertos" no debemos considerarlos en la colisión con el player
            //por eso llamamos al método forEachAlive (es un foreach que todos conocemos) pero solo busca entre los activos o vivos
          this.walls.forEachAlive(function(wall){
              if(wall.x<-wall.width){
                wall.kill();
              }else if(!wall.scored){
                if(this.player.x>=wall.x){
                  wall.scored = true;
                  this.score+=0.5;
                  this.scoreText.text = "Score : "+this.score;
                }
              }
          },this);

          if(this.player.y > this.game.height){
            this.gameOver = true;
            this.showGameOver();
          }

          this.game.physics.arcade.collide(
               this.player,this.walls
               ,function(player,wall){
                   if(!this.gameOver){
                       this.gameOver = true;
                       this.showGameOver();

                   }
               },null,this);
        }
      }
    },
    showGameOver:function(){
        if(localStorage.jumps!=null){
            var score = localStorage.jumps;
            if(score< this.score){
              localStorage.jumps = this.score;
            }
        }else{
            localStorage.jumps = this.score;
        }
        this.player.kill();
        this.scoreText.text = "YOU LOSE YOUR SCORE :"+this.score + " \n ENTER TO TRY AGAIN";
    },

    reset:function(){
      this.score = 0;
      this.gameOver = false;
      this.startGame = false;
      this.player.reset(this.game.world.centerX,this.game.world.centerY);
      this.player.body.allowGravity = false;
      this.player.play("flying");
      this.scoreText.text = "PRESS ENTER TO PLAY";
      this.maxScore.text = "Max Score : "+localStorage.jumps;
      this.maxScore.visible =true;
      this.walls.removeAll();
    },


    spawnWalls: function(){
        var wallY = this.rnd.integerInRange
            (this.game.height *.3, this.game.height *.7);
        var botWall = this.generateWall(wallY);
        var topWall = this.generateWall(wallY, true);
    },

    generateWall:function(wallY,flipped){
        var posY ;
        var opening  = 400;
        //pequeña lógica para posicionar la pared arriba o abajo dentro del escenario
        if(flipped){
            wallY = wallY - (opening/2);
        }else{
            wallY = wallY + (opening/2);
        }

        //Como explique más arriba, estamos "matando" los sprites.

        //Entonces para implementar nuestro pool de objetos usamos un método llamado getFirstDead, que nos trae el primer
        //muerto dentro de nuestro grupo
        //en el caso no hay ninguno nos devuelve nullo, entonces ahí creamos
        //En este ejemplo estamos creando elementos hasta un punto para luego reutilizarlos 
        var wall = this.walls.getFirstDead();
        if(!wall){
          wall = this.game.add.sprite(this.game.width,
                  wallY,'wall');
          this.game.physics.arcade.enable(wall);
        }else{
            wall.reset(this.game.width,wallY);
        }
        wall.scored = false;
        wall.body.velocity.x = -200;
        if(flipped){
            wall.scale.y = -1;
        }else{
          wall.scale.y = 1;
        }
        //no queremos que se mueven al chocar con alguien
        wall.body.immovable = true;

        //queremos que la graves no les afecte pero si aplicarles una fuerza para que se muevan (estáticos)
        wall.body.allowGravity = false;
        this.walls.add(wall);
    }
}
