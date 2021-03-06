import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    constructor() {
        super('preloader')
    }

    preload() {
        this.addLoading()
        this.load.image('tileset', 'tiles/tileset.png')
        this.load.tilemapTiledJSON('apartment', 'tiles/apartment.json')

        this.load.atlas('player', 'character/player.png', 'character/player.json')
        this.load.image('fridge', 'tiles/fridge.png')
        this.load.image('oven', 'tiles/oven.png')
        this.load.image('kitchen-microwave', 'tiles/kitchen-microwave.png')
        this.load.image('kitchen-sink', 'tiles/kitchen-sink.png')
        this.load.image('kitchen-stuff', 'tiles/kitchen-stuff.png')
        this.load.image('kitchen-tap', 'tiles/kitchen-tap.png')
        this.load.image('desk', 'tiles/desk.png')
        this.load.image('books', 'tiles/books.png')
        this.load.image('drawer', 'tiles/drawer.png')
        this.load.image('sofa', 'tiles/sofa.png')
        this.load.image('phone', 'tiles/phone.png')
        this.load.image('large-bed', 'tiles/large-bed.png')

        this.load.image('wall', 'tiles/wall.png')
        this.load.image('bathroom-sink', 'tiles/bathroom-sink.png')
        this.load.image('washer', 'tiles/washer.png')
        this.load.image('shower', 'tiles/shower.png')
        this.load.image('misc', 'tiles/misc.png')
        this.load.image('small-bed', 'tiles/small-bed.png')
        this.load.image('table', 'tiles/table.png')
        this.load.image('toilet', 'tiles/toilet.png')
        this.load.image('closet', 'tiles/closet.png')

        this.load.image('bathroom-rug', 'tiles/bathroom-rug.png')
        this.load.image('rug', 'tiles/rug.png')
        this.load.image('rug2', 'tiles/rug2.png')
        this.load.image('pillow', 'tiles/pillow.png')
    }

    create() {
        this.scene.start('game')
    }

    addLoading(){
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 100, height / 2, 200, 28);
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 15,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                color: '#ffffff'
            }
        });

        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 15,
            text: '0%',
            style: {
                font: '18px monospace',
                color: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            percentText.setText(parseInt(value) * 100 + '%');
            progressBar.fillRect(width / 2 - 96, height / 2 + 4, 192 * value, 20);
        });

        this.load.once('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

    }
}
