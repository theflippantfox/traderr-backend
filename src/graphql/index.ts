import { makeExecutableSchema } from '@graphql-tools/schema'
import { Config } from 'apollo-server-core'
import fs from 'fs'
import path from 'path'
import { NODEENV } from '../conf'
import { context } from './context'
import { resolvers } from './resolvers'

const schemaFile = fs.readFileSync(
  path.join(__dirname, "schema.graphql")
).toString('utf-8')

const schema = makeExecutableSchema({ typeDefs: schemaFile, resolvers })

export const apolloConfig: Config = {
  schema,
  plugins: [],
  nodeEnv: NODEENV,
  context: ({ req }) => context(req)
}