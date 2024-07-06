const GameObject = require('../classes/game_objects/GameObject.js')
const Projectile = require('../classes/game_objects/Projectile.js')

module.exports = function () {
    const canvas = document.querySelector('#gameCanvas')
    const context = canvas.getContext('2d')
    const gameObjects = new Set()
    const wall = new GameObject()
    wall.setSize(30, 100)
    wall.setPosition(300, 0)
    const projectile = new Projectile()
    projectile.setSize(4, 4)
    projectile.setVelocity(2, 0)
    gameObjects.add(wall)
    gameObjects.add(projectile)
    requestAnimationFrame(function processRequestedFrame() {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        for (const gameObject of gameObjects) {
            if (gameObject === projectile) {
                gameObject.updatePhysics(gameObjects)
                context.fillRect(...Object.values(projectile.getPosition()), ...Object.values(projectile.getSize()))
            }
        }
        // console.log('Hi')
        requestAnimationFrame(processRequestedFrame)
    })
    // console.log(projectile.getCollisions(gameObjects).size)
}