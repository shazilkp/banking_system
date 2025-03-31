//gives back all pendinf accounts

import { pool } from "../../../../../lib/db";

export async function GET() {
    try {
        // Query to fetch all accounts with status "pending"
        const [accounts] = await pool.execute(
            "SELECT * FROM Account WHERE status = ?",
            ["pending"]
        );

        return Response.json({ accounts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching pending accounts:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}