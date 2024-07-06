module.exports = class GameObject {
    constructor(game) /* complete? */ {
        // game: Game
        const Game = require('./Game.js')
        if (!(game instanceof Game)) {
            throw new Error('Game expected')
        }

        const CollisionBox = require('./CollisionBox.js')
        const Rectangle = require('../graphics/Rectangle.js')
        const Sprite = require('../graphics/Sprite.js')
        Object.assign(this, {
            collisionBox: new CollisionBox(),
            collisionBoxImage: new Rectangle(game.screen),
            game,
            // ricochet:false,
            sprite: new Sprite(game.screen)
        })
        this.prepareCollisionBoxMethods()
        this.prepareCollisionBoxImage()
        this.prepareSprite()
    }

    draw() /* complete? */ {
        const { game, sprite } = this
        sprite.draw(game)
    }

    getCollisions() /* complete */ {
        const gameObjects = this.game.objects
        const collisions = new Set()
        const nextPosition = this.getNextPosition()
        for (const other of gameObjects) {
            if (other === this) {
                continue
            }
            if (this.collisionBox.overlaps(other.collisionBox, nextPosition)) {
                collisions.add(other)
            }
        }
        return collisions
    }

    getNextPosition() /* complete */ {
        const { acceleration, position, velocity } = this.collisionBox
        const nextVelocity = velocity.plus(acceleration)
        return position.plus(nextVelocity)
    }

    prepareCollisionBoxImage() /* complete */ {
        const Coordinate2D = require('../math/Coordinate2D.js')
        const { collisionBox, collisionBoxImage } = this
        collisionBoxImage.parent = collisionBox
        collisionBoxImage.size.scale = new Coordinate2D(1, 1)
        collisionBoxImage.color = 'red'
        collisionBoxImage.drawType = 'stroke'
    }

    prepareCollisionBoxMethods() /* complete? */ {
        const Coordinate2D = require('../math/Coordinate2D.js')
        const { collisionBox } = this
        for (const property in collisionBox) {
            const Property = `${property[0].toUpperCase()}${property.substring(
                1
            )}`
            this[`get${Property}`] = function () /* complete? */ {
                return collisionBox[property]
            }
            this[`set${Property}`] = function (x, y) /* complete? */ {
                // x: Number
                // y: Number
                if (isNaN(x) || isNaN(y)) {
                    throw new Error('Number(s) expected')
                }
                collisionBox[property] = new Coordinate2D(x, y)
            }
        }
    }

    prepareSprite() /* complete */ {
        const { collisionBox, sprite } = this
        sprite.parent = collisionBox
    }

    updatePhysics() { }
}
