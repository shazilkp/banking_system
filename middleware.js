import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const config = {
    matcher: ["/api/admin/:path*", "/admin/:path*", "/dashboard" ,"/"], // Protects /admin and its subroutes
};

export async function middleware(request) {
    const token = cookies().get("auth_token")?.value;
    const url = request.nextUrl.clone();

    if (url.pathname === "/") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    if (!token) {
        if (url.pathname !== "/login") {
            url.pathname = "/login";
            console.log("middleware activated");
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }


    try {
        // Convert secret key to Uint8Array for `jose`
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_development_only");

        // Verify token using `jose`
        const { payload } = await jwtVerify(token, secretKey);

        if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/admin")) {
            // Restrict access to admins only
            if (payload.role !== "admin") {
                return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
            }
        }

        if (url.pathname.startsWith("/dashboard")) {
            // Restrict access to admins only
            if (payload.role === "admin") {
                url.pathname = "/admin";
                return NextResponse.redirect(url);
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
}
