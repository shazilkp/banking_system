import { nanoid } from 'nanoid';
import { pool } from "../../../lib/db";

export async function POST(req) {
    try {
        const { sender_acc_no, receiver_acc_no, amount } = await req.json();

        if (!sender_acc_no || !receiver_acc_no || !amount || amount <= 0) {
            return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Check sender balance
            const [sender] = await connection.execute(
                "SELECT balance FROM Account WHERE account_no = ? FOR UPDATE",
                [sender_acc_no]
            );

            if (sender.length === 0) {
                throw new Error("Sender account not found");
            }

            if (sender[0].balance < amount) {
                throw new Error("Insufficient funds");
            }

            // Deduct from sender
            await connection.execute(
                "UPDATE Account SET balance = balance - ? WHERE account_no = ?",
                [amount, sender_acc_no]
            );

            // Add to receiver
            await connection.execute(
                "UPDATE Account SET balance = balance + ? WHERE account_no = ?",
                [amount, receiver_acc_no]
            );

            const trans_id = `TRS-${nanoid(10)}`;

            // Log transaction
            await connection.execute(
                "INSERT INTO Transactions (trans_id, sender_acc_no, receiver_acc_no, amount) VALUES (?, ?, ?, ?)",
                [trans_id,sender_acc_no, receiver_acc_no, amount]
            );

            await connection.commit();
            connection.release();

            return Response.json({ message: "Transfer successful" }, { status: 200 });
        } catch (error) {
            await connection.rollback();
            connection.release();
            return Response.json({ error: error.message }, { status: 400 });
        }
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
