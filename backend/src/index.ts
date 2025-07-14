import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono <{
    Bindings : {
        DATABASE_URL : string ,
    }
}>()


app.post('api/v1/signup' , async (c) => {
    const body = await c.req.json()

   const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL 
   }).$extends(withAccelerate())

   const response = await prisma.user.create({
      data : {
         email : body.email ,
         password : body.password ,
      }
   })
})

app.post('api/v1/signin' , (c) => {

})

app.post('api/v1/blog' , (c) => {

})

app.put('/api/v1/post' , (c) => {

})

app.get('/api/v1/post/:id' , (c) => {

})

export default app
