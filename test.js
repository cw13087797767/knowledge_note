const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// 2023年，华为机考题目答案 满分
const arr = [];
const fn1 = (str1 = '', str2 = '') => {
    const arr1 = str1.split('-')
    const arr2 = str2.split('-')
    const map = new Map()
    const cardArr = []
    const ansArr = []

    function getGetCard(num) {
        switch (num) {
            case 'A':
                return 14
            case 'K':
                return 13
            case 'Q':
                return 12
            case 'J':
                return 11
            default:
                return +num
        }
    }
    for (const num of arr1) {
        const card = getGetCard(num)
        map.set(card, (map.get(card) || 0) + 1)
    }
    for (const num of arr2) {
        const card = getGetCard(num)
        map.set(card, (map.get(card) || 0) + 1)
    }
    for (let i = 3; i <= 14; i++) {
        if (!map.has(i) || map.get(i) !== 4) {
            cardArr.push(i)
        }
    }
    let arr = []
    for (let i = 0; i < cardArr.length; i++) {
        if (!arr.length) {
            arr.push(cardArr[i])
        } else {
            if (cardArr[i] - arr[arr.length - 1] !== 1) {
                if (arr.length > 4) {
                    ansArr.push([...arr])
                }
                arr = [cardArr[i]]
            } else {
                arr.push(cardArr[i])
            }
        }
    }
    if (arr.length > 4) {
        ansArr.push(arr)
    }
    if (!ansArr.length) {
        console.log('NO-CHAIN')
        return
    }
    let maxIndex = 0
    for (let i = 0; i < ansArr.length; i++) {
        let curMax = ansArr[i][ansArr[i].length - 1]
        let max = ansArr[maxIndex][ansArr[maxIndex].length - 1]
        if (ansArr[i].length > ansArr[maxIndex].length) {
            maxIndex = i
        } else if (curMax > max) {
            maxIndex = i
        }
    }
    let strArr = [...ansArr[maxIndex]]
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] === 14) {
            strArr[i] = 'A'
        }
        if (strArr[i] === 13) {
            strArr[i] = 'K'
        }
        if (strArr[i] === 12) {
            strArr[i] = 'Q'
        }
        if (strArr[i] === 11) {
            strArr[i] = 'J'
        }
    }
    console.log(strArr.join('-'))
};

const fn2 = (str = '') => {
    const arr = str.split(' ')
    const len = arr.length
    const ansArr = new Array(len).fill(0)
    let total = 0
    for (let i = 0; i < len; i++) {
        total += +arr[i]
    }
    let index = 0
    let num = 0
    let number = 1
    while (num < total) {
        if (number.toString().indexOf('7') > -1 || number % 7 === 0) {
            num++
            ansArr[index]++
        }
        index = (index + 1) % len
        number++
    }
    console.log(ansArr.join(' '))
}

const fn = (str = '') => {
    const arr = str.split('')
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charCodeAt()
    }
    const getSum = (start, end) => {
        let sum = 0
        for (let i = start; i < end; i++) {
            sum += arr[i]
        }
        return sum
    }
    for (let i = 1; i < arr.length - 3; i++) {
        let right = arr.length - 2
        while (right - i > 1) {
            const leftSum = getSum(0, i)
            const midSum = getSum(i + 1, right)
            const rightSum = getSum(right + 1, arr.length)
            if (leftSum === midSum && leftSum === rightSum) {
                console.log(`${i},${right}`)
                return
            }
            --right
        }
    }
    console.log('0,0')
}

rl.on('line', str => {
    arr.push(str)
})

rl.on('close', () => {
    fn(...arr)
})