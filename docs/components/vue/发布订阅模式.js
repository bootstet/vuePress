class EventEmit {
  constructor () {
    this.events = {

    }
  }
  on (eventName, handler) {
    const handlers = this.events[eventName]
    if(handlers) {
      handlers.push(handler)
    } else {
      this.events[eventName] = []
      this.events[eventName].push(handler)
    }
  }

  emit (eventName, ...args) {
    const handlers = this.events[eventName]
    if(handlers) {
      handlers.forEach(cb => {
        cb(...args)
      })
    }
  }
}

const em = new EventEmit()

em.on('haha', message => {
  console.log(message, 1)
})

em.on('haha', message => {
  console.log(message, 2)
})

em.emit('haha', 'world')