window.ScrollUp = class ScrollUp {
  keys () {
    return ['k']
  }

  action () {
    window.scrollBy(0, -50)
  }
}
