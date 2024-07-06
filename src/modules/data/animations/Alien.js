const Coordinate2D = require('../../classes/math/Coordinate2D.js')

module.exports = {
    maxSpeed: {
        x: 8,
        y: 25
    },
    sourceSpriteSize: {
        x: 180,
        y: 180
    },
    states: {
        crouch: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(66, 80)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(1.818, 1.5)
                    sprite.position.scale = new Coordinate2D(-0.3, -0.4)
                }
            },
            lastFrame: 1
        },
        dash: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(48, 90)
                    // sprite
                    sprite.sx = 180
                    sprite.size.scale = new Coordinate2D(2.5, 1.333)
                    sprite.position.scale = new Coordinate2D(-0.98, -0.35)
                    this.checkStoppedDashing()
                },
                14: function () {
                    const { sprite } = this
                    // collision box
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(2.5, 1.333)
                    sprite.position.scale = new Coordinate2D(-0.98, -0.3)
                    this.checkStoppedDashing()
                }
            },
            lastFrame: 26
        },
        dead: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 100)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(2.857, 1.2)
                    sprite.position.scale = new Coordinate2D(-1.38, -0.17)
                }
            },
            lastFrame: 1
        },
        freefall: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 88)
                    // sprite
                    sprite.sx = this.getVelocity().y > 0 ? 0 : 180
                    sprite.size.scale = new Coordinate2D(2.857, 1.363)
                    sprite.position.scale = new Coordinate2D(-1.15, -0.25)
                }
            },
            lastFrame: 1
        },
        hitstun: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 100)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(2.857, 1.2)
                    sprite.position.scale = new Coordinate2D(-1.38, -0.17)
                },
                10: function () {
                    this.setState('freefall')
                }
            },
            lastFrame: 10
        },
        idle: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 100)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(2.857, 1.2)
                    sprite.position.scale = new Coordinate2D(-1.38, -0.17)
                },
                37: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 94)
                    // sprite
                    sprite.sx = 180
                    sprite.size.scale = new Coordinate2D(2.857, 1.276)
                    sprite.position.scale = new Coordinate2D(-1.38, -0.25)
                }
            },
            lastFrame: 72
        },
        jumpsquat: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 88)

                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(2.857, 1.363)
                    sprite.position.scale = new Coordinate2D(-1.05, -0.3)
                },
                13: function () {
                    const { game } = this
                    // collision box
                    this.getVelocity().y = 25
                    const sound = game.assets.audio.sfx['jump.wav']
                    sound.currentTime = 0
                    sound.play()
                    // console.log()
                }
            },
            lastFrame: 13
        }
    }
}
