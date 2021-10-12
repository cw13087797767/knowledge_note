// 基础版本

// https://zhuanlan.zhihu.com/p/58428287?utm_source=wechat_timeline

export default  class Promise1 {
  callbacks = [];
  constructor(fn) {
    console.log(fn)
    console.log(this)
    fn(this._resolve.bind(this))
  }
  then(onFulfilled) {
    this.callbacks.push(onFulfilled)
  }
  _resolve(value) {
    console.log(1)
    this.callbacks.forEach(fn => fn(value))
  }
}
