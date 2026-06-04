import { z } from "zod";

export const createSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  
  clerkId: z.string().min(1, { message: "Clerk ID wajib diisi" }),
  
  username: z.string().optional().nullable(),
});

export type CreateUserInput = z.infer<typeof createSchema>;