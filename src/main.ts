import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import OutlinePipelinePlugin from "phaser3-rex-plugins/plugins/outlinepipeline-plugin.js";

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 400,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    render: {
        antialiasGL: true,
        pixelArt: true,
    },
    scene: [Preloader, Game],
    scale: {
        zoom: 2
    },
    plugins: {
        global: [{
            key: 'rexOutlinePipeline',
            plugin: OutlinePipelinePlugin,
            start: true
        }]
    }
})