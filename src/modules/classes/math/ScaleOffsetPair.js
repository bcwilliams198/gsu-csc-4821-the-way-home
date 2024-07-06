module.exports = class ScaleOffsetPair {
    constructor() {
        const Coordinate2D = require('./Coordinate2D.js')
        Object.assign(this, {
            offset: new Coordinate2D(),
            scale: new Coordinate2D()
        })
    }
}
