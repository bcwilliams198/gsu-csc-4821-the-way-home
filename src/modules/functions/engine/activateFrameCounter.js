module.exports = function (game) /* complete? */ {
    // game: Game
    const Game = require('../../classes/game_objects/Game.js')
    if (!(game instanceof Game)) {
        throw new Error('Game expected')
    }

    let timestampOfLastDraw = 0
    requestAnimationFrame(function processRequestedFrame(timestamp) {
        timestamp = (timestamp || timestampOfLastDraw) / 1000
        const timeElapsedSinceLastDraw = timestamp - timestampOfLastDraw
        const { fps, screen } = game
        if (!game.isPaused()) {
            game.updatePhysics()
        }
        if (timeElapsedSinceLastDraw >= 1 / fps) {
            timestampOfLastDraw = timestamp
            screen.drawNextFrame()
        }
        requestAnimationFrame(processRequestedFrame)
    })
}
