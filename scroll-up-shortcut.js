/* globals Navver */

class ScrollUpShortcut {
  key () {
    return 'k'
  }

  action () {
    window.scrollBy(0, -50)
  }
}

Navver.addShortcut(new ScrollUpShortcut())
