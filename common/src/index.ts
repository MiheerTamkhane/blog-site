import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

// createPostInput / CreatePostInput

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});

export type CreatePostInput = z.infer<typeof createPostInput>;
// updatePostInput / UpdatePostInput

export const updatePostInput = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});

export type UpdatePostInput = z.infer<typeof updatePostInput>;
