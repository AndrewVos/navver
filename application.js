/* globals LinkNavigator, ScrollUp, ScrollDown, ScrollToTop, ScrollToBottom */
class Application {
  constructor () {
    this.keysPressed = ''

    this.navigators = [
      LinkNavigator
    ]
    this.shortcuts = [
      new ScrollUp(),
      new ScrollDown(),
      new ScrollToTop(),
      new ScrollToBottom()
    ]
  }

  handleKeyboardEvent (e) {
    if (this.insideInput(e)) {
      return
    }

    this.keysPressed += e.key

    if (this.executeNavigator() || this.executeShortcut()) {
      e.preventDefault()
      return false
    }
  }

  executeNavigator () {
    if (!this.navigator) {
      for (var i = 0; i < this.navigators.length; i++) {
        var Navigator = this.navigators[i]
        if (this.endsWith(this.keysPressed, Navigator.activationKey())) {
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
      if (this.endsWith(this.keysPressed, shortcut.key())) {
        this.keysPressed = ''
        shortcut.action()
        return true
      }
    }
    return false
  }

  insideInput (e) {
    return e.srcElement.tagName === 'INPUT' ||
      e.srcElement.tagName === 'TEXTAREA'
  }

  endsWith (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1
  }
}

var application = new Application()
window.addEventListener('keydown', application.handleKeyboardEvent.bind(application))
