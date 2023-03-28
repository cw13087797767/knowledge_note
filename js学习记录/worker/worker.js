/*
 * @Description: 
 * @Date: 2023-01-31 14:46:32
 * @LastEditors: cw
 * @LastEditTime: 2023-01-31 14:52:53
 * @FilePath: \knowledge_note\worker\worker.js
 */
const { workerData, parentPort } = require('worker_threads')

setInterval(() => {
    let memoryUsed = process.memoryUsage()
    console.log('空worker内存使用情况：', memoryUsed)
    memoryUsed = null
}, 5000);