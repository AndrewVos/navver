/* globals Navver */

class ScrollDownShortcut {
  key () {
    return 'j'
  }

  action () {
    window.scrollBy(0, 50)
  }
}

Navver.addShortcut(new ScrollDownShortcut())
