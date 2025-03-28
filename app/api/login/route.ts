import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { cookies } from "next/headers"
import { pool } from "../../../lib/db"; // Instead of @/lib/db




// Define validation schema for login
const loginSchema = z.object({
  userId: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(1, "Password is required"),
})

// This would fetch a user from your database
async function findUserByEmail(email: string) {
  // In a real application, you would:
  // 1. Query your database for the user with this email
  // 2. Return the user if found, or null if not

  // This is a placeholder - replace with your database logic
  // For demo purposes, we'll return a mock user
  if (email === "user@example.com") {
    return {
      id: "user_123",
      email: "user@example.com",
      name: "Test User",
      passwordHash: await bcrypt.hash("password123", 10), // In a real app, this would be stored in the DB
    }
  }

  return null
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate input
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    const { userId, password } = result.data

    // Find user by email

    const [rows] = await pool.query("SELECT user_id, email, pass_hash FROM users WHERE user_id = ?", [userId]);
    const users = rows as any[];

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.pass_hash)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const [adminCheck] = await pool.query("SELECT * FROM Admin WHERE admin_id = ?", [userId]);
    const admins = adminCheck as any[];

    let roles = "customer"; // Default role

    if(admins.length > 0){
      roles = "admin"
    }

    console.log(roles);
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email, role: roles },
      process.env.JWT_SECRET || "fallback_secret_for_development_only",
      { expiresIn: "7d" },
    )

    // Set HTTP-only cookie with the token

    cookies().set("auth_token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    

    // Return user info (without password)
    const { passwordHash, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

