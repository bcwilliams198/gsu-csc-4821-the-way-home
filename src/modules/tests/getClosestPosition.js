module.exports = function () {
    const context = document.querySelector('#gameCanvas').getContext('2d')
    const GameObject = require('/src/modules/classes/game_objects/GameObject.js')
    const obj1 = new GameObject()
    const cb1 = obj1.collisionBox
    cb1.size.x = 100
    cb1.size.y = 50
    const obj2 = new GameObject()
    const cb2 = obj2.collisionBox
    cb2.position.x = 108
    cb2.position.y = 12
    cb2.size.x = 30
    cb2.size.y = 50
    context.globalAlpha = 0.5
    // Red: obj1
    context.fillStyle = 'red'
    context.fillRect(...Object.values(cb1.position), ...Object.values(cb1.size))
    // Blue: obj2 original position
    context.fillStyle = 'blue'
    context.fillRect(...Object.values(cb2.position), ...Object.values(cb2.size))
    cb2.velocity.x = -20
    cb2.velocity.y = 22
    // Yellow: obj2 attempted position
    context.fillStyle = 'yellow'
    context.fillRect(cb2.position.x + cb2.velocity.x, cb2.position.y + cb2.velocity.y, ...Object.values(cb2.size))
    obj2.updatePhysics(new Set([obj1, obj2]))
    // Green: obj2 "as close as possible" position
    context.fillStyle = 'green'
    // console.log(cb2.position)
    context.fillRect(...Object.values(cb2.position), ...Object.values(cb2.size))
}