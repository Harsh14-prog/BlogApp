import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt, sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  }; 
  Variables: {
    userId: string;
  };
}>();

 userRouter.post('/signup' ,  async (c) => {
  try {
    const body = await c.req.json();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });

    const token = await sign({ id: user.id }, c.env.SECRET);
    return c.json({ token });
  } catch (err) {
    return c.json({ error: "Something went wrong during signup" }, 500);
  }
})

userRouter.post('/signin' , async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      c.status(403);
      return c.json({ error: "Invalid Credentials" });
    }

    const token = await sign({ id: user.id }, c.env.SECRET);
    return c.json({ token });
  } catch (error) {
    return c.json({ error: "Something went wrong during signin" }, 500);
  }
})
