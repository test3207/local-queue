const EventEmitter = require('events')
module.exports = class extends EventEmitter {
  constructor(processor) {
    super()
    if (typeof processor !== 'function') throw new Error('Wrong Processor Type!')
    this.processor = processor

    this.queue = []
    this.status = 0 // 0为执行完毕，1为执行中，用以避免并发add时多次调用
    this.on('ready', async () => {
      if (this.status !== 1) {
        this.status = 1
        const job = this.queue.shift()
        if (job) {
          await this.processor(job)
        }
        this.status = 0
        !this._close && this.queue.length && this.emit('ready')
      }
    })
    
    this.on('loop', async () => {
      await new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, 0)
      })
      !this._close && this.emit('start')
    })
    this.emit('loop')
  }

  add (job) {
    this.queue.push(job)
    this.emit('ready')
  }

  close() {
    this._close = true
  }
}
