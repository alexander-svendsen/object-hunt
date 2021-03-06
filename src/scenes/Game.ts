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
    private extraStuff!: Phaser.GameObjects.Group;
    private collidePoint!: Phaser.Math.Vector2;

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
        const extraWalls = this.add.group()
        extraWalls.get(173,56, 'wall')
        extraWalls.get(173,136, 'wall')
        extraWalls.get(226,136, 'wall')
        extraWalls.get(226,200, 'wall')


        this.player = this.add.player(200, 128, 'player')
        this.cameras.main.startFollow(this.player, true)
        this.physics.add.collider(this.player, wallLayer)

        this.hideGroup = this.physics.add.staticGroup()
        this.extraStuff = this.add.group()

        this.createHideObjects()
        // @ts-ignore
        this.physics.add.collider(this.player, this.hideGroup, this.handlePlayerBoxCollide, undefined, this)
    }

    update(time: number, delta: number) {
        super.update(time, delta);

        this.player.update(this.cursors)
        this.updateActiveHidingPlace()
    }

    private handlePlayerBoxCollide(player: Phaser.Physics.Arcade.Sprite, box: Phaser.Physics.Arcade.Sprite) {
        if (!this.activeHidingPlace) {
            box.setDepth(1)
            this.activeHidingPlace = box
            this.collidePoint = player.getCenter()

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
        this.hideGroup.get(290, 144, 'kitchen-microwave')
        this.hideGroup.get(306, 144, 'kitchen-sink')
        this.hideGroup.get(322, 144, 'kitchen-stuff')
        this.hideGroup.get(338, 144, 'kitchen-sink')
        this.hideGroup.get(354, 144, 'kitchen-tap')
        this.hideGroup.get(269, 230, 'sofa')
        this.hideGroup.get(269, 195, 'phone')

        this.hideGroup.get(127, 65, 'bathroom-sink')
        this.hideGroup.get(103, 65, 'washer')
        this.hideGroup.get(88, 104, 'shower')
        this.hideGroup.get(163, 103, 'misc')
        this.hideGroup.get(128, 107, 'toilet')
        this.hideGroup.get(152, 57, 'closet')

        this.hideGroup.get(184, 243, 'small-bed')
        this.hideGroup.get(246, 245, 'desk')
        this.hideGroup.get(243, 205, 'drawer')
        this.hideGroup.get(210, 250, 'books')
        this.hideGroup.get(250, 225, 'books')

        this.extraStuff.get(127, 83, 'bathroom-rug')
        this.extraStuff.get(290, 170, 'rug')
        this.extraStuff.get(200, 100, 'rug2')
        this.extraStuff.get(341, 192, 'pillow')
        this.extraStuff.get(341, 172, 'pillow')
        this.extraStuff.get(359, 172, 'pillow')
        this.extraStuff.get(359, 192, 'pillow')
        this.hideGroup.get(350, 180, 'table')

        this.hideGroup.get(90, 140, 'closet')
        this.hideGroup.get(110, 140, 'closet')
        this.hideGroup.get(140, 142, 'drawer')
        this.hideGroup.get(97, 205, 'large-bed')
    }

    updateActiveHidingPlace() {
        if (!this.activeHidingPlace) {
            return
        }

        const distance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.collidePoint.x, this.collidePoint.y
        )

        if (distance < 2) {
            return
        }

        this.activeHidingPlace.setDepth(0)
        this.outlinePlugin.remove(this.activeHidingPlace);
        this.activeHidingPlace = undefined
    }
}
