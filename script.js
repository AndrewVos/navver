/* globals $ */

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
  }

  createTags () {
    var labelGenerator = new LabelGenerator()

    var elements = this.findElements()
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      this.tags.push(new Tag(labelGenerator.next(), element))
    }
  }

  findElements () {
    var elements = $('a, button')
    var visibleElements = []
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      if (this.isScrolledIntoView(element)) {
        visibleElements.push(element)
      }
    }
    return visibleElements
  }

  isScrolledIntoView (element) {
    var docViewTop = $(window).scrollTop()
    var docViewBottom = docViewTop + window.innerHeight

    var top = $(element).offset().top
    var bottom = top + $(element).height()

    return ((bottom <= docViewBottom) && (top >= docViewTop))
  }
}

class Tag {
  constructor (label, element) {
    this.label = label
    this.element = element
    this.build()
  }

  remove () {
    this.$tag.remove()
  }

  click () {
    this.element.click()
  }

  highlight (search) {
    if (search === this.label) {
      this.$tag.html('<strong>' + this.label + '</strong>')
    } else if (search === this.label[0]) {
      this.$tag.html('<strong>' + this.label[0] + '</strong>' + this.label[1])
    }
  }

  build () {
    this.$tag = $('<div class="navver-tag">' + this.label + '</div>')
    this.$tag
      .css('position', 'absolute')
      .css('top', $(this.element).offset().top)
      .css('left', $(this.element).offset().left)
      .css('background', 'yellow')
      .css('border', '1px solid #333')
      .css('border-radius', '3px')
      .css('z-index', 10000000000)
    $('body').append(this.$tag)
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
