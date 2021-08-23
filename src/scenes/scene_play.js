import Paletas from "../gameObjects/paletas.js";

export default class Scene_play extends Phaser.Scene {
    constructor() {
        super({key: "Scene_play"});
    }

    create() {
        let center_width = this.sys.game.config.width/2;
        let center_height =  this.sys.game.config.height/2;

        // Jugadores
        this.player_goichi = this.add.image(20, 20, "goichi");
        this.goichi_score = this.add.text(20, 90, "2000");
        this.player_goichi.setOrigin(0, 0);
        this.player_goichi.setScale(0.2);

        this.player_diego = this.add.image(580, 20, "diego");
        this.diego_score = this.add.text(580, 90, "2000");
        this.player_diego.setOrigin(0, 0);
        this.player_diego.setScale(0.016);
        
        // Paletas
        // this.left_p = this.add.image(30, center_height, "left_p");
        // this.right_p = this.add.image(this.sys.game.config.width-30, center_height, "right_p");
        this.left_p = new Paletas(this, 30, center_height, "left_p");
        this.right_p = new Paletas(this, this.sys.game.config.width-30, center_height, "right_p");
        
        // this.sys.game.config.width o bien this.sys.game.config.height, contienen los valores
        // del ancho y largo del lienzo directamente desde el sistema

        //Separador
        this.add.image(center_width, center_height, "separator");

        // Pelota
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball = this.physics.add.image(center_width, center_height, "ball");
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setVelocityX(-180);
   
        // Propiedades Físicas
        this.physics.add.collider(this.ball, this.left_p, this.bouncePaleta, null, this);
        this.physics.add.collider(this.ball, this.right_p, this.bouncePaleta, null, this);

        // Controles
        // Paleta Izquierda
        this.cursor_w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Paleta derecha
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update(){
        let center_width = this.sys.game.config.width/2;
        let center_height =  this.sys.game.config.height/2;

        if (this.ball.x < 0 || this.ball.x > this.sys.game.config.width){
            this.ball.setPosition(center_width, center_height);
        }

        // Función de paletas
        // Paleta derecha
        if (this.cursor.down.isDown){
            this.right_p.body.setVelocityY(300);
        }else if (this.cursor.up.isDown){
            this.right_p.body.setVelocityY(-300);
        }else{
            this.right_p.body.setVelocityY(0);
        }

        // Paleta izquierda
        if (this.cursor_s.isDown){
            this.left_p.body.setVelocityY(300);
        }else if (this.cursor_w.isDown){
            this.left_p.body.setVelocityY(-300);
        }else{
            this.left_p.body.setVelocityY(0);
        }
    }

    // Función que ejecuta una acción cuando la pelota rebota en alguna paleta
    bouncePaleta(){
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
    }
}