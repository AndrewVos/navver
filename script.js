document.onkeydown = keyboardNavigation

function keyboardNavigation(e) {
  if (e.code == 'KeyG') {
    console.log("Navver enabled")

    window.navverEnabled = true
    window.navverRectangle = null
    renderRectangle()
  } else if (e.code == 'Escape') {
    console.log("Navver disabled")

    window.navverEnabled = false
    if (window.navverRectangle) {
      window.navverRectangle.remove()
    }
    window.navverRectangle = null
  }

  if (!window.navverEnabled) {
    return
  }

  if (e.code == 'ArrowUp') {
    up()
    return false
  } else if (e.code == 'ArrowDown') {
    down()
    return false
  } else if (e.code == 'ArrowLeft') {
    left()
    return false
  } else if (e.code == 'ArrowRight') {
    right()
    return false
  }
}

function up () {
  window.navverRectangle.css('height', window.navverRectangle.height() / 2)
}

function down () {
  window.navverRectangle.css('top', window.navverRectangle.offset().top + (window.navverRectangle.height() / 2))
  window.navverRectangle.css('height', window.navverRectangle.height() / 2)
}

function left () {
  window.navverRectangle.css('width', window.navverRectangle.width() / 2)
}

function right () {
  window.navverRectangle.css('left', window.navverRectangle.offset().left + (window.navverRectangle.width() / 2))
  window.navverRectangle.css('width', window.navverRectangle.width() / 2)
}

function renderRectangle () {
  if (!window.navverRectangle) {
    window.navverRectangle = $('<div class="navver"></div>')
    window.navverRectangle.css('position', 'absolute')
    window.navverRectangle.css('background', 'rgba(255,0,0,0.1)')
    window.navverRectangle.css('pointer-events', 'none')
    window.navverRectangle.css('top', $(window).scrollTop())
    window.navverRectangle.css('left', $(window).scrollLeft())

    window.navverRectangle.css('width', window.innerWidth)
    window.navverRectangle.css('height', window.innerHeight)
    $('body').append(window.navverRectangle)
  }
}
