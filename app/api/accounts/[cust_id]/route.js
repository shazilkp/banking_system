import { pool } from "../../../../lib/db";

export async function GET(req, { params }) {
    try {
        const { cust_id } = params;

        if (!cust_id) {
            return Response.json({ error: 'Customer ID is required' }, { status: 400 });
        }

        // Fetch accounts linked to the given customer
        const [accounts] = await pool.execute(
            "SELECT * FROM Account WHERE cust_id = ?",
            [cust_id]
        );

        if (accounts.length === 0) {
            return Response.json({ error: 'No accounts found for this customer' }, { status: 404 });
        }

        return Response.json({ accounts }, { status: 200 });

    } catch (error) {
        console.error('Error fetching accounts:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
