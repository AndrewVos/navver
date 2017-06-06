class NavigatorInput {
  constructor (onKeyDown, onInput) {
    this.container = Reset.resetElement(document.createElement('div'))
    this.container.style.zIndex = 100000
    this.container.style.position = 'fixed'
    this.container.style.bottom = '10px'
    this.container.style.left = '10px'
    this.container.style.right = '10px'
    this.container.style.borderRadius = '5px'
    this.container.style.backgroundColor = '#373b41'
    document.body.appendChild(this.container)

    this.input = Reset.resetElement(document.createElement('input'))
    this.input.style.fontSize = '30px'
    this.input.style.marginTop = '10px'
    this.input.style.marginBottom = '10px'
    this.input.style.marginLeft = '10px'
    this.input.style.width = '-webkit-calc(100% - 20px)'
    this.input.style.background = 'transparent'
    this.input.style.color = 'white'
    this.input.style.border = 'none'
    this.input.style.outline = 'none'
    this.container.appendChild(this.input)

    this.input.onkeydown = onKeyDown
    this.input.oninput = onInput

    this.input.focus()
  }

  remove () {
    this.container.remove()
  }

  value () {
    return this.input.value
  }
}
