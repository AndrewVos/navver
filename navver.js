/* exported Navver */

class Navver {
  static addNavigator (navigator) {
    if (!this.navigators) {
      this.navigators = []
    }
    this.navigators.push(navigator)
  }

  static addShortcut (shortcut) {
    if (!this.shortcuts) {
      this.shortcuts = []
    }
    this.shortcuts.push(shortcut)
  }

  static handleKeyboardEvent (e) {
    if (this.activeNavigator && e.key === 'Escape') {
      this.activeNavigator.destroy()
      this.activeNavigator = null
      return false
    } else if (e.srcElement.tagName !== 'INPUT' && !this.activeNavigator) {
      this.activeNavigator = this.findNavigator(e.key)
      if (this.activeNavigator) {
        this.activeNavigator.activate()
        return false
      }
    }

    if (!this.activeNavigator) {
      for (var i = 0; i < this.shortcuts.length; i++) {
        var shortcut = this.shortcuts[i]
        if (shortcut.consume(e)) {
          return false
        }
      }
    }
  }

  static findNavigator (key) {
    for (var i = 0; i < this.navigators.length; i++) {
      var navigator = this.navigators[i]
      if (navigator.activationKey && key === navigator.activationKey()) {
        return navigator
      }
    }

    return null
  }
}

document.onkeydown = Navver.handleKeyboardEvent.bind(Navver)
