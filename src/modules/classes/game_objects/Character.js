const GameObject = require('./GameObject.js')
const inputPriority = require('../../data/misc/inputPriority.js')

module.exports = class Character extends GameObject {
    constructor(game, characterClass, script) {
        // characterClass: string
        // script: function
        super(game)
        if (typeof characterClass !== 'string') {
            throw new Error('String expected')
        }
        if (script != null && typeof script !== 'function') {
            throw new Error('Function expected')
        }

        const AnimatedSprite = require('../graphics/AnimatedSprite.js')
        // const AnimatedSprite = game.modules.classes.graphics.AnimatedSprite
        Object.assign(this, {
            actions: require('../../functions/actions.js'),
            activeInputs: new Set(),
            animationData: require(`../../data/animations/${characterClass}.js`),
            characterClass,
            cooldowns: {},
            currentFrame: 0,
            health: 8,
            lastFrame: 0,
            maxHealth: 8,
            runScript: script,
            sprite: new AnimatedSprite(game.screen),
            state: null
        })
        this.prepareSprite()
        this.setAcceleration(0, -1)
    }

    checkStoppedDashing() {
        const { acceleration, velocity } = this.collisionBox
        if (Math.abs(velocity.x) === 0 && Math.abs(acceleration.x) === 0) {
            this.setState('idle')
        }
    }

    face(direction) /* complete? */ {
        this.sprite.orientation = direction
    }

    getStateData() /* complete */ {
        const { animationData, state } = this
        return animationData.states[state]
    }

    setState(newState) /* not complete */ {
        const { animationData, characterClass, game, sprite } = this
        if (this.state) {
            const oldFrameData = animationData.states[this.state].frameData
            for (const frameNumber in oldFrameData) {
                delete this[`frame${frameNumber}`]
            }
        }
        this.state = newState
        const stateData = this.getStateData()
        let sourceSize =
            stateData.sourceSpriteSize || animationData.sourceSpriteSize
        // frame data
        this.currentFrame = 0
        for (const [frameNumber, method] of Object.entries(
            stateData.frameData
        )) {
            this[`frame${frameNumber}`] = method
        }
        // sprite data
        sprite.image =
            game.assets.images.game_objects.character_classes[characterClass][
            `${this.state}.png`
            ]
        sprite.sWidth = sourceSize.x
        sprite.sHeight = sourceSize.y
    }

    takeDamage(damage) {
        const { animationData, cooldowns, game, state } = this
        const { assets, players } = game
        const player = players[0]
        const ignoreStates = ['dead', 'dying', 'hitstun']
        if (ignoreStates.includes(state)) {
            return
        }
        this.health -= damage
        const nextState = this.health > 0 ? 'hitstun' : 'dying'
        let hitSound
        if (this === player.character) {
            hitSound = assets.audio.sfx['playerdamaged.wav']
            game.screen.healthBar.current.size.scale.x =
                this.health / this.maxHealth
        } else {
            hitSound = assets.audio.sfx['enemydamaged.wav']
        }
        hitSound.currentTime = 0
        hitSound.play()
        if (nextState === 'dying') {
            delete this.runScript
            this.flashing = true
            setTimeout(() => {
                game.removeObject(this)
                if (this === player.character) {
                    player.character = null
                    const sound = assets.audio.sfx['death.wav']
                    sound.currentTime = 0
                    sound.play()
                    setTimeout(() => {
                        game.currentLevel.play()
                    }, 1500)
                }
            }, 2000)
        }
        if (animationData.states[nextState]) {
            this.setState(nextState)
        } else if (nextState === 'dying') {
            this.setState('dead')
        }
        if (this.state === 'hitstun') {
            cooldowns.intangibility = 120
            this.flashing = true
        }
    }

    updateFrame() /* complete? */ {
        const { cooldowns, sprite } = this
        const stateData = this.getStateData()
        this.currentFrame++
        if (this.currentFrame > stateData.lastFrame) {
            this.currentFrame = 1
        }
        for (const type in cooldowns) {
            cooldowns[type]--
            if (cooldowns[type] === 0) {
                delete cooldowns[type]
                if (type === 'intangibility') {
                    this.flashing = false
                    sprite.opacity = 1
                }
            }
        }

        if (this.flashing) {
            const opacity = sprite.opacity === 1 ? 0.5 : 1
            sprite.opacity = opacity
        }

        const updateOnCurrentFrame = `frame${this.currentFrame}`
        if (this[updateOnCurrentFrame]) {
            this[updateOnCurrentFrame]()
        }
    }

    updatePhysics() {
        const { collisionBox } = this
        const { acceleration, velocity } = collisionBox
        this.updateState()
        this.updateFrame()
        // update position
        let nextPosition = this.getNextPosition()
        const collisions = this.getCollisions()

        const Platform = require('./Platform.js')
        const Projectile = require('./Projectile.js')
        for (const gameObject of collisions) {
            if (
                gameObject instanceof Character ||
                gameObject instanceof Projectile
            ) {
                continue
            }
            const other = gameObject.collisionBox
            if (gameObject instanceof Platform) {
                if (!collisionBox.overlapsTop(other)) {
                    continue
                }
            }
            const groundState = Math.abs(velocity.x) > 0 ? 'dash' : 'idle'
            if (collisionBox.overlapsTop(other)) {
                velocity.y = 0
                const transitionStates = ['freefall', 'freefall_special']
                if (transitionStates.includes(this.state)) {
                    this.setState(groundState)
                }
            }
            nextPosition = collisionBox.getClosestPosition(other)
        }
        const nonTransitionStates = [
            'dead',
            'dying',
            'freefall',
            'freefall_special',
            'hitstun'
        ]
        if (
            (nextPosition.equals(this.getNextPosition()) || velocity.y > 0) &&
            !nonTransitionStates.includes(this.state)
        ) {
            this.setState('freefall')
        }
        // update motion
        collisionBox.velocity = velocity.plus(acceleration)
        collisionBox.position = nextPosition
        // vertical
        if (collisionBox.velocity.y < this.animationData.maxSpeed.y * -1) {
            collisionBox.velocity.y = this.animationData.maxSpeed.y * -1
        }
        // horizontal
        acceleration.x = Math.sign(collisionBox.velocity.x) * -1
    }

    updateState() /* complete? */ {
        // handling inputs
        const { activeInputs, state } = this

        // horizontal movement
        const directionInputs = ['left', 'right']
        for (const input of directionInputs) {
            if (activeInputs.has(input)) {
                this.actions.move(this, input)
            }
        }
        // letting go of crouch
        if (
            (state === 'crouch' || state === 'crouching') &&
            !activeInputs.has('crouch')
        ) {
            this.setState('idle')
        }
        for (const input of inputPriority[state]) {
            if (activeInputs.has(input)) {
                this.actions[input](this)
                break
            }
        }
    }
}
