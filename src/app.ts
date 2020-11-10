// App Index
import 'reflect-metadata'
import Express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { PrismaClient } from '@prisma/client'

// Generated TypeGraphQL Resolvers
import { resolvers as Generated } from '@generated/type-graphql'

// TypeGraphQL Custom Resolvers
import { resolvers as Custom } from './modules'

interface Context {
  prisma: PrismaClient
}

(async () => {
  const app = Express()
  app.use(require('cors')())
  app.get('/', (_, res) => { res.send('Hello World!!!') })

  const prisma = new PrismaClient()
  const schema = await buildSchema({ resolvers: [...Custom, ...Generated], validate: false })
  const apollo = new ApolloServer({
    schema,
    context: { prisma } as Context,
    introspection: true,
    playground: true
  })
  apollo.applyMiddleware({ app })

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log('🚀 Server Is Running!!!')
  })
})()
