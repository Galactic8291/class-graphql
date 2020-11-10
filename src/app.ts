// App Index
import 'reflect-metadata'
import Express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

// TypeGraphQL Custom Resolvers
import { resolvers } from './modules'

(async () => {
  const app = Express()
  app.use(require('cors')())
  app.get('/', (_, res) => { res.send('Hello World!!!') })

  const schema = await buildSchema({ resolvers: [...resolvers], validate: true })
  const apollo = new ApolloServer({
    schema,
    introspection: true,
    playground: true
  })
  apollo.applyMiddleware({ app })

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log('🚀 Server Is Running!!!')
  })
})()
