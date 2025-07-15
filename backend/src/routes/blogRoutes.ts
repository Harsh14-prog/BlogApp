import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return c.json({ error: "Unauthorized access: No token" }, 401);
  }

  try {
    const decodedToken = (await verify(token, c.env.SECRET)) as { id: string };
    c.set("userId", decodedToken.id);
    await next();
  } catch {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });

    return c.json({ id: post.id });
  } catch (error) {
    return c.json({ error: "Failed to create blog" }, 500);
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ id: post.id });
  } catch (error) {
    return c.json({ error: "Failed to update blog" }, 500);
  }
});

blogRouter.get("/", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.query("id");
    const post = await prisma.post.findFirst({
      where: { id },
    });

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json({ post });
  } catch (error) {
    return c.json({ error: "Failed to get a blog" }, 500);
  }
});

blogRouter.get("/bulk", async (c) => {
     const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  let page = parseInt(c.req.query("page") || "1")
  let limit = parseInt(c.req.query("limit") || "10")

  let skip = (page-1) * limit ;

  let totalPosts = await prisma.post.count()
  
  const posts = await prisma.post.findMany()
  return c.json({posts})
});
