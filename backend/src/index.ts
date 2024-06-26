import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { cors } from "hono/cors";
import { userRoute } from "./routes/user";
import { blogRoute } from "./routes/blog";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  variables: {
    prisma: any;
  };
}>();

app.use("/*", cors());
app.use("*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  c.set("prisma", prisma);
  await next();
});

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);
export default app;
