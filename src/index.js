;(async () => {
	console.clear()
	const Game = require('./modules/classes/game_objects/Game.js')
	const game = new Game()
	await game.play()
	game.levels.L2.play()
})()
