module.exports = async () => {
    const Coordinate2D = require('../classes/math/Coordinate2D.js')
    const Game = require('../classes/game_objects/Game.js')

    require('../data/animations/Alien.js')
    require('../data/animations/Mech.js')
    require('../data/animations/Soldier.js')
    const GameObject = require('../classes/game_objects/GameObject.js')
    const Character = require('../classes/game_objects/Character.js')
    const Level = require('../classes/game_objects/Level.js')

    const game = new Game()
    game.fps = 60
    const { camera, screen } = game
    const { canvas, context } = screen
    await game.load()
    game.play()
    const player = game.players[0]
    const character = new Character(game, 'Soldier')
    player.character = character

    character.face('right')
    character.setState('idle')

    const character2 = new Character(game, 'Alien')
    character2.setPosition(800, -260)
    // character2.activeInputs.add('crouch')

    character2.setState('idle')
    character2.face('right')

    character2.runScript = function () {
        // super basic, enemies just face the character for now
        const { activeInputs } = this
        const character = game.players[0].character
        if (!character) {
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
            const inputsToRemove = ['left', 'right', 'special']
            for (const input of inputsToRemove) {
                if (activeInputs.has(input)) {
                    activeInputs.delete(input)
                }
            }
            return
        }
        const directionToPlayer =
            position.x > otherPosition.x ? 'left' : 'right'
        const oppositeDirection =
            directionToPlayer === 'left' ? 'right' : 'left'
        this.face(directionToPlayer)
        if (position.y <= otherPosition.y && !activeInputs.has('special')) {
            activeInputs.add('special')
        }
        if (distance < 300) {
            const directions = ['left', 'right']
            for (const direction of directions) {
                if (activeInputs.has(direction)) {
                    activeInputs.delete(direction)
                }
            }
            return
        }
        if (activeInputs.has(oppositeDirection)) {
            activeInputs.delete(oppositeDirection)
        }
        if (!activeInputs.has(directionToPlayer)) {
            activeInputs.add(directionToPlayer)
        }
    }

    game.objects.add(character2)
    const src = 'src/modules/assets/images/Levels/Level1.png'
    const testLevel = new Level(game, src)
    // testLevel.drawPlatforms()
    //testLevel.background.src = 'src/modules/assets/images/Levels/Level1.png'
    const Platform = require('../classes/game_objects/MovingPlatform.js')
    const ground = new Platform(game)
    ground.setPosition(-400, -280)
    ground.setSize(8000, 20)
    game.objects.add(ground)
    const platform = new Platform(game)
    platform.sprite.image =
        game.assets.images.game_objects.platforms['Indoor.png']
    platform.sprite.size.scale = new Coordinate2D(1, 1)
    platform.setPosition(0, -200)
    platform.setSize(140, 40)

    // platform.setVelocity(1, 0)
    game.objects.add(platform)
    character.setPosition(-120, -260)
    // game.camera.positionOffset.x += -20
    // game.camera.positionOffset.y += 200
    // camera.subject = character
    const Button = require('../classes/game_objects/Button.js')
    const teleporter = new Button(game)
    teleporter.setPosition(0, -260)
    teleporter.setSize(20, 20)
    // game.objects.add(teleporter)

    const Rectangle = require('../classes/graphics/Rectangle.js')
    const rectangle = new Rectangle(screen)
    rectangle.size.scale = new Coordinate2D(1, 1)

    const a = new GameObject(game)
    a.setPosition(0, -260)
    a.setSize(100, 100)
    a.sprite = new Rectangle(game.screen)
    a.prepareSprite()
    // a.sprite.parent = a.collisionBox
    a.sprite.size.scale = new Coordinate2D(1, 1)

    // console.log(a.sprite)

    // a.something = new Rectangle(game.screen)
    /// a.something.parent = a.collisionBox
    // a.something.size.scale = new Coordinate2D(1,1)
    //a.sprite.size.scale = new Coordinate2D(1, 1)
    //a.prepareSprite()
    game.objects.add(a)
    // screen.addChild()

    // console.log(game.isPaused())

    game.objects.add(character)

    let timestampOfLastDraw = 0

    requestAnimationFrame(function processRequestedFrame(timestamp) {
        // requestAnimationFrame(processRequestedFrame)
        // console.log('Yo')
        if (!game.isPaused()) {
            game.updatePhysics()
        }
        timestamp = (timestamp || timestampOfLastDraw) / 1000
        const timeElapsedSinceLastDraw = timestamp - timestampOfLastDraw
        if (timeElapsedSinceLastDraw >= 1 / game.fps) {
            timestampOfLastDraw = timestamp
            context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
            // console.log(testLevel.background.sprite.image.src)
            // testLevel.drawLevel(game)
            //console.log(testLevel.background.image.src)
            for (const gameObject of game.objects) {
                if (gameObject.draw) {
                    gameObject.draw()
                    // a.something.draw(game)
                }
                gameObject.collisionBoxImage.draw(game)
            }

            // drawLines(canvas, context)
        }
    })
}

function drawLines(canvas, context) {
    context.beginPath()
    context.moveTo(0, canvas.clientHeight / 2)
    context.lineTo(canvas.clientWidth, canvas.clientHeight / 2)
    context.stroke()
    context.moveTo(canvas.clientWidth / 2, 0)
    context.lineTo(canvas.clientWidth / 2, canvas.clientHeight)
    context.stroke()
}
