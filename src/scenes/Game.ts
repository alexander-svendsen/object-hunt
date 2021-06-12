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
    private outlinePlugin!: OutlinePipelinePlugin
    private activeHidingPlace: Phaser.Physics.Arcade.Sprite | undefined;

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
        const extraWalls = this.physics.add.staticGroup()
        extraWalls.get(173,56, 'wall')
        extraWalls.get(173,136, 'wall')
        extraWalls.get(226,136, 'wall')
        extraWalls.get(226,200, 'wall')


        this.player = this.add.player(200, 128, 'player')
        this.cameras.main.startFollow(this.player, true)
        this.physics.add.collider(this.player, wallLayer)

        this.hideGroup = this.physics.add.staticGroup()
        this.createHideObjects()

        // @ts-ignore
        this.physics.add.collider(this.player, this.hideGroup, this.handlePlayerBoxCollide, undefined, this)
        this.physics.add.collider(this.player, extraWalls)
    }

    update(time: number, delta: number) {
        super.update(time, delta);

        this.player.update(this.cursors)
        this.updateActiveHidingPlace()
    }

    private handlePlayerBoxCollide(player: Phaser.Physics.Arcade.Sprite, box: Phaser.Physics.Arcade.Sprite) {
        if (!this.activeHidingPlace) {
            this.activeHidingPlace = box

            this.outlinePlugin.add(box, {
                name: 'fridge',
                thickness: 1,
                outlineColor: 0xff0000
            });
        }
    }

    private createHideObjects() {
        this.hideGroup.get(256, 144, 'fridge')
        this.hideGroup.get(273, 144, 'oven')
        this.hideGroup.get(127, 65, 'bathroom-sink')
        this.hideGroup.get(103, 65, 'washer')
        this.hideGroup.get(88, 104, 'shower')
        this.hideGroup.get(163, 103, 'misc')

    }

    updateActiveHidingPlace() {
        if (!this.activeHidingPlace) {
            return
        }

        const distance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.activeHidingPlace.x, this.activeHidingPlace.y
        )

        if (distance < 19) {
            return
        }

        this.outlinePlugin.remove(this.activeHidingPlace);
        this.activeHidingPlace = undefined
    }
}
