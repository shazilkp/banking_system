//gives back all pendinf accounts

import { pool } from "../../../../../lib/db";

export async function GET() {
    try {
        // Query to fetch all accounts with status "pending"
        const [loans] = await pool.execute(
            "SELECT * FROM Loan WHERE status = ?",
            ["pending"]
        );

        return Response.json({ loans }, { status: 200 });
    } catch (error) {
        console.error("Error fetching pending loan:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}