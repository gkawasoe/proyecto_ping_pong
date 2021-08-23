export default class Paletas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this); // Esto indica que se le agregaran propiedas
        this.body.immovable = true; // Esto indica que las paletas son innamovibles
        this.body.setCollideWorldBounds(true); // Si las paletas toquen los bordes se detendrán
    }


}