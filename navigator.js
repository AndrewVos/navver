/* globals NavigatorInput, Element */

window.Navigator = class Navigator {
  constructor (onHide) {
    this.onHide = onHide
    this.input = new NavigatorInput(
      this.handleKeyDown.bind(this),
      this.handleInput.bind(this)
    )
    this.search()
  }

  static activationKey () {
    return 'f'
  }

  hide () {
    this.destroyElements()
    this.input.remove()
    this.onHide()
  }

  handleInput (e) {
    this.search()
  }

  destroyElements () {
    if (this.elements) {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].destroy()
      }
    }
    this.elements = []
    this.focusedElement = 0
  }

  search () {
    this.destroyElements()
    var search = this.input.value().toLowerCase()

    var actionable = Element.actionable()
    this.elements = []
    for (var i = 0; i < actionable.length; i++) {
      var element = actionable[i]
      if (element.match(search)) {
        element.show()
        this.elements.push(element)
      }
    }

    this.renderFocusedElement()
  }

  elementOffset (element) {
    var elementRectangle = element.getBoundingClientRect()
    return {
      top: elementRectangle.top + document.body.scrollTop,
      left: elementRectangle.left + document.body.scrollLeft
    }
  }

  selectPreviousElement () {
    this.focusedElement -= 1

    if (this.focusedElement === -1) {
      this.focusedElement = this.elements.length - 1
    }

    this.renderFocusedElement()
  }

  selectNextElement () {
    this.focusedElement += 1
    if (this.focusedElement === this.elements.length) {
      this.focusedElement = 0
    }

    this.renderFocusedElement()
  }

  renderFocusedElement () {
    for (var i = 0; i < this.elements.length; i++) {
      if (i === this.focusedElement) {
        this.elements[i].focus()
      } else {
        this.elements[i].unfocus()
      }
    }
  }

  focused () {
    return this.elements[this.focusedElement]
  }

  handleKeyDown (e) {
    if (e.key === 'Escape') {
      this.hide()
      return false
    } else if (e.key === 'Tab') {
      if (e.shiftKey) {
        this.elements.selectPreviousElement()
      } else {
        this.elements.selectNextElement()
      }
      return false
    } else if (e.key === 'Enter') {
      var focused = this.focused()
      if (focused) {
        this.hide()
        focused.action({shift: e.shiftKey})
      }
      return false
    }
  }
}
