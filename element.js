/* globals NavverElement, LabelGenerator */

window.Element = class Element {
  constructor (element, label) {
    this.element = element
    this.storeOldStyle()
  }

  destroy () {
    this.resetOldStyle()
    this.tag.remove()
  }

  isActionable () {
    return this.isVisible() &&
      this.isScrolledIntoView() &&
      !this.element.classList.contains('Navver')
  }

  isVisible () {
    var rectangle = this.element.getBoundingClientRect()
    if (rectangle.height <= 0 || rectangle.width <= 0) {
      return false
    }

    var style = window.getComputedStyle(this.element)
    if (style.display === 'none') {
      return false
    }

    return true
  }

  isScrolledIntoView () {
    var viewportTop = document.body.scrollTop
    var viewportBottom = viewportTop + window.innerHeight

    var height = this.element.clientHeight
    var bottom = this.offset().top + height

    return ((bottom <= viewportBottom) && (this.offset().top >= viewportTop))
  }

  storeOldStyle () {
    this.oldStyle = this.element.getAttribute('style')
  }

  resetOldStyle () {
    this.element.setAttribute('style', this.oldStyle)
  }

  show () {
    this.tag = NavverElement.create('div')

    var tagWidth = 20
    this.tag.textContent = this.label
    this.tag.style.zIndex = 10000
    this.tag.style.position = 'absolute'
    this.tag.style.textAlign = 'center'
    this.tag.style.width = tagWidth + 'px'
    this.tag.style.top = this.offset().top + 'px'
    this.tag.style.left = (this.offset().left - tagWidth) + 'px'
    this.tag.style.backgroundColor = '#d9534f'
    this.tag.style.color = 'white'
    this.tag.style.borderTopLeftRadius = '3px'
    this.tag.style.borderTopRightRadius = '3px'
    document.body.appendChild(this.tag)
  }

  action (options) {
    if (this.element.tagName === 'INPUT') {
      this.element.focus()
    } else {
      if (options.shift) {
        var oldTarget = this.element.getAttribute('target')
        this.element.setAttribute('target', '_blank')
        this.element.click()
        this.element.setAttribute('target', oldTarget)
      } else {
        this.element.click()
      }
    }
  }

  offset () {
    var rectangle = this.element.getBoundingClientRect()
    return {
      top: rectangle.top + document.body.scrollTop,
      left: rectangle.left + document.body.scrollLeft
    }
  }

  content () {
    return this.element.textContent
  }

  match (search) {
    search = search.toLowerCase()
    return search === '' ||
      this.content().toLowerCase().indexOf(search) !== -1 ||
      this.label.indexOf(search) !== -1
  }

  static actionable () {
    var all = this.allElements()
    var valid = []
    var labelGenerator = new LabelGenerator()
    for (var i = 0; i < all.length; i++) {
      var element = all[i]
      if (element.isActionable()) {
        element.setLabel(labelGenerator.next())
        valid.push(element)
      }
    }
    return valid
  }

  setLabel(label) {
    this.label = label
  }

  focus () {
    this.element.style.backgroundColor = 'green'
    this.element.style.color = 'white'
  }

  unfocus () {
    this.element.style.backgroundColor = 'yellow'
    this.element.style.color = 'black'
  }

  static allElements () {
    var allElements = document.querySelectorAll('a, button, input')
    var elements = []
    for (var i = 0; i < allElements.length; i++) {
      elements.push(new Element(allElements[i]))
    }
    return elements
  }
}
