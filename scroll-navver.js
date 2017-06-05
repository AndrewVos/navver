/* globals Navver */

class ScrollNavver {
  consume (e) {
    if (e.srcElement.tagName === 'INPUT') {
      return false
    } else if (e.key === 'j') {
      window.scrollBy(0, 50)
      return true
    } else if (e.key === 'k') {
      window.scrollBy(0, -50)
      return true
    }

    return false
  }
}

Navver.addKeyboardConsumer(new ScrollNavver())
