window.Offset = function (element) {
  var rectangle = element.getBoundingClientRect()
  return {
    top: rectangle.top + document.body.scrollTop,
    left: rectangle.left + document.body.scrollLeft
  }
}
