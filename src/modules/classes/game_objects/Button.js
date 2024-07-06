const GameObject = require('./GameObject.js')

module.exports = class Button extends GameObject {
    constructor(game) {
        // game: Game
        super(game)

        const AnimatedSprite = require('../graphics/AnimatedSprite.js')
        Object.assign(this, {
            sprite: new AnimatedSprite(game.screen)
        })
    }
}
