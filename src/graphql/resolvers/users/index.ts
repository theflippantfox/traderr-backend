import { UserInputError } from 'apollo-server-core'

import { IContext } from '@graphql/context'
import { comparePassword, getSignedToken, hashPassword } from '@services/auth.service'
import { ILoginInput, ISignupInput, IUser } from '@typings/user.typings'
import { calculateAccuracy } from '@func/calculate'

export const userResolver = {
  Query: {
    currentUser: (_: any, __: any, { currentUser }: IContext) => currentUser,
  },

  Mutation: {
    signupUser: async (_: any, { data }: ISignupInput, context: IContext) => {
      const user = await context.prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: await hashPassword(data.password),
          profilePic: 'https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-For-Discord.jpg',
          balance: 0,
          totalPnL: 0,
        },
      })
      return !!user
    },

    loginUser: async (_: any, { data }: ILoginInput, context: IContext) => {
      const user = await context.prisma.user.findUnique({
        where: { username: data.username },
      })

      if (user) {
        if (await comparePassword(data.password, user.password)) {
          return getSignedToken({ uid: user.id })
        }
      }

      throw new UserInputError('User not found')
    },
  },

  User: {
    trades: async (parent:IUser, _:any, { prisma }:IContext) => {
      prisma.trade.findMany({ where: { userId: parent.id } })
    },

    numOfTrades: async (parent:IUser, _:any, { prisma, cache }:IContext) => {
      const numOfTrades = await prisma.trade.count({ where: { userId: parent.id } })
      cache.put('numOfTrades', numOfTrades)
      return numOfTrades
    },

    numOfWins: async (parent:IUser, _:any, { prisma, cache }:IContext) => {
      const numOfWins = await prisma.trade.count({
        where: {
          AND: [
            { userId: parent.id },
            { pnl: { gt: 0 } },
          ],
        },
      })

      cache.put('numOfWins', numOfWins)

      return numOfWins
    },

    accuracy: async (parent:IUser, _:any, { cache }:IContext) => calculateAccuracy(cache),
  },
}
