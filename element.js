/* globals NavverElement, LabelGenerator, Offset */

window.Element = class Element {
  constructor (element, label) {
    this.element = element
    this.label = label
    this.storeOldStyle()
  }

  destroy () {
    this.resetOldStyle()
    this.tag.remove()
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

  static isScrolledIntoView (element) {
    var viewportTop = document.body.scrollTop
    var viewportBottom = viewportTop + window.innerHeight

    var height = element.clientHeight
    var elementOffset = Offset(element)
    var bottom = elementOffset.top + height

    return ((bottom <= viewportBottom) && (elementOffset.top >= viewportTop))
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
    var all = this.visibleElements()
    var valid = []
    var labelGenerator = new LabelGenerator()
    for (var i = 0; i < all.length; i++) {
      var element = new Element(
        all[i],
        labelGenerator.next()
      )
      valid.push(element)
    }
    return valid
  }

  focus () {
    this.element.style.backgroundColor = 'green'
    this.element.style.color = 'white'
  }

  unfocus () {
    this.element.style.backgroundColor = 'yellow'
    this.element.style.color = 'black'
  }

  static visibleElements () {
    var allElements = document.querySelectorAll('a, button, input')
    var visible = []
    for (var i = 0; i < allElements.length; i++) {
      var element = allElements[i]
      var isVisible =
        Element.isVisible(element) &&
        Element.isScrolledIntoView(element) &&
        !element.classList.contains('Navver')

      if (isVisible) {
        visible.push(allElements[i])
      }
    }
    return visible
  }
}
