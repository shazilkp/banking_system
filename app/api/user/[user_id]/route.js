//gives customerinformation,given cust id

import { pool } from "../../../../lib/db";

export async function GET(req, {params}) {
    try {
        console.log("backend fired");
        const { user_id } = await params;

        if (!user_id) {
            return Response.json({ error: "Customerr id invalid" }, { status: 400 });
        }
        // Query to fetch all accounts with status "pending"
        const [customers] = await pool.execute(
            "SELECT * FROM Customer WHERE cust_id = ?",
            [user_id]
        );

        if (customers.length === 0) {
            return Response.json({ error: 'No customer found with given cust_id' }, { status: 404 });
        }

        console.log(customers);

        return Response.json({ customers }, { status: 200 });
    } catch (error) {
        console.error("Error fetching pending loan:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}