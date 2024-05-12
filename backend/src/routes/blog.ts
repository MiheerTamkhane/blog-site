import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@photon-rex/blog-common";
export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  variables: {
    userId: string;
    prisma: any;
  };
}>();

blogRoute.use("/*", async (c, next) => {
  // get the header
  const header = c.req.header("authorization") || "";
  if (!header) {
    c.status(403);
    return c.json({ message: "User is Unauthorized!" });
  }
  const token = header.split(" ")[1];
  // verify the header
  const res = await verify(token, c.env.JWT_SECRET);
  if (!res.id) {
    // if the header is correct then proceed
    c.status(403);
    return c.json({ message: "User is Unauthorized!" });
  } else {
    // else return a 403 error.
  }
  c.set("userId", res.id);
  await next();
});

blogRoute.post("/", async (c) => {
  const userId = c.get("userId");
  if (!userId) {
    return c.json({ message: "User is not authenticated." });
  }
  const prisma = c.get("prisma");

  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    return c.json({ message: "Filled Data is not valid." });
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
      authorId: userId,
    },
  });
  if (!post) {
    return c.json({ message: "Something went wrong." });
  }
  return c.json({ post });
});

blogRoute.put("/", async (c) => {
  const userId = c.get("userId");
  if (!userId) {
    return c.json({ message: "User is not authenticated." });
  }
  const prisma = c.get("prisma");

  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    return c.json({ message: "Filled Data is not valid." });
  }
  const updatedPost = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
    },
  });
  return c.json({ post: updatedPost });
});

blogRoute.get("/bulk", async (c) => {
  const userId = c.get("userId");
  if (!userId) {
    return c.json({ message: "User is not authenticated." });
  }
  const prisma = c.get("prisma");

  const posts = await prisma.post.findMany({});

  return c.json({ blogs: posts });
});

blogRoute.get("/:id", async (c) => {
  const userId = c.get("userId");
  const id = Number(c.req.param("id"));
  if (!userId) {
    return c.json({ message: "User is not authenticated." });
  }
  const prisma = c.get("prisma");
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    return c.json({ message: "Post not found." });
  }
  return c.json({ post });
});
