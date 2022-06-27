import { calculatePnl } from '@func/calculate'
import { IContext } from '@graphql/context'
import { ITradeInput } from '@typings/trades.typings'
import { UserInputError } from 'apollo-server-core'

export const addTrade = async ({ data }:ITradeInput, { prisma, currentUser }:IContext) => {
  if (currentUser) {
    let {
      entry, exit, leverage, size,
    } = data
    const { ticker, trade, type } = data

    entry = Number(entry)
    exit = Number(exit)
    size = Number(size)
    leverage = Number(leverage)

    const tradeData:any = {
      ticker,
      type,
      trade,
      size,
      leverage,
      entry,
      userId: currentUser.id,
    }

    if (data.exit) {
      tradeData.exit = exit
      tradeData.pnl = calculatePnl({
        entry, exit, leverage, size, type,
      })
    }

    const t = await prisma.trade.create({
      data: tradeData,
    })

    prisma.user.update({
      where: { username: currentUser.username },
      data: {
        trades: {
          set: [...currentUser.trades, t.id],
        },
        totalPnL: {
          set: currentUser.totalPnL + t.pnl,
        },
      },
    })

    return true
  }
  throw new UserInputError('User not logged in')
}
