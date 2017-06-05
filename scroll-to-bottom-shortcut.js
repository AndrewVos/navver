/* globals Navver */

class ScrollToBottomShortcut {
  key () {
    return 'G'
  }

  action () {
    window.scrollTo(0, document.body.scrollHeight)
  }
}

Navver.addShortcut(new ScrollToBottomShortcut())
