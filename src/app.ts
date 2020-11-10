// App Index
import Express from 'express'

(async () => {
  const app = Express()
  app.use(require('cors')())
  app.get('/', (_, res) => { res.send('Hello World!!!') })

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log('🚀 Server Is Running!!!')
  })
})()
