import { pool } from "../../../../../../lib/db";

export async function GET(req, { params }) {
    const conn = await pool.getConnection(); // Get a connection
    try {
        const { admin_id } = await params;

        // Fetch reverse transactions for the given admin_id
        const [reverseTransactions] = await conn.query(
            "SELECT * FROM Reverse_transaction WHERE admin_id = ?", 
            [admin_id]
        );

        if (reverseTransactions.length === 0) {
            return Response.json({ message: "No reverse transactions found" }, { status: 404 });
        }

        return Response.json(reverseTransactions);

    } catch (error) {
        console.error("Error fetching reverse transactions:", error);
        return Response.json({ error: "Failed to fetch reverse transactions" }, { status: 500 });
    } finally {
        conn.release(); // Always release the connection
    }
}
