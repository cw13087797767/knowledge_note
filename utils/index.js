/**
 * 图片压缩
 * @param img 图片对象
 */
export function compress(img, height, width, callback) {
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    context.clearRect(0, 0, width, height)
    context.drawImage(img, 0, 0, width, height)
    callback(canvas.toDataURL('image/jpeg', 0.75))
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