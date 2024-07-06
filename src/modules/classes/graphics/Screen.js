const Coordinate2D = require('../math/Coordinate2D.js')
const GUIObject = require('./GUIObject.js')

module.exports = class Screen extends GUIObject {
    constructor(game, canvas) /* complete? */ {
        // game: Game
        // canvas: HTML5CanvasElement
        super()
        if (String(canvas) !== '[object HTMLCanvasElement]') {
            throw new Error('HTMLCanvasElement expected')
        }

        Object.assign(this, {
            canvas,
            // collisionBoxesOn: false, // change later
            context: canvas.getContext('2d'),
            elements: {},
            game
        })

        this.initializeElements()
    }

    drawNextFrame() /* complete? */ {
        // console.log('Drawing next frame')
        const { canvas, context, elements, game } = this
        const { clientWidth, clientHeight } = canvas
        context.clearRect(0, 0, clientWidth / 2, clientHeight / 2)
        for (const layer of Object.values(elements)) {
            for (const element of layer) {
                // console.log(element)
                element.draw(game)
            }
        }
    }

    getPosition() /* complete? */ {
        return new Coordinate2D()
    }

    getSize() /* complete? */ {
        const { clientWidth, clientHeight } = this.canvas
        return new Coordinate2D(clientWidth, clientHeight)
    }

    initializeElements() /* complete */ {
        const { elements } = this
        const layers = [
            'background',
            'gameObjects',
            'collisionBoxes',
            'GUI',
            'pauseMenu'
        ]
        for (const layer of layers) {
            elements[layer] = new Set()
        }
    }
}
