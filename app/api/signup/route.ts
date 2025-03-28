import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { pool } from "../../../lib/db";
import { z } from "zod"

console.log("🔥 Signup API hit!"); // If this doesn’t show up, the request is not reaching the backend.

// Define validation schema for signup
const signupSchema = z.object({
  userId: z.string().min(2, "UserID must be at least 2 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

// This would connect to your database
async function saveUser(userData: { name: string; email: string; passwordHash: string }) {
  // In a real application, you would:
  // 1. Check if user already exists
  // 2. Save the user to your database
  // 3. Return the created user (without password)

  // This is a placeholder - replace with your database logic
  console.log("User saved:", { ...userData, passwordHash: "[HIDDEN]" })

  return {
    id: "user_" + Math.random().toString(36).substring(2, 9),
    name: userData.name,
    email: userData.email,
    createdAt: new Date(),
  }
}

export async function POST(request: Request) {
  console.log("Received signup request...");
  try {
    // Parse request body
    const body = await request.json()
    console.log("Received signup request...");
    console.log("Received data:", body); // ✅ Log request data

    // Validate input
    const result = signupSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    const { userId,name, email, password } = result.data;

    const [existingUser] = await pool.query("SELECT user_id FROM users WHERE user_id = ?", [userId]);
    
    if ((existingUser as any[]).length > 0) {
      console.log("hello ",existingUser);
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Save user to database
  //  const user = await saveUser({ name, email, passwordHash })
    const [insertResult] = await pool.query(
      "INSERT INTO users (user_id, email, pass_hash) VALUES (?, ?, ?)",
      [userId, email, passwordHash]
    );

    const [custInsertResult] = await pool.query(
      "INSERT INTO customer (cust_id,customer_name) VALUES (?,?)",
      [userId,name]
    );

    // Return success response (without password)
    return NextResponse.json(
      { message: "User created successfully", userId: insertResult.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

