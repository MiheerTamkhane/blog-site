import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@photon-rex/blog-common";
export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  variables: {
    prisma: any;
  };
}>();

userRoute.post("/signup", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    return c.json({ message: "Please check email/password." });
  }
  try {
    const res = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!res) {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name,
        },
      });
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ token });
    }
    return c.json({
      message: "User with email already exists!",
      email: res.email,
    });
  } catch (err) {
    return c.status(403);
  }
});

userRoute.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return c.json({ message: "Please check email/password." });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }
  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ token });
});
