const GameObject = require('../classes/game_objects/GameObject.js')
//const Level = require('../classes/game_objects/Level')
module.exports = function () {
    console.log('Testing falling objects')
    const canvas = document.querySelector('#gameCanvas')
    const context = canvas.getContext('2d')
    const objects = new Set()
    const ground = new GameObject()
    //const testLevel = new Level()
    //testLevel.background.src = '../assets/images/Levels/Level1.png'
    ground.setSize(180, 10)
    ground.setPosition(0, 380)
    objects.add(ground)
    const fallingObj = new GameObject()
    fallingObj.setSize(20, 20)
    fallingObj.setPosition(30, 200)
    // fallingObj.setAcceleration(0, 0.3)
    fallingObj.setVelocity(0, 3)
    setTimeout(() => {
        fallingObj.setAcceleration(0, 0)
    }, 300)
    requestAnimationFrame(function processRequestedFrame() {
        fallingObj.updatePhysics(objects)
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        context.save()
        context.globalAlpha = 0.75
        context.fillStyle = 'green'
        context.fillRect(
            ...Object.values(ground.getPosition()),
            ...Object.values(ground.getSize())
        )
        context.restore()
        context.save()
        context.globalAlpha = 0.5
        context.fillStyle = 'orange'
        context.fillRect(
            ...Object.values(fallingObj.getPosition()),
            ...Object.values(fallingObj.getSize())
        )
        requestAnimationFrame(processRequestedFrame)
    })
}
