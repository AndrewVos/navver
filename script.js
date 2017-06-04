class KeyboardNavver {
  constructor () {
    this.tags = []
  }

  consume (e) {
    if (this.shouldLaunchNavver(e)) {
      this.createTags()
      this.keysPressed = ''
      return true
    }

    if (this.tags.length !== 0) {
      this.keysPressed += e.key
      this.search(this.keysPressed)
      return true
    }

    return false
  }

  shouldLaunchNavver (e) {
    return e.code === 'KeyG' &&
      e.srcElement.tagName !== 'INPUT' &&
      this.tags.length === 0
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

    var elements = this.findClickableElements()
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      this.tags.push(new Tag(labelGenerator.next(), element))
    }
  }

  findClickableElements () {
    var elements = this.findElements('a', 'button')
    var visibleElements = []
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      if (this.isScrolledIntoView(element)) {
        visibleElements.push(element)
      }
    }
    return visibleElements
  }

  findElements () {
    var elements = []
    for (var i = 0; i < arguments.length; i++) {
      elements = elements.concat(
        Array.prototype.slice.call(document.getElementsByTagName(arguments[i]))
      )
    }
    return elements
  }

  isScrolledIntoView (element) {
    var viewportTop = document.body.scrollTop
    var viewportBottom = viewportTop + window.innerHeight

    var elementRectangle = element.getBoundingClientRect()
    var top = elementRectangle.top + document.body.scrollTop
    var height = element.clientHeight
    var bottom = top + height

    return ((bottom <= viewportBottom) && (top >= viewportTop))
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
    this.tag = document.createElement('div')

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

class ScrollNavver {
  consume (e) {
    if (e.key === 'j') {
      window.scrollBy(0, 50)
      return true
    } else if (e.key === 'k') {
      window.scrollBy(0, -50)
      return true
    }

    return false
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

class Navver {
  constructor () {
    this.consumers = [
      new KeyboardNavver(),
      new ScrollNavver()
    ]
  }

  handleKeyboardEvent (e) {
    for (var i = 0; i < this.consumers.length; i++) {
      if (this.consumers[i].consume(e)) {
        return false
      }
    }
  }
}

var navver = new Navver()
document.onkeydown = navver.handleKeyboardEvent.bind(navver)
