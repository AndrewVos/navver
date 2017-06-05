/* globals Navver, ElementFinder, Reset */

class SearchNavver {
  constructor () {
    this.enabled = false
    this.keysPressed = ''
    this.matchedElements = []
    this.focusedElement = 0
  }

  consume (e) {
    if (!this.enabled && e.key === '/') {
      this.createInput()
      return true
    }

    return false
  }

  createInput () {
    this.container = Reset.resetElement(document.createElement('div'))
    this.container.classList.add('Navver-search-input')
    this.container.style.position = 'fixed'
    this.container.style.bottom = '10px'
    this.container.style.left = '10px'
    this.container.style.right = '10px'
    this.container.style.borderRadius = '5px'
    this.container.style.backgroundColor = '#373b41'
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

  destroy () {
    this.resetMatchedElements()
    this.container.remove()
  }

  handleInput (e) {
    this.resetMatchedElements()

    var search = this.input.value.toLowerCase()
    var elements = ElementFinder.findElements()
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      var index = element.textContent.toLowerCase().indexOf(search)

      if (search && search !== '' && index !== -1) {
        this.matchedElements.push(element)
      }
    }

    this.renderMatchedElements()
  }

  resetMatchedElements () {
    for (var i = 0; i < this.matchedElements.length; i++) {
      var element = this.matchedElements[i]
      element.style.backgroundColor = element.getAttribute('data-navver-old-background-color')
    }
    this.focusedElement = 0
    this.matchedElements = []
  }

  selectNextElement () {
    this.focusedElement += 1
    if (this.focusedElement === this.matchedElements.length) {
      this.focusedElement = 0
    }

    this.renderMatchedElements()
  }

  renderMatchedElements () {
    for (var i = 0; i < this.matchedElements.length; i++) {
      var element = this.matchedElements[i]
      if (!element.hasAttribute('data-navver-old-background-color')) {
        element.setAttribute('data-navver-old-background-color', element.style.backgroundColor)
      }

      if (i === this.focusedElement) {
        element.style.backgroundColor = 'green'
        window.scroll(0, this.elementOffset(element).top)
      } else {
        element.style.backgroundColor = 'yellow'
      }
    }
  }

  elementOffset (element) {
    var elementRectangle = element.getBoundingClientRect()
    return {
      top: elementRectangle.top + document.body.scrollTop,
      left: elementRectangle.left + document.body.scrollLeft
    }
  }

  clickFocusedElement () {
    var element = this.matchedElements[this.focusedElement]
    this.destroy()
    if (element) {
      element.click()
    }
  }

  handleKeyDown (e) {
    if (e.key === 'Escape') {
      this.destroy()
      return false
    } else if (e.key === 'Tab') {
      this.selectNextElement()
      return false
    } else if (e.key === 'Enter') {
      this.clickFocusedElement()
      return false
    }
  }
}

Navver.addKeyboardConsumer(new SearchNavver())
