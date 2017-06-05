class ElementFinder {
  static all () {
    var elements = this.findClickableElements()
    var visibleElements = []
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      if (this.isVisible(element) && this.isScrolledIntoView(element)) {
        visibleElements.push(element)
      }
    }
    return visibleElements
  }

  static isVisible (element) {
    var style = window.getComputedStyle(element)
    return (style.display !== 'none')
  }

  static findClickableElements () {
    var tags = ['a', 'button']
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
    var top = elementRectangle.top + document.body.scrollTop
    var height = element.clientHeight
    var bottom = top + height

    return ((bottom <= viewportBottom) && (top >= viewportTop))
  }
}
