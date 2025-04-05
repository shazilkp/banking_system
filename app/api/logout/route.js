import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Clear the 'auth_token' cookie
  cookieStore.set("auth_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // Expire it immediately
  });

  return NextResponse.json({ message: "Logged out successfully" });
}
