module.exports = class Player {
    constructor(game) {
        // const Character = require('./Character.js')
        const controls = require('../../data/misc/controls.js')
        // initialize character as null
        Object.assign(this, {
            // character: new Character(game, 'Alien'),
            controls
        })
        // remove this
        // game.objects.add(this.character)
    }
}
