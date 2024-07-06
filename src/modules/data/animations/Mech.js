const Coordinate2D = require('../../classes/math/Coordinate2D.js')

module.exports = {
    maxSpeed: {
        x: 3,
        y: 25
    },
    sourceSpriteSize: {
        x: 1200,
        y: 1200
    },
    states: {
        dash: {
            frameData: {
                1: function () {
                    const { collisionBox, sprite } = this
                    const { acceleration, velocity } = collisionBox
                    // collision box
                    this.setSize(100, 200)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(3.5, 1.75)
                    sprite.position.scale = new Coordinate2D(-1.5, -0.46)
                    if (
                        Math.abs(velocity.x) === 0 &&
                        Math.abs(acceleration.x) === 0
                    ) {
                        this.setState('idle')
                    }
                },
                31: function () {
                    const { collisionBox, sprite } = this
                    const { acceleration, velocity } = collisionBox
                    sprite.sx = 1200
                    if (
                        Math.abs(velocity.x) === 0 &&
                        Math.abs(acceleration.x) === 0
                    ) {
                        this.setState('idle')
                    }
                }
            },
            lastFrame: 60
        },
        dash_special: {
            frameData: {
                1: function () { }
            },
            lastFrame: 1,
            sourceSpriteSize: {
                x: 1400,
                y: 1400
            }
        },
        dead: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(100, 160)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(3.5, 2.188)
                    sprite.position.scale = new Coordinate2D(-1.5, -0.73)
                }
            },
            lastFrame: 1
        },
        freefall: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(100, 220)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(3.5, 1.591)
                    sprite.position.scale = new Coordinate2D(-1.5, -0.35)
                }
            },
            lastFrame: 1
        },
        idle: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(100, 200)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(3.5, 1.75)
                    sprite.position.scale = new Coordinate2D(-1.5, -0.48)
                }
            },
            lastFrame: 1
        },
        idle_special: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // sprite
                    sprite.size.scale = new Coordinate2D(4.083, 2.042)
                    sprite.position.scale = new Coordinate2D(-2.02, -0.632)
                },
                15: function () {
                    this.setState('idle')
                }
            },
            lastFrame: 16,
            sourceSpriteSize: {
                x: 1400,
                y: 1400
            }
        },
        jumpsquat: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(100, 180)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(3.5, 1.944)
                    sprite.position.scale = new Coordinate2D(-1.5, -0.56)
                },
                26: function () {
                    this.getVelocity().y += 25
                }
            },
            lastFrame: 26
        }
    }
}
