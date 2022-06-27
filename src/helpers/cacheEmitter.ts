import EventEmitter from 'stream'

export class CacheEmitter extends EventEmitter {
  cache:{}

  constructor() {
    super()
    this.cache = {
      numOfTrades: Number,
      numOfWins: Number,
    }
  }

  get(key:string) {
    return new Promise((resolve, reject) => {
      if ((this.cache as any)[key]) {
        return resolve((this.cache as any)[key])
      }

      // this.on(key, (val) => {
      //   resolve(val)
      // })
    })
  }

  put(key:string, value:number | string) {
    (this.cache as any)[key] = value
    this.emit(key, value)
  }
}
