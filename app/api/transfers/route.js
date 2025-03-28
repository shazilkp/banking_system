import { nanoid } from "nanoid";
import { pool } from "../../../lib/db";

export async function POST(req) {
    try {
        const { sender_acc_no, receiver_acc_no, amount } = await req.json();

        if (!sender_acc_no || !receiver_acc_no || !amount || amount <= 0) {
            return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            
            // Fetch receiver account status
            const [receiver_account] = await connection.execute(
                "SELECT status FROM Account WHERE account_no = ?",
                [receiver_acc_no]
            );
            
            if (receiver_account.length === 0) {
                return new Response(JSON.stringify({ error: "Receiver account not found" }), { status: 404 });
            }

            if (receiver_account[0].status !== "active") {
                return new Response(JSON.stringify({ error: "Cannot transfer to an inactive account" }), { status: 401 });
            }

            // Check sender balance
            const [sender] = await connection.execute(
                "SELECT status, balance FROM Account WHERE account_no = ?",
                [sender_acc_no]
            );

            if (sender.length === 0) {
                return new Response(JSON.stringify({ error: "Sender account not found" }), { status: 404 });
            }
            
            if (sender[0].status !== "active") {
                return new Response(JSON.stringify({ error: "Cannot transfer from an inactive account" }), { status: 401 });
            }
            
            if (sender[0].balance < amount) {
                return new Response(JSON.stringify({ error: "Insufficient funds" }), { status: 400 });
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
                [trans_id, sender_acc_no, receiver_acc_no, amount]
            );
            

            await connection.commit();
            
            return new Response(JSON.stringify({ message: "Transfer successful" }), { status: 200 });

        } catch (error) {
            await connection.rollback();
            return new Response(JSON.stringify({ error: error.message }), { status: 400 });
        } finally {
            connection.release(); // Ensure connection is released
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
