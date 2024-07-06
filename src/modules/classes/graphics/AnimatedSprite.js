const Sprite = require('./Sprite.js')

module.exports = class AnimatedSprite extends Sprite {
    constructor(screen, source) /* complete? */ {
        super(screen, source)
        Object.assign(this, {
            orientation: 'left',
            sx: 0,
            sWidth: 0,
            sHeight: 0
        })
    }

    draw(game) /* complete? */ {
        const Game = require('../game_objects/Game.js')
        if (!(game instanceof Game)) {
            throw new Error('Game expected')
        }

        const { image, screen, sx, sWidth, sHeight } = this
        const size = this.getAbsoluteSize()
        const { context } = screen
        this.prepareContext(game)
        context.drawImage(
            image,
            sx,
            0,
            sWidth,
            sHeight,
            0,
            0,
            ...Object.values(size)
        )
        context.restore()
    }

    prepareContext(game) /* complete? */ {
        const { orientation, parent, position, screen } = this
        const { context } = screen
        super.prepareContext(game)
        if (orientation === 'right') {
            const offset =
                Math.round(position.scale.x * parent.size.x) * -2 +
                parent.size.x
            context.translate(offset, 0)
            context.scale(-1, 1)
        }
    }
}
