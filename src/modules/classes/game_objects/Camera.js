const Coordinate2D = require('../math/Coordinate2D.js')

module.exports = class Camera {
    constructor() {
        Object.assign(this, {
            mode: 'follow', // "fixed", "follow"
            positionOffset: new Coordinate2D(0, 150),
            subject: null,
            zoom: 1
        })
    }

    getPosition() {
        const { mode, positionOffset, subject } = this
        if (mode !== 'follow' || subject === null) {
            return positionOffset
        }
        return subject.getPosition().plus(positionOffset)
    }
}
