const Coordinate2D = require('../../classes/math/Coordinate2D.js')
const Character = require('../../classes/game_objects/Character.js')
const Rectangle = require('../../classes/graphics/Rectangle.js')

module.exports = {
    background: {
        position: new Coordinate2D(-800, -320),
        size: new Coordinate2D(11250, 1500)
    },
    boundaries: [
        // if you want the object to be visible, just give it a color
        // ground
        {
            color: '#1d2728',
            position: new Coordinate2D(-800, -420),
            size: new Coordinate2D(11250, 160)
        },
        // leftmost wall
        {
            position: new Coordinate2D(-400, -260),
            size: new Coordinate2D(20, 5000)
        },
        //first section wall
        {
            color: 'black',
            position: new Coordinate2D(5940, -260),
            size: new Coordinate2D(90, 310)
        },
        //ferris wheel wall
        {
            color: 'black',
            position: new Coordinate2D(7660, -260),
            size: new Coordinate2D(80, 400)
        },
        //button wall
        {
            color: 'black',
            position: new Coordinate2D(8000, 250),
            size: new Coordinate2D(20, 400)
        },
        //at the end
        {
            position: new Coordinate2D(9950, -280),
            size: new Coordinate2D(20, 1000)
        }
    ],
    enemies: {
        defaultHealth: 2,
        defaultScript: function () {
            const { activeInputs, game } = this
            const character = game.players[0].character
            const allInputs = ['left', 'right', 'special']
            const removeAllInputs = function () {
                for (const input of allInputs) {
                    if (activeInputs.has(input)) {
                        activeInputs.delete(input)
                    }
                }
            }
            if (character == null) {
                removeAllInputs()
                return
            }
            const position = this.getPosition()
            const otherPosition = character.getPosition()
            const distance = Math.sqrt(
                [...Object.values(position.minus(otherPosition))]
                    .map((c) => Math.pow(c, 2))
                    .reduce((a, c) => a + c)
            )
            if (distance > 500) {
                removeAllInputs()
                return
            }
            const directionToPlayer =
                position.x > otherPosition.x ? 'left' : 'right'
            const oppositeDirection =
                directionToPlayer === 'left' ? 'right' : 'left'
            this.face(directionToPlayer)
            if (distance < 300) {
                const directions = ['left', 'right']
                for (const direction of directions) {
                    if (activeInputs.has(direction)) {
                        activeInputs.delete(direction)
                    }
                }
            } else {
                if (activeInputs.has(oppositeDirection)) {
                    activeInputs.delete(oppositeDirection)
                }
                if (!activeInputs.has(directionToPlayer)) {
                    activeInputs.add(directionToPlayer)
                }
            }
            if (
                Math.abs(position.y - otherPosition.y) < this.getSize().y / 2 &&
                !activeInputs.has('special')
            ) {
                activeInputs.add('special')
            } else if (activeInputs.has('special')) {
                activeInputs.delete('special')
            }
        },
        info: [
            // // standing on the ground
            // {position: new Coordinate2D(1050, -260)},
            // {position: new Coordinate2D(2600, -260)},
            // {position: new Coordinate2D(3000, -260)},
            // // standing on platforms
            // {position: new Coordinate2D(4680, -100)},

            { position: new Coordinate2D(1050, -260) },
            { position: new Coordinate2D(1200, 0) },
            { position: new Coordinate2D(2600, -260) },
            { position: new Coordinate2D(3000, -260) },
            { position: new Coordinate2D(3880, 100) },
            { position: new Coordinate2D(4680, -100) },
            { position: new Coordinate2D(4680, 300) },
            { position: new Coordinate2D(5380, 100) },
            { position: new Coordinate2D(5800, 100) },
            { position: new Coordinate2D(5800, 0) },
            { position: new Coordinate2D(8280, 0) },
            { position: new Coordinate2D(8280, 350) },
            { position: new Coordinate2D(8980, 250) },
            { position: new Coordinate2D(8980, 0) },
            { position: new Coordinate2D(9580, 0) },
            { position: new Coordinate2D(9580, 350) }
        ]
    },
    platforms: {
        defaultSize: new Coordinate2D(280, 80),
        type: 'Indoor',

        moving: [
            {
                position: new Coordinate2D(1610, -80),
                initialVelocity: new Coordinate2D(0, 1),
                max: 330,
                script: upDown
            },
            {
                position: new Coordinate2D(2210, 250),
                initialVelocity: new Coordinate2D(-1, 0),
                max: 200,
                script: leftRight
            },
            //ferris wheel
            {
                position: new Coordinate2D(6100, 0),
                initialVelocity: new Coordinate2D(0, 2),
                max: 250,
                script: upDown
            },
            {
                position: new Coordinate2D(6900, -100),
                initialVelocity: new Coordinate2D(-1, 0),
                max: 300,
                script: leftRight
            },
            {
                position: new Coordinate2D(6900, 250),
                initialVelocity: new Coordinate2D(-2, 0),
                max: 300,
                script: leftRight
            },
            {
                position: new Coordinate2D(7280, 0),
                initialVelocity: new Coordinate2D(0, 1),
                max: 250,
                script: upDown
            }

            //{x: 1610, y: -80, v: new Coordinate2D(0, 1), script: upDown, max: 330},
        ],
        stationary: [
            // {position: new Coordinate2D(400, -200)},
            // {position: new Coordinate2D(770, -80)},
            // {position: new Coordinate2D(1050, -80)},
            // {position: new Coordinate2D(1330, -80)}

            { position: new Coordinate2D(400, -200) },
            { position: new Coordinate2D(770, -80) },
            { position: new Coordinate2D(1050, -80) },
            { position: new Coordinate2D(1330, -80) },
            { position: new Coordinate2D(2600, 200) },
            { position: new Coordinate2D(3000, 150) },
            // above platforms have been copied to level 2's data file
            { position: new Coordinate2D(3600, -30) },
            { position: new Coordinate2D(3880, -30) },
            { position: new Coordinate2D(4160, -30) },
            { position: new Coordinate2D(4400, -200) },
            { position: new Coordinate2D(4680, -200) },
            { position: new Coordinate2D(4960, -200) },
            { position: new Coordinate2D(4400, 200) },
            { position: new Coordinate2D(4680, 200) },
            { position: new Coordinate2D(4960, 200) },
            { position: new Coordinate2D(5100, -30) },
            { position: new Coordinate2D(5380, -30) },
            { position: new Coordinate2D(5660, -30) },

            //ferris wheell
            // {x: 6100, y: 250}, //down
            // {x: 6100, y: 170}, //down
            // {x: 6100, y: 100}, //down
            // {x: 6500, y: -100}, //right
            // {x: 6900, y: -100}, //right
            // {x: 7280, y: -30}, //up
            // {x: 7280, y: 100}, //up

            //last part
            { position: new Coordinate2D(8000, -100) }, //down
            { position: new Coordinate2D(8280, -100) }, //down
            { position: new Coordinate2D(8000, 250) }, //down
            { position: new Coordinate2D(8280, 250) }, //down
            { position: new Coordinate2D(8700, 50) }, //down
            { position: new Coordinate2D(8980, 50) }, //down
            { position: new Coordinate2D(9300, -100) }, //down
            { position: new Coordinate2D(9580, -100) }, //down
            { position: new Coordinate2D(9300, 250) }, //down
            { position: new Coordinate2D(9580, 250) } //down
        ]
    },
    //Miscillaneous
    objects: {
        // Button
        button: {
            position: new Coordinate2D(8020, 370),
            orientation: 'right',
            size: new Coordinate2D(30, 30)
        },
        // Door
        door: {
            position: new Coordinate2D(9650, 330),
            size: new Coordinate2D(200, 200),
            script: function () {
                const { game, sprite } = this
                const { players, screen } = game
                const { character } = players[0]
                if (!character) {
                    return
                }
                const characterPosition = character.getPosition()
                const position = this.getPosition()
                if (
                    sprite.image === game.assets.images.items['dooropen.png'] &&
                    characterPosition.y >= position.y - 1 &&
                    characterPosition.x >=
                    position.x - character.getSize().x - 1
                ) {
                    const fader = new Rectangle(screen)
                    fader.size.scale = new Coordinate2D(1, 1)
                    fader.opacity = 0
                    screen.addChild(fader)
                    screen.elements.GUI.add(fader)
                    players[0].character = null
                    character.activeInputs = new Set()
                    delete this.runScript
                    setTimeout(() => {
                        this.runScript = function () {
                            if (fader.opacity < 1) {
                                fader.opacity += 0.02
                                return
                            }
                            delete this.runScript
                            setTimeout(() => {
                                fader.opacity = 0
                                this.runScript = function () {
                                    game.levels.L3.play()
                                }
                            }, 500)
                        }
                    }, 500)
                    // game.levels.L3.play()
                }
            }
        }
    },
    spawnPoint: new Coordinate2D(-120, -260)
    // spawnPoint: new Coordinate2D(5700, -260)
    // spawnPoint: new Coordinate2D(9600, 330)
}

function upDown() {
    const { collisionBox, startPosition, max } = this
    if (collisionBox.position.y > startPosition.y + max) {
        collisionBox.velocity.y = -0.8
    } else if (collisionBox.position.y < startPosition.y) {
        collisionBox.velocity.y = 1
    }
}

function leftRight() {
    const { collisionBox, startPosition, max } = this
    // collisionBox.velocity.y = 1
    if (collisionBox.position.x > startPosition.x) {
        collisionBox.velocity.x = -1
    } else if (collisionBox.position.x < startPosition.x - max) {
        collisionBox.velocity.x = 1
    }
}
