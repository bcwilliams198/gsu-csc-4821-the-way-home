const Coordinate2D = require('../../classes/math/Coordinate2D.js')

module.exports = {
    maxSpeed: {
        x: 7,
        y: 25
    },
    sourceSpriteSize: {
        x: 700,
        y: 700
    },
    states: {
        crouch: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(54, 80)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(3.7, 2.5)
                    sprite.position.scale = new Coordinate2D(-1.9, -0.8)
                }
            },
            lastFrame: 1
        },
        crouching: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(48, 80)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(4.167, 2.5)
                    sprite.position.scale = new Coordinate2D(-2, -0.82)
                },
                15: function () {
                    this.setState('crouch')
                }
            },
            lastFrame: 15
        },
        dash: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 120)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(4.762, 1.666)
                    this.checkStoppedDashing()
                },
                7: function () {
                    const { sprite } = this
                    // sprite
                    sprite.sx = 700
                },
                13: function () {
                    const { sprite } = this
                    // sprite
                    sprite.sx = 1400
                    this.checkStoppedDashing()
                },
                19: function () {
                    const { sprite } = this
                    // sprite
                    sprite.sx = 2100
                },
                25: function () {
                    const { sprite } = this
                    // sprite
                    sprite.sx = 2800
                    this.checkStoppedDashing()
                },
                31: function () {
                    const { sprite } = this
                    // sprite
                    sprite.sx = 3500
                },
                37: function () {
                    const { sprite } = this
                    // sprite
                    sprite.sx = 4200
                    this.checkStoppedDashing()
                },
                43: function () {
                    const { sprite } = this
                    // sprite
                    sprite.sx = 4900
                }
            },
            lastFrame: 49
        },
        dash_special: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 120)

                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(4.762, 1.666)
                    sprite.position.scale = new Coordinate2D(-2.6, -0.38)
                },
                12: function () {
                    const { sprite } = this

                    // sprite
                    sprite.sx = 700
                    sprite.position.scale = new Coordinate2D(-2.6, -0.36)
                },
                23: function () {
                    const { sprite } = this

                    // sprite
                    sprite.sx = 1400
                },
                26: function () {
                    const { collisionBox, game, sprite } = this
                    const { position } = collisionBox
                    const { orientation } = sprite
                    const Projectile = require('../../classes/game_objects/Projectile.js')
                    const projectile = new Projectile(game, this)
                    projectile.damage = 1
                    const xDisplacement = 110
                    projectile.setPosition(position.x, position.y + 58)
                    projectile.setSize(20, 10)
                    projectile.sprite.orientation = orientation
                    const speed = 16
                    projectile.setVelocity(
                        speed * (orientation === 'left' ? -1 : 1),
                        0
                    )
                    if (orientation === 'left') {
                        projectile.collisionBox.position.x -= xDisplacement
                    } else {
                        projectile.collisionBox.position.x +=
                            xDisplacement + this.getSize().x
                    }
                    game.addObject(projectile)
                    const sound = game.assets.audio.sfx['gunshot.wav']
                    sound.currentTime = 0
                    sound.play()
                },
                50: function () {
                    this.setState('dash')
                }
            },
            lastFrame: 50
        },
        dead: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(70, 40)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(2.857, 5)
                    sprite.position.scale = new Coordinate2D(-1.4, -2.2)
                }
            },
            lastFrame: 1
        },
        dying: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 120)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(4.762, 1.666)
                    sprite.position.scale = new Coordinate2D(-2.6, -0.39)
                },
                17: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 110)
                    // sprite
                    sprite.sx = 700
                    sprite.size.scale = new Coordinate2D(4.762, 1.818)
                    sprite.position.scale = new Coordinate2D(-2.6, -0.5)
                },
                21: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 110)
                    // sprite
                    sprite.sx = 1400
                    sprite.size.scale = new Coordinate2D(4.762, 1.818)
                    sprite.position.scale = new Coordinate2D(-2.3, -0.35)
                },
                25: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 100)
                    // sprite
                    sprite.sx = 2100
                    sprite.size.scale = new Coordinate2D(4.762, 2)
                    sprite.position.scale = new Coordinate2D(-2.3, -0.35)
                },
                29: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(50, 80)
                    // sprite
                    sprite.sx = 2800
                    sprite.size.scale = new Coordinate2D(4, 2.5)
                    sprite.position.scale = new Coordinate2D(-2, -0.8)
                },
                33: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(50, 60)
                    // sprite
                    sprite.sx = 3500
                    sprite.size.scale = new Coordinate2D(4, 3.33)
                    sprite.position.scale = new Coordinate2D(-2, -1.2)
                },
                36: function () {
                    this.setState('dead')
                }
            },
            lastFrame: 37
        },
        freefall: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 100)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(4.762, 2)
                    sprite.position.scale = new Coordinate2D(-2.6, -0.3)
                }
            },
            lastFrame: 1
        },
        freefall_special: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 120)
                    // sprite
                    sprite.size.scale = new Coordinate2D(4.762, 1.666)
                    sprite.position.scale = new Coordinate2D(-2.6, -0.35)
                },
                9: function () {
                    const { collisionBox, game, sprite } = this
                    const { position } = collisionBox
                    const { orientation } = sprite
                    const Projectile = require('../../classes/game_objects/Projectile.js')
                    const projectile = new Projectile(game, this)
                    projectile.damage = 1
                    const xDisplacement = 110
                    projectile.setPosition(position.x, position.y + 58)
                    projectile.setSize(20, 10)
                    projectile.sprite.orientation = orientation
                    const speed = 16
                    projectile.setVelocity(
                        speed * (orientation === 'left' ? -1 : 1),
                        0
                    )
                    if (orientation === 'left') {
                        projectile.collisionBox.position.x -= xDisplacement
                    } else {
                        projectile.collisionBox.position.x +=
                            xDisplacement + this.getSize().x
                    }
                    game.addObject(projectile)
                    const sound = game.assets.audio.sfx['gunshot.wav']
                    sound.currentTime = 0
                    sound.play()
                },
                20: function () {
                    this.setState('freefall')
                }
            },
            lastFrame: 20
        },
        idle: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 120)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(4.762, 1.666)
                    sprite.position.scale = new Coordinate2D(-2.6, -0.3)
                }
            },
            lastFrame: 1
        },
        idle_special: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 120)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(4.762, 1.666)
                    sprite.position.scale = new Coordinate2D(-2.7, -0.37)
                },
                13: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 120)
                    // sprite
                    sprite.sx = 700
                    sprite.size.scale = new Coordinate2D(4.762, 1.666)
                    sprite.position.scale = new Coordinate2D(-2.7, -0.37)
                },
                25: function () {
                    const { collisionBox, game, sprite } = this
                    const { position } = collisionBox
                    const { orientation } = sprite
                    const Projectile = require('../../classes/game_objects/Projectile.js')
                    const projectile = new Projectile(game, this)
                    projectile.damage = 1
                    const xDisplacement = 110
                    projectile.setPosition(position.x, position.y + 58)
                    projectile.setSize(20, 10)
                    projectile.sprite.orientation = orientation
                    const speed = 16
                    projectile.setVelocity(
                        speed * (orientation === 'left' ? -1 : 1),
                        0
                    )
                    if (orientation === 'left') {
                        projectile.collisionBox.position.x -= xDisplacement
                    } else {
                        projectile.collisionBox.position.x +=
                            xDisplacement + this.getSize().x
                    }
                    game.addObject(projectile)
                    const sound = game.assets.audio.sfx['gunshot.wav']
                    sound.currentTime = 0
                    sound.play()
                },
                40: function () {
                    const { sprite } = this
                    // sprite
                    sprite.sx = 1400
                },
                50: function () {
                    this.setState('idle')
                }
            },
            lastFrame: 50
        },
        jumpsquat: {
            frameData: {
                1: function () {
                    const { sprite } = this
                    // collision box
                    this.setSize(42, 120)
                    // sprite
                    sprite.sx = 0
                    sprite.size.scale = new Coordinate2D(4.762, 1.666)
                    sprite.position.scale = new Coordinate2D(-2.6, -0.24)
                },
                9: function () {
                    // collision box
                    this.getVelocity().y += 25
                    this.setState('freefall')
                }
            },
            lastFrame: 9
        }
    }
}
