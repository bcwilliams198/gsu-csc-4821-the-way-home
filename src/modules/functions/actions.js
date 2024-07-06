module.exports = {
    attack: function (character) { },
    crouch: function (character) {
        const { animationData } = character
        if (animationData.states.crouching) {
            character.setState('crouching')
        } else {
            character.setState('crouch')
        }
    },
    jump: function (character) {
        character.setState('jumpsquat')
    },
    move: function (character, direction) /* complete? */ {
        const { animationData, collisionBox, sprite, state } = character
        const ignoreStates = [
            'crouch',
            'crouching',
            'dead',
            'dying',
            'idle_special'
        ]
        if (ignoreStates.includes(state)) {
            return
        }
        // first frame of move: don't actually move, just turn around
        if (sprite.orientation !== direction) {
            character.face(direction)
            return
        }
        const accelMagnitude = 1
        const { acceleration, velocity } = collisionBox
        acceleration.x = accelMagnitude * (direction === 'left') ? -1 : 1
        if (
            Math.abs(velocity.x) === animationData.maxSpeed.x &&
            Math.sign(velocity.x) === Math.sign(acceleration.x)
        ) {
            acceleration.x = 0
        }
        if (state === 'idle') {
            character.setState('dash')
        }
    },
    special: function (character) {
        const { cooldowns, game, sprite, state } = character
        const { orientation } = sprite
        if (cooldowns.shooting != null) {
            return
        }
        const special_state = `${state}_special`
        if (character.animationData.states[special_state]) {
            character.setState(special_state)
            return
        }
        cooldowns.shooting = 25
        const Projectile = require('../classes/game_objects/Projectile.js')
        const projectile = new Projectile(game, character)
        projectile.setSize(20, 10)
        const { position, size } = projectile.collisionBox
        const characterPos = character.getPosition()
        const xDisplacement = 50
        projectile.sprite.orientation = orientation
        position.x = characterPos.x
        if (orientation === 'left') {
            position.x -= xDisplacement + size.x
        } else {
            position.x += xDisplacement + character.getSize().x
        }
        position.y = characterPos.y + 40

        const speed = 12
        projectile.setVelocity(speed * (orientation === 'left' ? -1 : 1), 0)
        projectile.damage = 1
        game.addObject(projectile)
        setTimeout(() => {
            game.removeObject(projectile)
        }, 3000)
        const sound = game.assets.audio.sfx['gunshot.wav']
        sound.currentTime = 0
        sound.play()
    }
}
