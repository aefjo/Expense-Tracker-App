import { Request, Response } from "express";
import { db } from "../../config/db";
import { users } from "../../config/schema";
import { eq } from "drizzle-orm";
// Asumsi: Pastikan createSchema di user.validation mengecek: email, clerkId, dan username
import { createSchema } from "./user.validation"; 

export class UserController {
    POST = async (req: Request, res: Response) => {
        try {
            // 1. Validasi data masuk dari Frontend setelah sukses login Clerk
            const validatedData = createSchema.parse(req.body);
            const { email, clerkId, username } = validatedData;

            // 2. Cari berdasarkan clerkId (Lebih aman & cepat daripada email)
            const existingUser = await db
                .select()
                .from(users)
                .where(eq(users.clerkId, clerkId))
                .limit(1); // Limit 1 untuk optimasi query

            // 3. KONDISI: Jika user BELUM TERDAFTAR di database kita
            if (existingUser.length === 0) {
                const newUser = {
                    clerkId: clerkId,
                    email: email,
                    // Jika username dari Google kosong, fallback ke string default
                    username: username || "Google User", 
                };

                const [createdUser] = await db
                    .insert(users)
                    .values(newUser)
                    .returning();

                return res.status(201).json({
                    success: true,
                    message: "User registered successfully in local DB",
                    data: createdUser
                });
            }

            // 4. KONDISI: Jika user SUDAH ADA (Hanya login biasa)
            // Menggunakan HTTP 200 OK (bukan 201 Created) karena tidak membuat data baru
            return res.status(200).json({
                success: true,
                message: "User authenticated successfully",
                data: existingUser[0] // Return objeknya langsung, bukan array
            });

        } catch (error: any) {
            console.error("Auth Sync Error:", error);
            
            // Jika error disebabkan oleh Zod (validasi gagal)
            if (error.name === "ZodError") {
                return res.status(400).json({ success: false, message: 'Validation Error', error: error.errors });
            }

            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

export default new UserController();