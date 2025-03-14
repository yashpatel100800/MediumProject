import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.get('/', (c) => {
  return c.text('Hello world!')
})

app.post('/api/v1/signup',async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const user = await prisma.user.create({
    data:{
      email: body.email,
      password: body.password
    }
  })

  const token = sign({ id: user.id },c.env.JWT_SECRET)

  return c.text('/api/v1/signup')
})

app.post('/api/v1/signin', (c) => {
  return c.text('/api/v1/signin!')
})

app.get('/api/v1/blog', (c) => {
  return c.text('/api/v1/blog get!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})


export default app
