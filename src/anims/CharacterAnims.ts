import Phaser from 'phaser'

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'down',
        frames: [{ key: 'player', frame: 'down-1.png' }]
    })

    anims.create({
        key: 'up',
        frames: [{ key: 'player', frame: 'up-1.png' }]
    })

    anims.create({
        key: 'left',
        frames: [{ key: 'player', frame: 'left-1.png' }]
    })

    anims.create({
        key: 'right',
        frames: [{ key: 'player', frame: 'right-1.png' }]
    })

    anims.create({
        key: 'run-down',
        frames: anims.generateFrameNames('player', { start: 1, end: 4, prefix: 'down-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'run-up',
        frames: anims.generateFrameNames('player', { start: 1, end: 4, prefix: 'up-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'run-right',
        frames: anims.generateFrameNames('player', { start: 1, end: 4, prefix: 'right-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'run-left',
        frames: anims.generateFrameNames('player', { start: 1, end: 4, prefix: 'left-', suffix: '.png' }),
        frameRate: 15
    })
}

export default createCharacterAnims;