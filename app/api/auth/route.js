import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET(req) {
    try {
        const token = cookies().get("auth_token")?.value;
        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_development_only");
        const { payload } = await jwtVerify(token, secretKey);

        return Response.json({ userId: payload.userId });
    } catch (error) {
        return Response.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }
}
