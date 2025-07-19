import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { signupInput } from "harshad14-medium-common";

export const userRouter = new Hono();

userRouter.post('/signup', async (c) => {
  try {
    const body = await c.req.json();
    console.log("Signup body:", body);

    const parsed = signupInput.safeParse(body);
    if (!parsed.success) {
      c.status(411);
      return c.json({ message: "Inputs are not correct", error: parsed.error.format() });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      c.status(409);
      return c.json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.SECRET);
    return c.json({ token });
  } catch (err) {
    console.error("Signup error:", err);
    return c.json({ error: "Something went wrong during signup" }, 500);
  }
});


userRouter.post('/signin', async (c) => {
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
    }
    catch (error) {
        return c.json({ error: "Something went wrong during signin" }, 500);
    }
});
