module.exports = class GUIObject {
    constructor() {
        Object.assign(this, {
            children: new Set()
        })
    }

    addChild(child) {
        // child: GUIElement
        const GUIElement = require('./GUIElement.js')
        if (!(child instanceof GUIElement)) {
            throw new Error('GUIElement expected')
        }

        if (child.parent !== null) {
            child.parent.removeChild(child)
        }

        this.children.add(child)
        child.parent = this
    }

    removeChild(child) /* complete? */ {
        // child: GUI element
        const GUIElement = require('./GUIElement.js')
        if (!(child instanceof GUIElement)) {
            throw new Error('GUI element expected')
        }

        if (!this.children.has(child)) {
            throw new Error('Child not found')
        }
        this.children.delete(child)
        child.parent = null
    }
}
