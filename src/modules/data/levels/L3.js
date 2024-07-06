// Once you fill this out, go to Game.js and put 'L3': null
const Coordinate2D = require('../../classes/math/Coordinate2D.js')

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
            size: new Coordinate2D(90, 300)
        },
        //ferris whell wall
        //button wall

        //at the end
        {
            position: new Coordinate2D(10000, -280),
            size: new Coordinate2D(20, 1000)
        }
    ],
    enemies: {
        defaultHealth: 2,
        defaultScript: function () { },
        info: [
            // // standing on the ground
            // {position: new Coordinate2D(1050, -260)},
            // {position: new Coordinate2D(2600, -260)},
            // {position: new Coordinate2D(3000, -260)},
        ]
    },
    platforms: {
        defaultSize: new Coordinate2D(280, 80),
        type: 'Indoor',

        moving: [
            // {
            // 	position: new Coordinate2D(1610, -80),
            // 	initialVelocity: new Coordinate2D(0, 1),
            // 	max: 330,
            // 	script: upDown
            // }
            //{x: 1610, y: -80, v: new Coordinate2D(0, 1), script: upDown, max: 330},
        ],
        stationary: [
            // {position: new Coordinate2D(400, -200)},
            // {position: new Coordinate2D(770, -80)},
            // {position: new Coordinate2D(1050, -80)},
            // {position: new Coordinate2D(1330, -80)}
        ]
    },
    //Miscillaneous
    objects: {
        // Button
        // button: {
        // 	activates: 'Door',
        // 	position: new Coordinate2D(8020, 370),
        // 	orientation: 'right',
        // 	size: new Coordinate2D(30, 30)
        // },
        // Door
        door: {
            className: 'Door',
            position: new Coordinate2D(7800, -260),
            size: new Coordinate2D(200, 200)
        },
        ship: {
            className: 'Ship',
            position: new Coordinate2D(),
            size: new Coordinate2D()
        }
        // Lasers
    },
    cutSceneScript,
    //spawnPoint: new Coordinate2D(-120, -260)
    spawnPoint: new Coordinate2D(8000, -260),
    startsWithCutscene: true
}

function cutSceneScript() {
    const { game } = this
    const character = game.levels.L3.mainCharacter

    if (
        !character.activeInputs.has('right') &&
        character.collisionBox.position.x < 9900
    ) {
        character.activeInputs.add('right')
    }
    if (
        character.activeInputs.has('right') &&
        character.collisionBox.position.x > 9900
    ) {
        character.activeInputs.delete('right')
    }
}
