class KeyboardNavver {
  constructor() {
    this.tags = []
  }

  consume(e) {
    if (this.shouldLaunchNavver(e)) {
      this.createTags()
      this.keysPressed = ''
      return true
    }
    if (this.tags.length != 0) {
      this.keysPressed += e.key
      this.search(this.keysPressed)
      return true
    }

    return false
  }

  shouldLaunchNavver(e) {
    return e.code == 'KeyG' &&
      e.srcElement.tagName != 'INPUT' &&
      this.tags.length == 0
  }

  search(search) {
    for (var i = 0; i < this.tags.length; i++) {
      var tag = this.tags[i]

      if (tag.label == search) {
        this.removeAllTags()
        tag.click()
        return
      } else if (tag.label[0] == search) {
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
    var labelIndex = 0
    var labels = this.generateLabels()

    var elements = $('a, button')
    for (var i = 0; i < elements.length; i++) {
      var label = labels[labelIndex]
      var element = elements[i]
      this.tags.push(new Tag(label, element))
      labelIndex += 1
    }
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

class Tag {
  constructor(label, element) {
    this.label = label
    this.element = element
    this.build()
  }

  remove() {
    this.$tag.remove()
  }

  click() {
    this.element.click()
  }

  highlight(search) {
    if (search == this.label) {
      this.$tag.html("<strong>" + this.label + "</strong>")
    } else if (search == this.label[0]) {
      this.$tag.html("<strong>" + this.label[0] + "</strong>" + this.label[1])
    }
  }

  build() {
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
  consume(e) {
    if (e.key == 'j') {
      window.scrollBy(0,50)
      return true
    } else if (e.key == 'k') {
      window.scrollBy(0,-50)
      return true
    }

    return false
  }
}

class Navver {
  constructor() {
    this.consumers = [
      new KeyboardNavver,
      new ScrollNavver
    ]
    document.onkeydown = this.handleKeyboardEvent.bind(this)
  }

  handleKeyboardEvent(e) {
    for (var i = 0; i < this.consumers.length; i++) {
      if (this.consumers[i].consume(e)) {
        return false
      }
    }
  }
}

new Navver
