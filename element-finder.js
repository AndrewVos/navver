window.ElementFinder = class ElementFinder {
  static all () {
    var elements = this.findClickableElements()
    var visibleElements = []
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      if (this.isValid(element)) {
        visibleElements.push(element)
      }
    }
    return visibleElements
  }

  static isValid(element) {
    return this.isVisible(element) &&
      this.isScrolledIntoView(element) &&
      !element.classList.contains('Navver')
  }

  static isVisible (element) {
    var rectangle = element.getBoundingClientRect()
    if (rectangle.height <= 0 || rectangle.width <= 0) {
      return false
    }

    var style = window.getComputedStyle(element)
    if (style.display === 'none') {
      return false
    }

    return true
  }

  static findClickableElements () {
    var tags = ['a', 'button', 'input']
    var elements = []
    for (var i = 0; i < tags.length; i++) {
      elements = elements.concat(
        Array.prototype.slice.call(document.getElementsByTagName(tags[i]))
      )
    }
    return elements
  }

  static isScrolledIntoView (element) {
    var viewportTop = document.body.scrollTop
    var viewportBottom = viewportTop + window.innerHeight

    var elementRectangle = element.getBoundingClientRect()
    var top = elementRectangle.top + viewportTop
    var height = element.clientHeight
    var bottom = top + height

    return ((bottom <= viewportBottom) && (top >= viewportTop))
  }
}
