/**
 * 批量获取文件的地址，读取之后用Iconv转成utf8格式
 * 然后再删除源文件，然后再以utf8格式保存
 */

const  Iconv = require('iconv-lite')
// node fs模块
const fs = require('fs');
// node path模块
const path = require('path');
// 被读取的文件夹地址
const filePath = path.resolve('./');
// 收集所有的文件路径
const arr = [];

const deleteFileByPath = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.rm(filePath.replace('##', ''), err => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            resolve()
        })
    });
}

const saveFileByPath = (filePath, value) => {
    return new Promise((resolve, reject) => {
        console.log('filePathaa', filePath)
        fs.writeFile(filePath.replace('##', ''), value, {encoding: 'utf-8'}, err => {
            if (err) {
                console.log('222', err)
                reject(err)
                return
            }
            resolve()
        })
    });
}

const getFileByPath = (filePath) => {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(filePath.replace('##', ''))
        resolve(Iconv.decode(data, 'gb2312').toString())
    });
}

const transformFile = async (arr) => {
    while (arr.length) {
        const filePath = arr.shift()
        console.log(filePath)
        const file = await getFileByPath(filePath)
        await deleteFileByPath(filePath)
        await saveFileByPath(filePath, file)
    }
}

const fileDisplay = filePath => {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, (err, files) => {
        if (err) return console.error('Error:(spec)', err)
        files.forEach((filename) => {
            //获取当前文件的绝对路径
            const filedir = path.join(filePath, '##' + filename);
            if (filedir.indexOf('.txt') > -1) {
                arr.push(filedir.toString())
            }
        });
        transformFile(arr)
        
    });
}
fileDisplay(filePath)