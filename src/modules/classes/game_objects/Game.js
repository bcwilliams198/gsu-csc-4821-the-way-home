module.exports = class Game {
    constructor() /* probably not complete */ {
        const Camera = require('./Camera.js')
        const Player = require('./Player.js')
        const Screen = require('../graphics/Screen.js')
        require('../../data/levels/L2.js')
        Object.assign(this, {
            assets: {},
            camera: new Camera(),
            fps: 60,
            levels: {
                L2: null,
                L3: null
            },
            objects: new Set(),
            players: [new Player(this)],
            screen: new Screen(this, document.querySelector('#gameCanvas')),
            status: {
                paused: false
            }
        })
        this.getLevels()
    }

    addObject(gameObject) {
        const { objects, screen } = this
        objects.add(gameObject)
        screen.elements.gameObjects.add(gameObject.sprite)
    }

    getLevels() {
        require('../../data/levels/L2.js')
        require('../../data/levels/L3.js')
        const Level = require('./Level.js')
        const { levels } = this
        for (const name in levels) {
            const level = new Level(this, name)
            levels[name] = level
        }
    }

    isPaused() /* complete */ {
        return this.status.paused
    }

    async loadAssets() /* not complete; audio */ {
        const { readdirSync } = require('fs')
        let assetsLoaded = 0
        let totalAssets = 0
        const startingPath = '/src/modules/assets/'
        const addListener = (asset) => {
            asset.addEventListener('load', () => {
                assetsLoaded++
                if (assetsLoaded === totalAssets) {
                    this.finishLoading()
                }
            })
        }
        const fetchAssets = (path) => {
            const currentPath = `${startingPath}${path.join('/')}`
            for (const name of readdirSync(currentPath)) {
                let currentDirectory = this.assets
                for (const directory of path) {
                    const directoryObject = currentDirectory[directory] || {}
                    currentDirectory[directory] = directoryObject
                    currentDirectory = currentDirectory[directory]
                }
                // directory
                if (!name.includes('.')) {
                    path.push(name)
                    fetchAssets(path)
                    continue
                }
                // file
                let asset
                if (name.endsWith('.png')) {
                    const image = new Image()
                    image.src = `${currentPath}/${name}`
                    asset = image
                    addListener(image)
                    totalAssets++
                } else if (name.endsWith('.mp3') || name.endsWith('.wav')) {
                    const audio = new Audio(`${currentPath}/${name}`)
                    audio.volume = 0.5
                    asset = audio
                    if (name.endsWith('.mp3')) {
                        // audio.volume = 0
                        audio.addEventListener('timeupdate', function () {
                            const buffer = 0.01
                            if (this.currentTime > this.duration - buffer) {
                                this.currentTime = 0
                                this.play()
                            }
                        })
                    }
                } else {
                    continue
                }
                currentDirectory[name] = asset
            }
            path.pop()
        }
        await new Promise((resolve) => {
            this.finishLoading = resolve
            fetchAssets([])
        })
    }

    pause() /* not complete */ {
        const Coordinate2D = require('../math/Coordinate2D.js')
        const Rectangle = require('../graphics/Rectangle.js')
        const Text = require('../graphics/Text.js')
        const { screen, status } = this

        if (this.isPaused()) {
            return
        }
        const screenSize = screen.getSize()
        const background = new Rectangle(screen)
        background.size.scale = new Coordinate2D(1, 1)
        background.opacity = 0.5
        const pauseMenuElements = [
            {
                content: 'Controls:',
                position: new Coordinate2D()
            },
            {
                content: 'Run: a, d',
                position: new Coordinate2D(0, 0.05)
            },
            {
                content: 'Crouch: s',
                position: new Coordinate2D(0, 0.1)
            },
            {
                content: 'Jump: space',
                position: new Coordinate2D(0, 0.15)
            },
            {
                content: 'Shoot: i',
                position: new Coordinate2D(0, 0.2)
            },
            {
                content: 'Press any key to unpause',
                position: new Coordinate2D(0.5, 0.85),
                center: true
            }
        ]
        for (const { center, content, position } of pauseMenuElements) {
            const text = new Text(screen)
            text.type = 'dialog'
            text.color = 'white'
            text.fontSize = 20
            text.content = content
            const size = text.getAbsoluteSize()
            text.position.scale = position
            if (center) {
                text.position.offset = new Coordinate2D(-size.x / 2, 0)
            }
            background.addChild(text)
        }
        screen.addChild(background)
        screen.elements.pauseMenu.add(background)
        status.paused = true
    }

    async play() /* not complete */ {
        // load assets
        await this.loadAssets()
        const activateFrameCounter = require('../../functions/engine/activateFrameCounter.js')
        const activateEventHandlers = require('../../functions/engine/activateEventHandlers.js')
        //

        activateFrameCounter(this)
        activateEventHandlers(this)
    }

    removeObject(gameObject) {
        const { objects, screen } = this
        objects.delete(gameObject)
        screen.elements.gameObjects.delete(gameObject.sprite)
    }

    unpause() /* complete? */ {
        const { screen, status } = this
        if (!this.isPaused()) {
            return
        }
        screen.elements.pauseMenu = new Set()
        status.paused = false
    }

    updatePhysics() {
        for (const gameObject of this.objects) {
            if (gameObject.runScript) {
                gameObject.runScript()
            }
            if (gameObject.updatePhysics) {
                gameObject.updatePhysics(this)
            }
        }
    }
}
