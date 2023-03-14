/**
 * 任务队列
 */

function TaskQueueClass(type = '') {
    this.queue = []
    this.consumeStatus = false
    this.queueType = type
}

TaskQueueClass.prototype.addTask = function (fn) {
    this.queue.push(fn)
    this.consume()
}

TaskQueueClass.prototype.consume = function () {
    if (this.consumeStatus) return
    if (!this.queue.length) {
        this.consumeStatus = false
        return
    }
    this.consumeStatus = true
    const fn = this.queue.shift()
    switch (this.queueType) {
        case 'space':
            fn()
            setTimeout(() => {
                this.consumeStatus = false
                this.consume()
            });
            break;
        case 'callback':
            fn(() => {
                this.consumeStatus = false
                this.consume()
            })
            break;
        default:
            fn()
            this.consumeStatus = false
            this.consume()
            break;
    }
}

export default TaskQueueClass
