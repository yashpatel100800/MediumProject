import { Hono } from 'hono'
import getPrismaClient from './getprismaclient'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.get('/', (c) => {
  return c.text('Hello world!')
})

app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)



export default app
