window.ScrollDown = class ScrollDown {
  keys () {
    return ['j']
  }

  action () {
    window.scrollBy(0, 50)
  }
}
