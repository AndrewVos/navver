/* globals Navver */

class ScrollToTopShortcut {
  key () {
    return 'gg'
  }

  action () {
    window.scrollTo(0, 0)
  }
}

Navver.addShortcut(new ScrollToTopShortcut())
