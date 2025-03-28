import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const config = {
    matcher: "/api/admin/:path*",
};

export async function middleware(request) {
    const token = cookies().get("auth_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    try {
        // Convert secret key to Uint8Array for `jose`
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_development_only");

        // Verify token using `jose`
        const { payload } = await jwtVerify(token, secretKey);

        // Restrict access to admins only
        if (payload.role !== "admin") {
            return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Admin Middleware error:", error);
        return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }
}
