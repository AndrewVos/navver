/* globals Navver, Reset, ElementFinder */

class KeyboardNavigator {
  constructor () {
    this.tags = []
  }

  activationKey () {
    return 'f'
  }

  activate () {
    this.boundHandleKeyDown = this.handleKeyDown.bind(this)
    document.addEventListener('keydown', this.boundHandleKeyDown)
    this.keysPressed = ''
    this.createTags()
  }

  destroy () {
    document.removeEventListener('keydown', this.boundHandleKeyDown)
    this.removeAllTags()
  }

  handleKeyDown (e) {
    if (this.tags.length !== 0) {
      this.keysPressed += e.key
      this.search(this.keysPressed)
      return true
    }

    return false
  }

  search (search) {
    for (var i = 0; i < this.tags.length; i++) {
      var tag = this.tags[i]

      if (tag.label === search) {
        this.removeAllTags()
        tag.click()
        return
      } else if (tag.label[0] === search) {
        tag.highlight(search)
      } else {
        tag.remove()
        this.tags.splice(i, 1)
        i--
      }
    }
  }

  removeAllTags () {
    for (var i = 0; i < this.tags.length; i++) {
      var tag = this.tags[i]
      tag.remove()
    }
    this.tags = []
  }

  createTags () {
    var labelGenerator = new LabelGenerator()

    var elements = ElementFinder.all()
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      this.tags.push(new Tag(labelGenerator.next(), element))
    }
  }
}

class Tag {
  constructor (label, element) {
    this.label = label
    this.element = element
    this.build()
  }

  remove () {
    this.tag.remove()
  }

  click () {
    this.element.click()
  }

  highlight (search) {
    if (search === this.label) {
      this.tag.innerHTML = '<strong>' + this.label + '</strong>'
    } else if (search === this.label[0]) {
      this.tag.innerHTML = '<strong>' + this.label[0] + '</strong>' + this.label[1]
    }
  }

  build () {
    this.tag = Reset.resetElement(document.createElement('div'))

    var elementRectangle = this.element.getBoundingClientRect()
    var elementOffset = {
      top: elementRectangle.top + document.body.scrollTop,
      left: elementRectangle.left + document.body.scrollLeft
    }

    this.tag.classList.add('Navver-tag')
    this.tag.textContent = this.label
    this.tag.style.position = 'absolute'
    this.tag.style.top = elementOffset.top + 'px'
    this.tag.style.left = elementOffset.left + 'px'
    this.tag.style.background = 'yellow'
    this.tag.style.border = '1px solid #333'
    this.tag.style.borderRadius = '3px'
    this.tag.style.zIndex = 10000000000
    document.body.appendChild(this.tag)
  }
}

class LabelGenerator {
  constructor () {
    this.labels = this.generateLabels()
    this.index = 0
  }

  next () {
    var label = this.labels[this.index]
    this.index += 1
    return label
  }

  generateLabels () {
    var characters = 'abcdefghijklmnopqrstuvwxyz'
    var labels = []
    for (var i = 0; i < characters.length; i++) {
      for (var p = 0; p < characters.length; p++) {
        labels.push(characters[i] + characters[p])
      }
    }
    return labels
  }
}

Navver.addNavigator(new KeyboardNavigator())
