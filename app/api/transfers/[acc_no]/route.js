import { pool } from "../../../../lib/db";

export async function GET(req, { params }) {
    try {
        
        const { acc_no } = await params;
        //const [transactions] = ["hello"];

        

        if (!acc_no) {
            return Response.json({ error: "Account number is required" }, { status: 400 });
        }
        console.log("heelo undef",acc_no);



        const query = `
            SELECT 'transfer' AS type, trans_id AS id, sender_acc_no, receiver_acc_no, amount, timestamp 
            FROM Transactions WHERE sender_acc_no = ? OR receiver_acc_no = ?
            
            UNION ALL
            
            SELECT 'withdrawal' AS type, withdrawal_id AS id, acc_no AS sender_acc_no, NULL AS receiver_acc_no, amount, timestamp 
            FROM Withdrawal WHERE acc_no = ?
            
            UNION ALL
            
            SELECT 'deposit' AS type, deposit_id AS id, NULL AS sender_acc_no, acc_no AS receiver_acc_no, amount, timestamp 
            FROM Deposit WHERE acc_no = ?
            
            ORDER BY timestamp DESC;
        `;

        const [transactions] = await pool.execute(query, [acc_no, acc_no, acc_no, acc_no]);
        

        return Response.json({ transactions }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
