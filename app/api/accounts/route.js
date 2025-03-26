import { pool } from "../../../lib/db";
import { nanoid } from 'nanoid';

export async function POST(req) {
    try {
        const body = await req.json();
        const { cust_id, account_type, initial_balance = 0 } = body;

        if (!cust_id || !account_type) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate a unique account number
        const account_no = `ACC-${nanoid(10)}`;

        // Insert into the database
        const query = `
            INSERT INTO Account (account_no, balance, status, cust_id, account_type)
            VALUES (?, ?, 'pending', ?, ?)
        `;
        const values = [account_no, initial_balance, cust_id, account_type];

        await pool.execute(query, values);

        return Response.json({ message: 'Account created (pending approval)', account_no }, { status: 201 });

    } catch (error) {
        console.error('Error creating account:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
