module.exports = function (game) /* test? */ {
    // game: Game
    const Game = require('../../classes/game_objects/Game.js')
    if (!(game instanceof Game)) {
        throw new Error('Game expected')
    }

    const events = ['keydown', 'keyup']
    const eventHandlers = require('./eventHandlers.js')
    for (const eventName of events) {
        const bindEvent = eventHandlers[eventName]
        game.screen.canvas.addEventListener(eventName, (eventObject) => {
            bindEvent(eventObject, game)
        })
    }
}
