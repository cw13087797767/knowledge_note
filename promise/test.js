import Promise1 from './promise1.js'

function func() {
  return new Promise1(reslove => {
    console.log('done')
    setTimeout(() => {
      reslove(1)
    }, 1000);
  })
}
func()
// func().then(res => {
//   console.log(res)
// })
