import Phaser from 'phaser'

import '../character/Player'
import Player from "../character/Player";
import createCharacterAnims from "../anims/CharacterAnims";
import {debugDraw} from "~/utils/debug";
import OutlinePipelinePlugin from "phaser3-rex-plugins/plugins/outlinepipeline-plugin";

export default class Game extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: Player;
    private hideGroup!: Phaser.Physics.Arcade.StaticGroup;
    private done: Boolean = false;
    private outlinePlugin!: OutlinePipelinePlugin

    constructor() {
        super('game');
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        createCharacterAnims(this.anims)
        this.outlinePlugin = this.plugins.get('rexOutlinePipeline')
        const map = this.make.tilemap({key: 'apartment'})
        const tileset = map.addTilesetImage('tileset', 'tileset')

        map.createLayer('Ground', tileset)
        const wallLayer = map.createLayer('Walls', tileset)
        wallLayer.setCollisionByProperty({collides: true})

        this.player = this.add.player(200, 128, 'player')
        this.cameras.main.startFollow(this.player, true)
        this.physics.add.collider(this.player, wallLayer)

        this.hideGroup = this.physics.add.staticGroup()
        this.createHideObjects()

        // @ts-ignore
        this.physics.add.collider(this.player, this.hideGroup, this.handlePlayerBoxCollide, undefined, this)
    }

    update(time: number, delta: number) {
        super.update(time, delta);

        this.player.update(this.cursors)
    }

    private handlePlayerBoxCollide(player: Phaser.Physics.Arcade.Sprite, box: Phaser.Physics.Arcade.Sprite) {
        console.log("collided")
        if (this.done == false) {
            this.done = true

            this.outlinePlugin.add(box, {
                thickness: 1,
                outlineColor: 0xff0000
            });
        }
    }

    private createHideObjects() {
        //this.fridges = this.physics.add.sprite(256,144, 'fridge')
        this.hideGroup.get(256, 144, 'fridge')

    }
}
