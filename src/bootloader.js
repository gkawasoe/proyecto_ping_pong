export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({key: "Bootloader"});
    }

    // Precarga de elementos del juego
    preload() {
        this.load.on("complete", () => {
            this.scene.start("Scene_play");
        });
        
        // Precarga de elementos superiores
        this.load.image("goichi", "./assets/goichi.jpg");
        this.load.image("diego", "./assets/diego.jpg");

        // Precarga de Objetos
        this.load.image("ball", "./assets/ball.png");
        this.load.image("left_p", "./assets/left_pallete.png");
        this.load.image("right_p", "./assets/right_pallete.png");
        this.load.image("separator", "./assets/separator.png");
        
    }
}