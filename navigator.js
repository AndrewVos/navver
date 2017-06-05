/* globals Navver, ElementFinder, Reset */

class Navigator {
  show () {
    this.createInput()
    this.search()
  }

  createInput () {
    this.container = Reset.resetElement(document.createElement('div'))
    this.container.style.position = 'fixed'
    this.container.style.bottom = '10px'
    this.container.style.left = '10px'
    this.container.style.right = '10px'
    this.container.style.borderRadius = '5px'
    this.container.style.backgroundColor = '#373b41'
    this.container.style.zIndex = 1000000
    document.body.appendChild(this.container)

    this.input = Reset.resetElement(document.createElement('input'))
    this.input.style.fontSize = '30px'
    this.input.style.marginTop = '10px'
    this.input.style.marginBottom = '10px'
    this.input.style.marginLeft = '10px'
    this.input.style.width = '-webkit-calc(100% - 20px)'
    this.input.style.background = 'transparent'
    this.input.style.color = 'white'
    this.input.style.border = 'none'
    this.input.style.outline = 'none'
    this.container.appendChild(this.input)

    this.input.onkeydown = this.handleKeyDown.bind(this)
    this.input.oninput = this.handleInput.bind(this)

    this.input.focus()
  }

  hide () {
    if (this.elements) {
      this.elements.destroy()
    }
    this.container.remove()
    this.container = null
  }

  handleInput (e) {
    this.search()
  }

  search () {
    if (this.elements) {
      this.elements.destroy()
    }
    var search = this.input.value.toLowerCase()
    this.elements = new VisibleElementList(search)
  }

  elementOffset (element) {
    var elementRectangle = element.getBoundingClientRect()
    return {
      top: elementRectangle.top + document.body.scrollTop,
      left: elementRectangle.left + document.body.scrollLeft
    }
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
      var focused = this.elements.focused()
      if (focused) {
        this.elements.destroy()
        this.hide()
        focused.click()
      }
      return false
    }
  }
}

class VisibleElementList {
  constructor (search) {
    this.focusedElement = 0

    var elements = ElementFinder.all()
    var labelGenerator = new LabelGenerator()
    this.elements = []

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      var label = labelGenerator.next()
      if (this.match(element, label, search)) {
        var visibleElement = new VisibleElement(element, label)
        this.elements.push(visibleElement)
      }
    }

    this.renderFocusedElement()
  }

  match (element, label, search) {
    search = search.toLowerCase()
    return search == '' ||
      element.textContent.toLowerCase().indexOf(search) != -1 ||
      label.indexOf(search) != -1
  }

  focused () {
    return this.elements[this.focusedElement]
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

  destroy () {
    for (var i = 0; i < this.elements.length; i++) {
      var element = this.elements[i]
      element.destroy()
    }
    this.focusedElement = 0
    this.elements = []
  }

}

class VisibleElement {
  constructor (element, label) {
    this.element = element
    this.label = label
    this.oldStyle = this.element.getAttribute('style')
    this.buildTag()
  }

  buildTag() {
    this.tag = Reset.resetElement(document.createElement('div'))

    var elementRectangle = this.element.getBoundingClientRect()
    var elementOffset = {
      top: elementRectangle.top + document.body.scrollTop,
      left: elementRectangle.left + document.body.scrollLeft
    }

    var tagWidth = 20
    this.tag.textContent = this.label
    this.tag.style.position = 'absolute'
    this.tag.style.textAlign = 'center'
    this.tag.style.width = tagWidth + 'px'
    this.tag.style.top = elementOffset.top + 'px'
    this.tag.style.left = (elementOffset.left - tagWidth) + 'px'
    this.tag.style.backgroundColor = '#d9534f'
    this.tag.style.color = 'white'
    this.tag.style.borderTopLeftRadius = '3px'
    this.tag.style.borderTopRightRadius = '3px'
    document.body.appendChild(this.tag)
  }

  focus () {
    this.element.style.backgroundColor = 'green'
    this.element.style.color = 'white'
  }

  unfocus () {
    this.element.style.backgroundColor = 'yellow'
    this.element.style.color = 'black'
  }

  click () {
    this.element.click()
  }

  destroy () {
    this.element.setAttribute('style', this.oldStyle)
    this.tag.remove()
  }
}
