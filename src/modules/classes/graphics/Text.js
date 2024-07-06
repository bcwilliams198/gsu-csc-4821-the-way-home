let GUIElement = require('./GUIElement.js')

module.exports = class Text extends GUIElement {
    constructor(screen) {
        super(screen)
        delete this.children
        delete this.addChild
        delete this.removeChild
        Object.assign(this, {
            content: '',
            font: 'sans-serif',
            fontSize: 10,
            type: 'regular'
        })
    }

    getAbsoluteSize() {
        const { content, font, fontSize, screen, type } = this
        const { context } = screen
        context.save()
        context.font = `${fontSize}px ${font}`
        const metrics = {
            regular: context.measureText(content),
            dialog: context.measureText(
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()`~-_=+[{]}\\|;:\'",<.>/?'
            ) // long string
        }
        const { actualBoundingBoxAscent, actualBoundingBoxDescent } = metrics[
            type
        ]
        context.restore()
        return {
            x: metrics.regular.width,
            y: actualBoundingBoxAscent + actualBoundingBoxDescent
        }
    }

    draw(game) {
        const { drawType, font, fontSize, screen } = this
        const { context } = screen
        this.prepareContext(game)
        context.font = `${fontSize}px ${font}`
        const size = this.getAbsoluteSize()
        context[`${drawType}Text`](this.content, 0, Math.floor(size.y))
        context.restore()
    }
}
