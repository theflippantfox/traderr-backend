import { PrismaClient } from '@prisma/client'
import { IUser } from '@typings/user.typings'
import { triggerAsyncId } from 'async_hooks'
import { CacheEmitter } from '@helpers/cacheEmitter'
import { verifyToken } from '../../services/auth.service'

const prisma = new PrismaClient()
const cache = new CacheEmitter()

export const context = async (req: any) => {
  const { authorization } = req.headers

  if (authorization && authorization !== '') {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
      const data = verifyToken(token)

      if (data.uid) {
        const currentUser = await prisma.user.findUnique({
          where: { id: data.uid },
        })

        return {
          prisma,
          currentUser,
          cache,
        }
      }
    }
  }
  return { prisma, cache }
}

export type IContext = {
  prisma: typeof prisma
  currentUser: IUser
  cache: typeof cache
}
