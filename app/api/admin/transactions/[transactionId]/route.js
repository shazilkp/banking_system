import { pool } from "../../../../../lib/db";

export async function GET(req, { params }) {
    const conn = await pool.getConnection();
    console.log("Params received:", params);

    try {
        const { transactionId } = await params;
        console.log("Fetching transaction for ID:", transactionId);

        // Query the database
        const [transaction] = await conn.query(
            "SELECT * FROM Transactions WHERE trans_id = ?", 
            [transactionId]
        );
        console.log("Query result:", transaction);

        if (!transaction.length) {
            console.log("Transaction not found.");
            return Response.json({ error: "Transaction not found" }, { status: 404 });
        }

        return Response.json({
            transactionId: transaction[0].trans_id,
            senderAccNo: transaction[0].sender_acc_no,
            receiverAccNo: transaction[0].receiver_acc_no,
            amount: transaction[0].amount,
            status: transaction[0].status,
            date: transaction[0].timestamp
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching transaction:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    } finally {
        conn.release();
    }
}
