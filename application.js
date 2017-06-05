class Application {
  constructor () {
    this.shortcuts = [
      new ScrollUp(),
      new ScrollDown(),
      new ScrollToTop(),
      new ScrollToBottom()
    ]
  }

  handleKeyboardEvent (e) {
    if (this.navigator && e.key === 'Escape') {
      this.navigator.destroy()
      this.navigator = null
      return false
    } else if (!this.insideInput(e) && !this.navigator && e.key == 'f') {
      this.navigator = new Navigator()
      this.navigator.activate()
      return false
    }

    if (this.navigator || this.insideInput(e)) {
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

window.addEventListener('load', function () {
  var application = new Application ()
  document.onkeydown = application.handleKeyboardEvent.bind(application)
}, false )
