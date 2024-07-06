module.exports = {
    keydown: function (event, game) {
        if (event.repeat) {
            return
        }
        const { players } = game
        for (const { character, controls } of players) {
            const action = controls[event.code] // get action
            if (game.isPaused()) {
                game.unpause()
            } else {
                if (!action) {
                    continue
                }
                if (action === 'pause') {
                    game.pause()
                    continue
                }
            }
            if (!character) {
                continue
            }
            if (action) {
                character.activeInputs.add(action)
            }
        }
    },
    keyup: function (event, { players }) {
        for (const { character, controls } of players) {
            const action = controls[event.code] // get action
            if (!character) {
                continue
            }
            if (action) {
                character.activeInputs.delete(action)
            }
        }
    }
}
