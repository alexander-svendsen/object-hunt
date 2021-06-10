import Phaser from 'phaser'

declare global
{
    namespace Phaser.GameObjects
    {
        interface GameObjectFactory
        {
            player(x: number, y: number, texture: string, frame?: string | number): Player
        }
    }
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)
        this.anims.play('down')
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys){
        if (!cursors) {
            return
        }

        const speed = 100

        const leftDown = cursors.left?.isDown
        const rightDown = cursors.right?.isDown
        const upDown = cursors.up?.isDown
        const downDown = cursors.down?.isDown

        if (leftDown) {
            this.anims.play('run-left', true)
            this.setVelocity(-speed, 0)
        }
        else if (rightDown) {
            this.anims.play('run-right', true)
            this.setVelocity(speed, 0)
        }
        else if (upDown) {
            this.anims.play('run-up', true)
            this.setVelocity(0, -speed)
        }
        else if (downDown) {
            this.anims.play('run-down', true)
            this.setVelocity(0, speed)
        }
        else
        {
            const parts = this.anims.currentAnim.key.split('-')
            if(!!parts[1]){
                this.anims.play(parts[1])
                this.setVelocity(0, 0)
            }
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('player', function(this: Phaser.GameObjects.GameObjectFactory,
                         x: number,
                         y: number,
                         texture: string,
                         frame?: string | number){
    const sprite = new Player(this.scene, x, y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)
    sprite.setCollideWorldBounds(true)
    sprite.setDepth(1)
    sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.9)

    return sprite
});