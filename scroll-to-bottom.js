window.ScrollToBottom = class ScrollToBottom {
  keys () {
    return ['G']
  }

  action () {
    window.scrollTo(0, document.body.scrollHeight)
  }
}
