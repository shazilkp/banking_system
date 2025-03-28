import { pool } from "../../../../../../lib/db";

export async function PATCH(req, {params}) {
    const conn = await pool.getConnection(); // Get a connection
    try {
        const { trans_id } = params;
        const { admin_id, reason } = await req.json();

        // Fetch transaction details
        const [transaction] = await conn.query("SELECT sender_acc_no, receiver_acc_no, amount FROM Transactions WHERE trans_id = ?", [trans_id]);
        if (transaction.length === 0) {
            return Response.json({ error: "Transaction not found" }, { status: 404 });
        }

        const { sender_acc_no, receiver_acc_no, amount } = transaction[0];

        await conn.beginTransaction(); // Start transaction

        // Insert into Reverse_transaction
        await conn.execute("INSERT INTO Reverse_transaction (admin_id, trans_id, reason) VALUES (?, ?, ?)", 
            [admin_id, trans_id, reason]
        );

        // Refund sender (if exists)
        if (sender_acc_no) {
            await conn.execute("UPDATE Account SET balance = balance + ? WHERE account_no = ?", 
                [amount, sender_acc_no]
            );
        }

        // Deduct from receiver (if exists)
        if (receiver_acc_no) {
            await conn.execute("UPDATE Account SET balance = balance - ? WHERE account_no = ?", 
                [amount, receiver_acc_no]
            );
        }

        await conn.commit(); // Commit transaction
        return Response.json({ message: "Transaction reversed successfully" });

    } catch (error) {
        await conn.rollback(); // Rollback on failure
        console.error("Error reversing transaction:", error);
        return Response.json({ error: "Transaction reversal failed" }, { status: 500 });
    } finally {
        conn.release(); // Always release the connection
    }
}
