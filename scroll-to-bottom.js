class ScrollToBottom {
  key () {
    return 'G'
  }

  action () {
    window.scrollTo(0, document.body.scrollHeight)
  }
}
