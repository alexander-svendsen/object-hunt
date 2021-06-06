import Phaser from 'phaser'

import '../character/Player'
import Player from "../character/Player";
import createCharacterAnims from "../anims/CharacterAnims";
import {debugDraw} from "~/utils/debug";

export default class Game extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: Player;
    constructor() {
        super('game');
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        createCharacterAnims(this.anims)
        const map = this.make.tilemap({key: 'apartment'})
        const tileset = map.addTilesetImage('tileset', 'tileset')

        map.createLayer('Ground', tileset)
        const wallLayer = map.createLayer('Walls', tileset)
        wallLayer.setCollisionByProperty({collides: true})

        this.player = this.add.player(200, 128, 'player')
        this.cameras.main.startFollow(this.player, true)
        this.physics.add.collider(this.player, wallLayer)

    }

    update(time: number, delta: number) {
        super.update(time, delta);

        this.player.update(this.cursors)
    }
}
