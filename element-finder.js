class ElementFinder {
  static findElements () {
    var tags = ['a', 'button']
    var elements = []
    for (var i = 0; i < tags.length; i++) {
      elements = elements.concat(
        Array.prototype.slice.call(document.getElementsByTagName(tags[i]))
      )
    }
    return elements
  }
}
