import { ITrade, ITradeInput } from '@typings/trades.typings'
import { IContext } from '@graphql/context'
import { addTrade } from '@services/trade.service'

export const tradeResolvers = {
  Query: {
    trades: (_: any, args: any, { prisma, currentUser }: IContext) => {
      return prisma.trade.findMany({ where: { userId: currentUser.id } })
    },
  },

  Mutation: {
    addTrade: async (_: any, args: ITradeInput, context: IContext) => addTrade(args, context),
  },

  Trade: {},
}
