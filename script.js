document.onkeydown = keyboardNavigation

function keyboardNavigation(e) {
  if (shouldLaunchNavver(e)) {
    createTags()
    return false
  }

  if (window.navverTags) {
    processKeyboardEvent(e)
  }
}

function processKeyboardEvent(e) {
  window.navverKeysPressed += e.key
  search(window.navverKeysPressed)
  e.preventDefault()
  return false
}

function shouldLaunchNavver(e) {
  return e.code == 'KeyG' &&
    e.srcElement.tagName != 'INPUT'
    !window.navverTags
}

function search(search) {
  for (var i = 0; i < window.navverTags.length; i++) {
    var tag = window.navverTags[i]

    if (tag.label == search) {
      removeAllTags()
      tag.click()
      return
    } else if (tag.label[0] == search) {
      tag.highlight(search)
    } else {
      tag.remove()
      window.navverTags.splice(i, 1)
      i--
    }
  }

  if (window.navverTags.length == 0) {
    removeAllTags()
  }

  return null
}

function removeAllTags () {
  for (var i = 0; i < window.navverTags.length; i++) {
    var tag = window.navverTags[i]
    tag.remove()
  }
  window.navverTags = null
}

function createTags () {
  window.navverKeysPressed = ''
  window.navverTags = []

  var labelIndex = 0
  var labels = generateLabels()

  $('a, button').each(function () {
    var label = labels[labelIndex]
    var $a = $(this)
    var $tag = $('<div class="navver-tag">' + label+ '</div>')
    $tag.css('position', 'absolute')
    $tag.css('top', $a.offset().top)
    $tag.css('left', $a.offset().left)
    $tag.css('background', 'yellow')
    $tag.css('border', '1px solid #333')
    $tag.css('border-radius', '3px')
    $tag.css('z-index', 10000000000)
    $('body').append($tag)
    window.navverTags.push(
      {
        label: label,
        remove: function () {
          $tag.remove()
        },
        click: function () {
          $a[0].click()
        },
        highlight: function (search) {
          if (search == label) {
            $tag.html("<strong>" + label + "</strong>")
          } else if (search == label[0]) {
            $tag.html("<strong>" + label[0] + "</strong>" + label[1])
          }
        }
      }
    )
    labelIndex += 1
  })
}

function generateLabels () {
  var characters = 'abcdefghijklmnopqrstuvwxyz'
  var labels = []
  for (var i = 0; i < characters.length; i++) {
    for (var p = 0; p < characters.length; p++) {
      labels.push(characters[i] + characters[p])
    }
  }
  return labels
}
