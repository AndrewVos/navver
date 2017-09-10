window.ScrollToTop = class ScrollToTop {
  keys () {
    return ['g', 'g']
  }

  action () {
    window.scrollTo(0, 0)
  }
}
