import { z, type MyZodType } from "../config/defaultZod";
import { mongodbIdSchema, passwordSchema } from "./elements";

export const loginSchema = z.object({
  email: z.string().email({ error: "Email must be valid" }),
  password: passwordSchema,
}) as z.ZodObject<MyZodType<LoginUserI>>;
const registerUserSchema = loginSchema.extend({
  firstName: z
    .string()
    .min(3, { error: "First name must have at least 3 letters" })
    .max(70, { error: "First name must have at most 70 letters" }),
  lastName: z
    .string()
    .min(3, { error: "Last name must have at least 3 letters" })
    .max(70, { error: "Last name must have at most 70 letters" }),
}) as z.ZodObject<MyZodType<RegisterUserI>>;

export const basicUserSchema = registerUserSchema.extend({
  phone: z.string().optional(),
  avatar: z.string().optional(),
  role: z.enum(["Admin", "User"]),
  isActive: z.boolean().optional(),
  borrowLimit: z.number().optional(),
  fines: z.number().optional(),
  books: z.object({
    borrowed: z.array(mongodbIdSchema),
    read: z.array(mongodbIdSchema),
    favorites: z.array(mongodbIdSchema),
  }),
}) as z.ZodObject<MyZodType<BasicUserI>>;

export const userSchema = z.looseObject({
  ...basicUserSchema.omit({ password: true }).shape,
  _id: mongodbIdSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  avatar: z.string().optional(),
  isActive: z.boolean().optional(),
  stats: z
    .object({
      totalBorrowedBooks: z.number(),
      totalReadBooks: z.number(),
      totalFavorites: z.number(),
    })
    .optional(),
}) as z.ZodObject<MyZodType<UserI>>;
