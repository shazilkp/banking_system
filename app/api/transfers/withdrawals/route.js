import { nanoid } from "nanoid";
import { pool } from "../../../../lib/db";

export async function POST(req) {
    try {
        const { acc_no, cust_id, amount } = await req.json();

        if (!acc_no || !cust_id || !amount || amount <= 0) {
            return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Check if account belongs to customer
            const [account] = await connection.execute(
                "SELECT status,balance FROM Account WHERE account_no = ? AND cust_id = ? FOR UPDATE",
                [acc_no, cust_id]
            );

            if (account.length === 0) {
                throw new Error("Account not found or does not belong to the customer");
            }

            if (account[0].status !== "active") {
                return Response.json({ error: "Cannot withdraw from an inactive account" }, { status: 401 });
            }

            if (account[0].balance < amount) {
                throw new Error("Insufficient balance");
            }

            // Deduct amount from account
            await connection.execute(
                "UPDATE Account SET balance = balance - ? WHERE account_no = ?",
                [amount, acc_no]
            );

            const withdrawal_id = `WD-${nanoid(10)}`;

            // Insert withdrawal record
            await connection.execute(
                "INSERT INTO Withdrawal (withdrawal_id, acc_no, cust_id, amount) VALUES (?, ?, ?, ?)",
                [withdrawal_id, acc_no, cust_id, amount]
            );

            await connection.commit();
            connection.release();

            return Response.json({ message: "Withdrawal successful", withdrawal_id }, { status: 200 });
        } catch (error) {
            await connection.rollback();
            connection.release();
            return Response.json({ error: error.message }, { status: 400 });
        }
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
