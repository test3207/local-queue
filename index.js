const EventEmitter = require('events');
module.exports = class extends EventEmitter {
    constructor(processor) {
        super();
        if (typeof processor !== 'function') throw new Error('Wrong Processor Type!');
        this.processor = processor;

        this.queue = [];
        this.pending = false;
        this.on('ready', async () => {
            if (!this.pending) {
                this.pending = true;
                const job = this.queue.shift();
                if (job) {
                    await this.processor(job);
                }
                this.pending = false;
                this.queue.length && this.emit('ready');
            }
        });
    }

    add(job) {
        this.queue.push(job);
        this.emit('ready');
    }

    close() {
        this.removeAllListeners();
    }
}
