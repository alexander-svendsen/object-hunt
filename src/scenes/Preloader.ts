import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    constructor() {
        super('preloader')
    }

    preload() {
        this.load.image('tileset', 'tiles/tileset.png')
        this.load.tilemapTiledJSON('apartment', 'tiles/apartment.json')

        this.load.atlas('player', 'character/player.png', 'character/player.json')
        this.load.image('fridge', 'tiles/fridge.png')

    }

    create() {
        this.scene.start('game')
    }
}
