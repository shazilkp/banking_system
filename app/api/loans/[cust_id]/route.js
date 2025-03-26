import { pool } from "../../../../lib/db";

export async function GET(req, {params}) {
    try {
        
        const {cust_id} = params;

        if (!cust_id) {
            return Response.json({ error: "Customer ID is required" }, { status: 400 });
        }

        const query = `
            SELECT loan_id, principal_amount, remaining_amount, interest, created_at, repayment_date
            FROM Loan WHERE borrower_id = ?
            ORDER BY created_at DESC;
        `;

        const [rows] = await pool.execute(query, [cust_id]);

        return Response.json(rows, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
