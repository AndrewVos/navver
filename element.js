window.Element = class Element {
  static create (tag) {
    var element = document.createElement(tag)
    element.classList.add('Navver')
    return this.reset(element)
  }

  static reset (element) {
    element.style.margin = 0
    element.style.padding = 0
    element.style.border = 0
    element.style.width = 'unset'
    return element
  }
}
