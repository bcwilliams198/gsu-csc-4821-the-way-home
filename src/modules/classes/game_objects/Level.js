const Coordinate2D = require('../math/Coordinate2D.js')

module.exports = class Level {
    constructor(game, name) {
        Object.assign(this, {
            data: require(`../../data/levels/${name}.js`),
            game,
            name
        })
    }

    makeVisible() {
        this.visible = true
    }

    play() {
        const { game, name } = this
        const { elements } = game.screen

        game.screen.children = new Set()

        // background
        elements.background = new Set()
        this.prepareBackground()

        // game objects
        game.objects = new Set()
        elements.gameObjects = new Set()

        // boundaries
        this.prepareBoundaries()

        // platforms
        this.preparePlatforms()

        // misc objects
        this.prepareObjects()

        // enemies
        this.prepareEnemies()

        // main character
        this.prepareMainCharacter()

        // HUD
        elements.GUI = new Set()
        this.prepareHUD()

        // music
        const musicFolder = game.assets.audio.music
        const music = musicFolder[`${name}.mp3`]
        for (const other of Object.values(musicFolder)) {
            if (other !== music && !other.paused) {
                other.pause()
                other.currentTime = 0
            }
        }
        if (music.currentTime === 0) {
            music.play()
        }
        game.currentLevel = this
    }

    prepareBackground() /* complete? */ {
        const GameObject = require('./GameObject.js')
        const { data, game, name } = this
        const { elements } = game.screen

        // prepare background
        const { position, size } = data.background
        const background = new GameObject(game)
        const { collisionBox, sprite } = background
        sprite.image = game.assets.images.levels[`BG_${name}.png`]
        sprite.size.scale = new Coordinate2D(1, 1)
        Object.assign(collisionBox, { position, size })
        // add background to screen
        elements.background.add(background)
    }

    prepareBoundaries() /* complete? */ {
        const GameObject = require('./GameObject.js')
        const Rectangle = require('../graphics/Rectangle.js')
        const { data, game } = this
        const { boundaries } = data

        // prepare boundaries
        for (const { color, position, size } of boundaries) {
            const boundary = new GameObject(game)
            boundary.sprite = new Rectangle(game.screen)
            boundary.prepareSprite()
            const { collisionBox, sprite } = boundary
            sprite.size.scale = new Coordinate2D(1, 1)
            if (!color) sprite.opacity = 0
            Object.assign(sprite, { color })
            Object.assign(collisionBox, { position, size })
            // add boundary to game objects
            game.addObject(boundary)
        }
    }

    prepareEnemies() /* complete? */ {
        require('../../data/animations/Soldier.js')
        const Character = require('./Character.js')
        const { data, game } = this
        const { defaultHealth, defaultScript, info } = data.enemies

        // prepare enemies
        for (const { health, position, script } of info) {
            // put in enemy script
            const enemy = new Character(game, 'Soldier')
            Object.assign(enemy, {
                health: health || defaultHealth,
                runScript: script || defaultScript
            })
            Object.assign(enemy.collisionBox, { position })
            enemy.setState('idle')
            // add enemy to game objects
            game.addObject(enemy)
        }
    }

    prepareHUD() {
        const Rectangle = require('../graphics/Rectangle.js')
        const Text = require('../graphics/Text.js')
        const { screen } = this.game
        const { GUI } = screen.elements
        const healthBarBackground = new Rectangle(screen)
        healthBarBackground.color = 'gray'
        healthBarBackground.size.scale = new Coordinate2D(0.15, 0.025)
        // healthBarBackground.position.offset = new Coordinate2D(40, 10)
        const healthBar = new Rectangle(screen)
        healthBar.color = 'green'
        healthBar.size.scale = new Coordinate2D(1, 1)
        // healthBar.position.offset = new Coordinate2D(40,10)
        healthBarBackground.current = healthBar
        healthBarBackground.addChild(healthBar)
        screen.healthBar = healthBarBackground
        screen.addChild(healthBarBackground)
        GUI.add(healthBarBackground)
        const pausePrompt = new Text(screen)
        pausePrompt.type = 'dialog'
        pausePrompt.color = 'white'
        pausePrompt.fontSize = 15
        pausePrompt.content = 'Press p for controls/pause'
        pausePrompt.position.offset = new Coordinate2D(615, 0)
        screen.addChild(pausePrompt)
        GUI.add(pausePrompt)
    }

    prepareMainCharacter() {
        require('../../data/animations/Alien.js')
        const Character = require('./Character.js')
        const { data, game } = this
        const { camera, players } = game

        // prepare main character
        const character = new Character(game, 'Alien')
        Object.assign(character.collisionBox, { position: data.spawnPoint })
        Object.assign(character, { runScript: data.cutSceneScript })
        character.setState('idle')
        character.face('right')
        this.mainCharacter = character
        if (!data.startsWithCutscene) {
            players[0].character = this.mainCharacter
        }
        camera.subject = character
        // add character to game objects
        game.addObject(character)
    }

    prepareObjects() {
        const AnimatedSprite = require('../graphics/AnimatedSprite.js')

        const GameObject = require('./GameObject')
        const Button = require('./Button.js')
        const { data, game } = this
        const { assets } = game
        const { button, door, laser } = data.objects
        let doorObject
        if (door) {
            doorObject = new GameObject(game)
            const { sprite } = doorObject
            //will change
            if (this.name === 'L3') {
                sprite.image = assets.images.items['dooropen.png']
            } else {
                sprite.image = assets.images.items['doorclosed.png']
            }

            sprite.size.scale = new Coordinate2D(1, 1)
            Object.assign(doorObject, { runScript: door.script })
            Object.assign(doorObject.collisionBox, {
                position: door.position,
                size: door.size
            })
            // doorObject.updatePhysics = function(){}
            // check for player collisions
            // Character class Alien &&
            game.addObject(doorObject)
        }
        if (laser) {
            const laserObject = new GameObject(game)
            const { sprite } = laserObject
            sprite.image = assets.images.items['laseron']
        }
        if (button) {
            const buttonObject = new Button(game)
            buttonObject.sprite = new AnimatedSprite(game.screen)
            buttonObject.prepareSprite()
            const { sprite } = buttonObject
            sprite.image = assets.images.items['buttonoff.png']
            sprite.sWidth = 100
            sprite.sHeight = 100
            sprite.orientation = 'right'
            sprite.size.scale = new Coordinate2D(1, 1)
            buttonObject.activate = function () {
                sprite.image = assets.images.items['buttonon.png']
                doorObject.sprite.image = assets.images.items['dooropen.png']
            }
            Object.assign(buttonObject.collisionBox, {
                position: button.position,
                size: button.size
            })

            game.addObject(buttonObject)
        }
    }

    preparePlatforms() /* not complete */ {
        const Platform = require('./Platform.js')
        const MovingPlatform = require('./MovingPlatform.js')

        const { data, game } = this
        const { defaultSize, moving, stationary, type } = data.platforms

        for (const { position, size } of stationary) {
            const platform = new Platform(game)
            const { collisionBox, sprite } = platform
            sprite.image =
                game.assets.images.game_objects.platforms[`${type}.png`]
            sprite.size.scale = new Coordinate2D(1, 1)
            const platformSize = size || defaultSize
            Object.assign(collisionBox, { position, size: platformSize })
            // add platform to game objects
            game.addObject(platform)
        }

        for (const { position, size, max, initialVelocity, script } of moving) {
            const movingPlatform = new MovingPlatform(game, script)
            const { collisionBox, sprite } = movingPlatform
            sprite.image =
                game.assets.images.game_objects.platforms[`${type}.png`]
            sprite.size.scale = new Coordinate2D(1, 1)
            movingPlatform.startPosition = new Coordinate2D(
                ...Object.values(position)
            )
            Object.assign(movingPlatform, { max })
            Object.assign(collisionBox, {
                position,
                size: size || defaultSize,
                velocity: initialVelocity
            })
            // add platform to game objects
            game.addObject(movingPlatform)
        }
    }
}
