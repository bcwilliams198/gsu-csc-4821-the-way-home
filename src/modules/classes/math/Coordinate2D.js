module.exports = class Coordinate2D {
    constructor(x, y) /* complete */ {
        // x: Number
        // y: Number
        if (
            (x !== undefined && x !== null && isNaN(x)) ||
            (y !== undefined && y !== null && isNaN(y))
        ) {
            throw new Error('Number(s) expected')
        }

        Object.assign(this, {
            x: x || 0,
            y: y || 0
        })
    }

    equals(other) /* complete */ {
        // other: Coordinate2D
        if (!(other instanceof Coordinate2D)) {
            throw new Error('Coordinate2D expected')
        }

        return this.x === other.x && this.y === other.y
    }

    minus(other) /* complete */ {
        // other: Coordinate2D
        if (!(other instanceof Coordinate2D)) {
            throw new Error('Coordinate2D expected')
        }

        return new Coordinate2D(this.x - other.x, this.y - other.y)
    }

    plus(other) /* complete */ {
        // other: Coordinate2D
        if (!(other instanceof Coordinate2D)) {
            throw new Error('Coordinate2D expected')
        }

        return new Coordinate2D(this.x + other.x, this.y + other.y)
    }

    times(scale) /* complete */ {
        // scale: Coordinate2D
        if (!(scale instanceof Coordinate2D)) {
            throw new Error('Coordinate2D expected')
        }

        return new Coordinate2D(this.x * scale.x, this.y * scale.y)
    }
}
