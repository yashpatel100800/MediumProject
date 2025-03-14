import { Hono } from 'hono'
import getPrismaClient from '../getprismaclient'
import { decode, sign, verify } from 'hono/jwt'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

userRouter.post('signup', async (c) => {
    const prisma = getPrismaClient(c)
      const body = await c.req.json()
    
      const user = await prisma.user.create({
        data:{
          email: body.email,
          password: body.password
        }
      })
    
      const token = await sign({ id: user.id },c.env.JWT_SECRET)
      return c.json({ token })

})

userRouter.post('signin', async (c) => {
    const prisma = getPrismaClient(c)
    const body = await c.req.json()

    const user = await prisma.user.findUnique({
    where:{
        email: body.email
    }
    })

    if(!user){
    c.status(403)
    return c.json({error:'User not found!'})
    }

    return c.json({ token: await sign({ id: user.id },c.env.JWT_SECRET) })

})