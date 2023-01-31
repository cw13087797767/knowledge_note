## 参考博客地址
http://www.gimoo.net/t/1805/5af8fbb1be44e.html

## 查询当前总内存使用情况
```JavaScript
    const os = require('os');
    const totalMemery = (os.totalmem() / 1024 / 1024).toFixed(2)
    const freeMemery = (os.freemem() / 1024 / 1024).toFixed(2)
    console.log('totalMemery:',  totalMemery + 'MB', ' freeMemery:', freeMemery  + 'MB')
```

## 查看当前node服务使用内存情况
```JavaScript
    const memoryUsed = process.memoryUsage()
    console.log('memoryUsed', memoryUsed)
```