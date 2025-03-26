import { pool } from "../../../../../lib/db";
import { nanoid } from "nanoid";

export async function POST(req) {
    try {
        const { acc_no, admin_id, amount } = await req.json();

        // Validate input
        if (!acc_no || !admin_id || amount <= 0) {
            return Response.json({ error: "Invalid account number, admin ID, or amount" }, { status: 400 });
        }

        // Start transaction
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // Check if account exists and is active
            const [account] = await pool.execute(
                "SELECT status FROM Account WHERE account_no = ?",
                [acc_no]
            );

            if (account.length === 0) {
                return Response.json({ error: "Account not found" }, { status: 404 });
            }

            if (account[0].status !== "active") {
                return Response.json({ error: "Cannot deposit to an inactive account" }, { status: 401 });
            }

            // Update account balance
            const updateBalanceQuery = "UPDATE Account SET balance = balance + ? WHERE account_no = ?";
            const [balanceResult] = await conn.execute(updateBalanceQuery, [amount, acc_no]);

            if (balanceResult.affectedRows === 0) {
                await conn.rollback();
                return Response.json({ error: "Account not found" }, { status: 404 });
            }

            // Log deposit transaction
            const deposit_id = `DEP-${nanoid(10)}`;
            const insertDepositQuery = `
                INSERT INTO Deposit (deposit_id, acc_no, admin_id, amount)
                VALUES (?, ?, ?, ?)
            `;
            await conn.execute(insertDepositQuery, [deposit_id, acc_no, admin_id, amount]);

            // Commit transaction
            await conn.commit();
            return Response.json({ message: `Deposit of ${amount} successful`, deposit_id }, { status: 201 });

        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    } catch (error) {
        console.error("Error processing deposit:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
