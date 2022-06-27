import { CacheEmitter } from '@helpers/cacheEmitter'
import { IUser } from '@typings/user.typings'

type CalculatePnlData = {
  entry: number
  exit: number
  leverage: number
  type: string
  size: number
}

export const calculatePnl = (args: CalculatePnlData) => {
  const {
    entry, exit, leverage, type, size,
  } = args
  if (type === 'Long' || type === 'Buy') {
    return parseFloat(((entry - exit) * size).toPrecision(2))
  }
  return parseFloat(((exit - entry) * size).toPrecision(2))
}

export const calculateAccuracy = async (cache:CacheEmitter) => {
  const numOfTrades = await cache.get('numOfTrades') as number
  const numOfWins = await cache.get('numOfWins') as number

  const accuracy = numOfTrades > 0
    ? (numOfWins / numOfTrades) * 100 : 0

  console.log(numOfTrades, numOfWins, accuracy)
  return accuracy
}
