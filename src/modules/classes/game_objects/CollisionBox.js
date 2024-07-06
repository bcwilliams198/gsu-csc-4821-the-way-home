const Coordinate2D = require('../math/Coordinate2D.js')

module.exports = class CollisionBox {
    constructor() /* complete? */ {
        Object.assign(this, {
            acceleration: new Coordinate2D(),
            position: new Coordinate2D(), // position of bottom-left corner
            size: new Coordinate2D(),
            velocity: new Coordinate2D()
        })
    }

    getClosestPosition(other) {
        // other: CollisionBox
        if (!(other instanceof CollisionBox)) {
            throw new Error('CollisionBox expected')
        }

        const { position, size, velocity } = this
        const displacement = new Coordinate2D()
        const overlapsTop = this.overlapsTop(other)
        const overlapsBottom = this.overlapsBottom(other)
        const overlapsLeft = this.overlapsLeft(other)
        const overlapsRight = this.overlapsRight(other)
        if (overlapsTop || overlapsBottom) {
            displacement.x = velocity.x
            if (overlapsTop) {
                displacement.y = other.position.y + other.size.y - position.y
            } else if (overlapsBottom) {
                displacement.y = other.position.y - (position.y + size.y)
            }
        } else if (overlapsLeft || overlapsRight) {
            displacement.y = velocity.y
            if (overlapsLeft) {
                displacement.x = other.position.x - (position.x + size.x)
                // console.log(displacement.x)
            } else if (overlapsRight) {
                displacement.x = other.position.x + other.size.x - position.x
                // console.log(displacement.x)
            }
        }
        return position.plus(displacement)
    }

    overlaps(other, newPosition) /* complete */ {
        // other: CollisionBox
        // newPosition: Coordinate2D
        if (!(other instanceof CollisionBox)) {
            throw new Error('CollisionBox expected')
        }
        if (!(newPosition instanceof Coordinate2D)) {
            throw new Error('Coordinate2D expected')
        }

        return (
            this !== other &&
            newPosition.x < other.position.x + other.size.x &&
            other.position.x < newPosition.x + this.size.x &&
            newPosition.y < other.position.y + other.size.y &&
            other.position.y < newPosition.y + this.size.y
        )
    }

    overlapsBottom(other) {
        // other: CollisionBox
        if (!(other instanceof CollisionBox)) {
            throw new Error('CollisionBox expected')
        }

        const { position, size } = this
        return other.position.y >= position.y + size.y
    }

    overlapsLeft(other) {
        // other: CollisionBox
        if (!(other instanceof CollisionBox)) {
            throw new Error('CollisionBox expected')
        }

        const { position, size } = this
        return other.position.x >= position.x + size.x
    }

    overlapsRight(other) {
        // other: CollisionBox
        if (!(other instanceof CollisionBox)) {
            throw new Error('CollisionBox expected')
        }

        return this.position.x >= other.position.x + other.size.x
    }

    overlapsTop(other) {
        // other: CollisionBox
        if (!(other instanceof CollisionBox)) {
            throw new Error('CollisionBox expected')
        }

        return this.position.y >= other.position.y + other.size.y
    }
}
