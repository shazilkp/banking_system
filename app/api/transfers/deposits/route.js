import { nanoid } from "nanoid";
import { pool } from "../../../../lib/db";

export async function POST(req) {
    try {
        const { acc_no, admin_id, amount } = await req.json();

        if (!acc_no) {
            return Response.json({ error: "Invalid input" }, { status: 400 });
        }
        if (!admin_id) {
            return Response.json({ error: "Unauthorized access" }, { status: 401 });
        }
        if (!amount) {
            return Response.json({ error: "Invalid input" }, { status: 402 });
        }
        if (amount <= 0) {
            return Response.json({ error: "Invalid input" }, { status: 403 });
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Check if account exists
            const [account] = await connection.execute(
                "SELECT status, balance FROM Account WHERE account_no = ? FOR UPDATE",
                [acc_no]
            );

            if (account.length === 0) {
                throw new Error("Account not found");
            }

            if (account[0].status !== "active") {
                return Response.json({ error: "Cannot deposit into an inactive account" }, { status: 401 });
            }

            // Verify if admin exists
            const [admin] = await connection.execute(
                "SELECT admin_id FROM Admin WHERE admin_id = ?",
                [admin_id]
            );

            if (admin.length === 0) {
                throw new Error("Unauthorized admin");
            }

            // Add amount to account balance
            await connection.execute(
                "UPDATE Account SET balance = balance + ? WHERE account_no = ?",
                [amount, acc_no]
            );

            const deposit_id = `DP-${nanoid(10)}`;

            // Insert deposit record
            await connection.execute(
                "INSERT INTO Deposit (deposit_id, acc_no, admin_id, amount) VALUES (?, ?, ?, ?)",
                [deposit_id, acc_no, admin_id, amount]
            );

            await connection.commit();
            connection.release();

            return Response.json({ message: "Deposit successful", deposit_id }, { status: 200 });
        } catch (error) {
            await connection.rollback();
            connection.release();
            return Response.json({ error: error.message }, { status: 400 });
        }
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
