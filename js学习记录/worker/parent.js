// const { Worker } = require('worker_threads');

// function run() {
//     const worker = new Worker(__dirname + '/worker.js', {})
// }
// run()
setInterval(() => {
    let memoryUsed = process.memoryUsage()
    console.log('内存使用情况：', memoryUsed)
    memoryUsed = null
}, 5000);