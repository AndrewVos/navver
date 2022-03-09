window.Element = class Element {
  constructor(element, label) {
    this.element = element;
    this.label = label;
    this.storeOldStyle();
  }

  storeOldStyle() {
    this.oldStyle = this.element.getAttribute("style");
  }

  resetOldStyle() {
    this.element.setAttribute("style", this.oldStyle);
  }

  show = () => {
    this.element.style.backgroundColor = "#fee2e2";
    this.element.style.color = "#b91c1c";

    this.tag = document.createElement("div");
    this.tag.textContent = this.label;

    Object.assign(this.tag.style, {
      margin: 0,
      padding: 0,
      border: 0,

      position: "absolute",

      zIndex: 999999999999999999,

      paddingLeft: "2px",
      paddingRight: "2px",

      textAlign: "center",
      backgroundColor: "#d9534f",
      color: "#fee2e2",
      fontSize: "8px",
      fontFamily: "monospace",
    });

    document.body.appendChild(this.tag);

    Object.assign(this.tag.style, {
      top: this.elementOffset().top + "px",
      left:
        this.elementOffset().left -
        this.tag.getBoundingClientRect().width +
        "px",
    });
  };

  hide = () => {
    this.resetOldStyle();
    if (this.tag) {
      this.tag.remove();
    }
  };

  focus = () => {
    this.element.focus();
  };

  elementOffset() {
    let currentElement = this.element;

    var top = 0,
      left = 0;
    do {
      top += currentElement.offsetTop || 0;
      left += currentElement.offsetLeft || 0;
      currentElement = currentElement.offsetParent;
    } while (currentElement);

    return {
      top: top,
      left: left,
    };
  }

  isMatch(search) {
    search = search.toLowerCase();
    return search === "" || this.label.indexOf(search) === 0;
  }

  static findElements(search) {
    var all = this.visibleElements();
    var valid = [];
    var labelGenerator = new LabelGenerator();
    for (var i = 0; i < all.length; i++) {
      var element = new Element(all[i], labelGenerator.next());
      if (element.isMatch(search)) {
        valid.push(element);
      }
    }
    return valid;
  }

  static visibleElements() {
    var allElements = Array.from(document.querySelectorAll("a, button, input"));
    return allElements.filter(
      (element) => this.isVisible(element) && this.isScrolledIntoView(element)
    );
  }

  static isVisible(element) {
    var rectangle = element.getBoundingClientRect();
    if (rectangle.height <= 0 || rectangle.width <= 0) {
      return false;
    }

    var style = window.getComputedStyle(element);
    if (style.display === "none") {
      return false;
    }

    return true;
  }

  static isScrolledIntoView(element) {
    var viewportTop = document.body.scrollTop;
    var viewportBottom = viewportTop + window.innerHeight;

    var height = element.clientHeight;
    var bottom = this.offset(element).top + height;

    return bottom <= viewportBottom && this.offset(element).top >= viewportTop;
  }

  static offset(element) {
    var rectangle = element.getBoundingClientRect();
    return {
      top: rectangle.top + document.body.scrollTop,
      left: rectangle.left + document.body.scrollLeft,
    };
  }
};
