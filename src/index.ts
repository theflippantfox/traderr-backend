import {ApolloServer} from 'apollo-server-express'
import express from 'express'
import http from 'http'
import { PORT } from './conf'
import { apolloConfig } from './graphql'

const startServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const apolloServer = new ApolloServer(apolloConfig)

  await apolloServer.start()
  apolloServer.applyMiddleware({app})

  httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  })
}

startServer()