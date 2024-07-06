// const Character = require('./Character.js')
const Coordinate2D = require('../math/Coordinate2D.js')
const GameObject = require('./GameObject.js')

module.exports = class Projectile extends GameObject {
    constructor(game, owner) {
        // owner: GameObject
        super(game)
        if (owner != null && !(owner instanceof GameObject)) {
            throw new Error('GameObject expected')
        }
        const AnimatedSprite = require('../graphics/AnimatedSprite.js')
        Object.assign(this, {
            damage: 0,
            owner: owner || null,
            sprite: new AnimatedSprite(game.screen)
        })
        this.prepareSprite()
    }

    prepareSprite() {
        // this code is running twice?
        const { game, sprite } = this
        super.prepareSprite()
        sprite.image = game.assets.images.game_objects['Projectile.png']
        sprite.sWidth = 69
        sprite.sHeight = 35
        sprite.size.scale = new Coordinate2D(1, 1)
    }

    updatePhysics() {
        const Button = require('./Button.js')
        const Character = require('./Character.js')
        const { collisionBox, damage, game, owner } = this
        let nextPosition = this.getNextPosition()
        const collisions = this.getCollisions()
        for (const gameObject of collisions) {
            if (
                owner !== null &&
                gameObject.characterClass === owner.characterClass
            ) {
                continue
            }
            if (gameObject instanceof Character) {
                if (
                    gameObject.cooldowns.intangibility ||
                    (gameObject.characterClass === 'Alien' &&
                        game.players[0].character !== gameObject)
                ) {
                    continue
                }
                gameObject.takeDamage(damage)
            }
            if (
                gameObject instanceof Button &&
                owner === game.players[0].character
            ) {
                gameObject.activate()
            }
            // Explode/deal damage if applicable
            game.removeObject(this)
        }
        collisionBox.position = nextPosition
    }
}
