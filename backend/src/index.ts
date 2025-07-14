import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt, sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const decodedToken = (await verify(token, c.env.SECRET)) as { id: string };
    c.set("userId", decodedToken.id);
    await next();
  } catch (e) {
    return c.json({ error: "Invalid token" }, 401);
  }
});

app.post("api/v1/signup", async (c) => {
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
});

app.post("api/v1/signin", async (c) => {
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
});

app.post("api/v1/blog", (c) => {});

app.put("/api/v1/post", (c) => {});

app.get("/api/v1/post/:id", (c) => {});

export default app;
