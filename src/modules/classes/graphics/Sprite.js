const GUIElement = require('./GUIElement.js')

module.exports = class Sprite extends GUIElement {
    constructor(screen, source) {
        // source: string
        if (source != null && typeof source !== 'string') {
            throw new Error('String expected')
        }

        super(screen)
        Object.assign(this, {
            image: new Image()
        })
        this.image.src = source || ''
    }

    draw(game) {
        const Game = require('../game_objects/Game.js')
        if (!(game instanceof Game)) {
            throw new Error('Game expected')
        }

        const { image, screen } = this
        const size = this.getAbsoluteSize()
        const { context } = screen
        this.prepareContext(game)
        context.drawImage(image, 0, 0, ...Object.values(size))
        context.restore()
    }
}
