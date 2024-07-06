const Coordinate2D = require('../math/Coordinate2D.js')
const Platform = require('./Platform.js')

module.exports = class MovingPlatform extends Platform {
    constructor(game, script) {
        super(game)
        Object.assign(this, {
            runScript: script,
            startPosition: new Coordinate2D(),
            max: 0
        })
    }

    updatePhysics() {
        const { collisionBox } = this
        const nextPosition = this.getNextPosition()
        const collisions = this.getCollisions()
        const Character = require('./Character.js')
        for (const gameObject of collisions) {
            const other = gameObject.collisionBox
            if (
                !(gameObject instanceof Character) ||
                !collisionBox.overlapsBottom(other)
            ) {
                continue
            }

            other.position = other.position.plus(this.getVelocity())
            other.position.y += 0.1
        }
        this.collisionBox.position = nextPosition
    }
}
