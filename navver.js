/* exported Navver */

class Navver {
  static addKeyboardConsumer (consumer) {
    if (!this.consumers) {
      this.consumers = []
    }
    this.consumers.push(consumer)
  }

  static handleKeyboardEvent (e) {
    for (var i = 0; i < this.consumers.length; i++) {
      if (this.consumers[i].consume(e)) {
        return false
      }
    }
  }
}
