/* globals Navigator, ScrollUp, ScrollDown, ScrollLeft, ScrollRight, ScrollToTop, ScrollToBottom */
window.Application = class Application {
  constructor () {
    this.keysPressed = []

    this.navigators = [
      Navigator
    ]
    this.shortcuts = [
      new ScrollUp(),
      new ScrollDown(),
      new ScrollLeft(),
      new ScrollRight(),
      new ScrollToTop(),
      new ScrollToBottom()
    ]
  }

  handleKeyboardEvent (e) {
    if (e.ctrlKey || e.metaKey || this.insideInput(e) || this.insideContentEditable(e)) {
      return
    }

    this.keysPressed.push(e.key)

    if (this.executeNavigator() || this.executeShortcut()) {
      e.stopPropagation()
      e.preventDefault()
      return false
    }
  }

  executeNavigator () {
    if (!this.navigator) {
      for (var i = 0; i < this.navigators.length; i++) {
        var Navigator = this.navigators[i]

        if (this.arrayEndsWith(this.keysPressed, Navigator.activationKeys())) {
          this.keysPressed = []
          this.currentNavigator = new Navigator(function () {
            this.currentNavigator = null
          }.bind(this))
          return true
        }
      }
    }
  }

  executeShortcut () {
    for (var i = 0; i < this.shortcuts.length; i++) {
      var shortcut = this.shortcuts[i]
      if (this.arrayEndsWith(this.keysPressed, shortcut.keys())) {
        this.keysPressed = []
        shortcut.action()
        return true
      }
    }
    return false
  }

  insideContentEditable (e) {
    if (e.srcElement.isContentEditable) {
      return true
    }
    return false
  }

  insideInput (e) {
    return e.srcElement.tagName === 'INPUT' ||
      e.srcElement.tagName === 'TEXTAREA'
  }

  arrayEndsWith (array, other) {
    if (array.length < other.length) {
      return false
    }

    var subset = array.slice(array.length - other.length)

    for (var i = 0; i < subset.length; i++) {
      if (subset[i] !== other[i]) {
        return false
      }
    }
    return true
  }
}

var application = new window.Application()
window.addEventListener('keydown', application.handleKeyboardEvent.bind(application))
