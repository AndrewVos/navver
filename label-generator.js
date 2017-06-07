window.LabelGenerator = class LabelGenerator {
  constructor () {
    this.labels = this.generateLabels()
    this.index = 0
  }

  next () {
    var label = this.labels[this.index]
    this.index += 1
    return label
  }

  generateLabels () {
    var characters = 'abcdefghijklmnopqrstuvwxyz'
    var labels = []
    for (var i = 0; i < characters.length; i++) {
      for (var p = 0; p < characters.length; p++) {
        labels.push(characters[i] + characters[p])
      }
    }
    return labels
  }
}
