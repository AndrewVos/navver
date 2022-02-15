window.Application = class Application {
  constructor() {
    this.keysPressed = [];
    this.elements = [];
    this.shortcuts = [
      {
        keys: () => "gb",
        action: () => history.back(),
      },
      {
        keys: () => "gf",
        action: () => history.forward(),
      },
      {
        keys: () => "k",
        action: () => window.scrollBy(0, -50),
      },
      {
        keys: () => "j",
        action: () => window.scrollBy(0, 50),
      },
      {
        keys: () => "h",
        action: () => window.scrollBy(-50, 0),
      },
      {
        keys: () => "l",
        action: () => window.scrollBy(50, 0),
      },
      {
        keys: () => "gg",
        action: () => window.scrollTo(0, 0),
      },
      {
        keys: () => "G",
        action: () => window.scrollTo(0, document.body.scrollHeight),
      },
    ];
  }

  handleKeyboardEvent = (e) => {
    if (
      e.ctrlKey ||
      e.metaKey ||
      this.isFocusInsideInput(e) ||
      this.isFocusInsideContentEditable(e)
    ) {
      return;
    }

    if (this.navigatorVisible) {
      if (e.key === "Escape") {
        this.hideNavigator();
      } else if (e.key === "Backspace") {
        this.keysPressed.pop();
        this.search();
        this.maybeFocusSingleElement();
      } else if (this.isKeyLetter(e)) {
        this.keysPressed.push(e.key);
        this.search();
        this.maybeFocusSingleElement();
      }
      e.stopPropagation();
      e.preventDefault();
      return false;
    } else {
      this.keysPressed.push(e.key);

      if (this.maybeExecuteShortcut() || this.maybeShowNavigator()) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    }
  };

  handleScroll = () => {
    if (this.navigatorVisible) {
      this.hideNavigator();
    }
  };

  maybeShowNavigator = () => {
    if (this.keysPressedEndsWith("f")) {
      this.showNavigator();
      return true;
    }
  };

  maybeFocusSingleElement = () => {
    if (this.elements.length === 1) {
      this.elements[0].focus();
      this.hideNavigator();
    }
  };

  isKeyLetter = (event) => {
    const key = event.key.toLowerCase();

    if (key.length !== 1) {
      return false;
    }
    return key >= "a" && key <= "z";
  };

  maybeExecuteShortcut = () => {
    for (var i = 0; i < this.shortcuts.length; i++) {
      var shortcut = this.shortcuts[i];
      if (this.keysPressedEndsWith(shortcut.keys())) {
        this.keysPressed = [];
        shortcut.action();
        return true;
      }
    }
    return false;
  };

  showNavigator = () => {
    this.keysPressed = [];
    this.search();
    this.navigatorVisible = true;
  };

  hideNavigator = () => {
    this.keysPressed = [];
    this.navigatorVisible = false;
    this.hideElements();
  };

  isFocusInsideContentEditable = (e) => {
    if (e.srcElement.isContentEditable) {
      return true;
    }
    return false;
  };

  isFocusInsideInput = (e) => {
    return (
      e.srcElement.tagName === "INPUT" || e.srcElement.tagName === "TEXTAREA"
    );
  };

  keysPressedEndsWith = (s) => {
    return this.keysPressed.join("").endsWith(s);
  };

  search = () => {
    const query = this.keysPressed.join("");

    this.hideElements();

    this.elements = Element.findElements(query);
    this.elements.forEach((e) => e.show());
  };

  hideElements() {
    if (this.elements) {
      this.elements.forEach((e) => e.hide());
    }
    this.elements = [];
  }
};

var application = new window.Application();
window.addEventListener("keydown", application.handleKeyboardEvent);
window.addEventListener("scroll", application.handleScroll);
