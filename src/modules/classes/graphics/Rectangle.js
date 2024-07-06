const GUIElement = require('./GUIElement.js')

module.exports = class Rectangle extends GUIElement {
    constructor(screen) {
        super(screen)
        Object.assign(this, {})
    }

    draw(game) {
        const size = this.getAbsoluteSize()
        const { context } = this.screen
        this.prepareContext(game)
        context[`${this.drawType}Rect`](0, 0, ...Object.values(size))
        context.restore()
        super.draw(game)
    }
}
