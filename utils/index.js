/**
 * 图片压缩
 * @param img 图片对象
 */
export function compress(img, height, width, callback) {
    return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height
        context.clearRect(0, 0, width, height)
        context.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.75))
    })
}

/**
 * base64转File文件
 * @param base64
 * @returns File
 */
export const base64ToFile = (base64, name) => {
    const arr = base64.split(',')
    const fileType = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let i = bstr.length
    const u8Arr = new Uint8Array(i)
    while (i--) {
        u8Arr[i] = bstr.charCodeAt(i)
    }
    return new File([u8Arr], name, {
        type: fileType
    })
}

/**
 * 下载二进制文件
 * @param {Object}
 *  @param {Binary} 二进制文件
 *  @param {Binary} 下载文件名
 *  @param {Binary} 文件类型
 */
export const downloadBinaryFile = function ({ data, name, type }) {
    const blob = new Blob([data], { type })
    const URL = window.URL
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}