class Application {
  constructor () {
    this.shortcuts = [
      new ScrollUp(),
      new ScrollDown(),
      new ScrollToTop(),
      new ScrollToBottom()
    ]
    this.navigator = new Navigator()
  }

  handleKeyboardEvent (e) {
    if (e.key === 'Escape') {
      this.navigator.hide()
      e.preventDefault()
      return false
    } else if (!this.insideInput(e) && e.key == 'f') {
      this.navigator.show()
      e.preventDefault()
      return false
    }

    if (this.insideInput(e)) {
      return
    }

    if (!this.keysPressed) {
      this.keysPressed = ''
    }
    this.keysPressed += e.key

    for (var i = 0; i < this.shortcuts.length; i++) {
      var shortcut = this.shortcuts[i]
      if (this.endsWith(this.keysPressed, shortcut.key())) {
        this.keysPressed = ''
        shortcut.action()
        e.preventDefault()
        return false
      }
    }
  }

  insideInput (e) {
    return e.srcElement.tagName == 'INPUT' ||
      e.srcElement.tagName == 'TEXTAREA'
  }

  endsWith (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1
  }
}

var application = new Application ()
window.addEventListener('keydown', application.handleKeyboardEvent.bind(application))
