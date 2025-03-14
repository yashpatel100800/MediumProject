import { Hono } from 'hono'
import getPrismaClient from '../getprismaclient'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()


blogRouter.get('/api/v1/blog', (c) => {
    return c.text('/api/v1/blog get!')
})
  
blogRouter.put('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
})
  
blogRouter.post('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
})
  