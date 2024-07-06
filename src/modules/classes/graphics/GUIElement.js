const Coordinate2D = require('../math/Coordinate2D.js')
const GUIObject = require('./GUIObject.js')
const Screen = require('./Screen.js')

module.exports = class GUIElement extends GUIObject {
    constructor(screen) {
        // screen: Screen

        if (!(screen instanceof Screen)) {
            throw new Error('Screen expected')
        }

        const ScaleOffsetPair = require('../math/ScaleOffsetPair.js')
        super()
        Object.assign(this, {
            color: '#000000',
            // compositeOperation: 'source-over',
            drawType: 'fill', // "fill", "stroke" (outline only)
            opacity: 1,
            parent: null,
            position: new ScaleOffsetPair(),
            priority: 1,
            rotation: 0, // rotation relative to parent (in radians)
            screen,
            size: new ScaleOffsetPair(),
            visible: true
        })
    }

    draw(game) {
        const { children } = this
        if (!children) {
            return
        }
        for (const child of children) {
            child.draw(game)
        }
    }

    getAbsolutePosition({ camera }) /* does not account for offset */ {
        const { parent, position, screen } = this
        if (!(parent instanceof GUIElement)) {
            let absolutePosition
            if (parent instanceof Screen) {
                absolutePosition = parent.getPosition().plus(position.offset)
                // translate according to position of this
            } else {
                const screenSize = screen.getSize()
                absolutePosition = parent.position.minus(camera.getPosition())
                absolutePosition.x +=
                    Math.round(parent.size.x * position.scale.x) +
                    screenSize.x / 2
                absolutePosition.y =
                    (absolutePosition.y + parent.size.y) * -1 +
                    Math.round(parent.size.y * position.scale.y) +
                    screenSize.y / 2
            }
            return absolutePosition
        }
        const absolutePosition = new Coordinate2D()
        const parentSize = parent.getAbsoluteSize()
        absolutePosition.x = parentSize.x * position.scale.x + position.offset.x
        absolutePosition.y = parentSize.y * position.scale.y + position.offset.y
        return absolutePosition
    }

    getAbsoluteSize() {
        const { parent, screen, size } = this
        if (!(parent instanceof GUIElement)) {
            let absoluteSize
            const Screen = require('./Screen.js')
            if (parent instanceof Screen) {
                absoluteSize = screen.getSize()
            } else {
                absoluteSize = parent.size
            }
            absoluteSize = absoluteSize.times(size.scale).plus(size.offset)
            return absoluteSize
        }
        const parentSize = parent.getAbsoluteSize()
        return parentSize.times(size.scale).plus(size.offset)
    }

    isVisible() {
        if (!(this.parent instanceof GUIElement)) {
            return this.visible
        }
        return this.visible && this.parent.isVisible()
    }

    prepareContext(game) /* define compositeOperation */ {
        const { context } = this.screen
        context.save()
        context[`${this.drawType}Style`] = this.color
        context.globalAlpha = this.opacity
        // compositeOperation
        context.translate(...Object.values(this.getAbsolutePosition(game)))
    }
}
