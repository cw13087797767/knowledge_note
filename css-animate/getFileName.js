const fs = require('fs')

const dir = './examples/'

fs.readdir(dir, (err, files) => {
    if (err) {
        throw err
    }
    files.forEach(file => {
        console.log('"' + file + '",')
    });
})