/*
 * @Description: 
 * @Date: 2023-01-30 14:28:36
 * @LastEditors: cw
 * @LastEditTime: 2023-01-31 15:03:21
 * @FilePath: \knowledge_note\getMemory.js
 */
const os = require('os');

// 获取当前系统的内存情况
const totalMemery = (os.totalmem() / 1024 / 1024).toFixed(2)
const freeMemery = (os.freemem() / 1024 / 1024).toFixed(2)
console.log('totalMemery:',  totalMemery + 'MB', ' freeMemery:', freeMemery  + 'MB')

// 查看当前node程序占用的内存大小
// https://blog.csdn.net/millions_02/article/details/78405055
const memoryUsed = process.memoryUsage()
console.log('memoryUsed', memoryUsed)
