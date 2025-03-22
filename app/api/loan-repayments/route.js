import { pool } from "../../../lib/db";
import { nanoid } from "nanoid";

export async function POST(req) {
    try {
        const { loan_id, repayer_acc_no, amount_paid } = await req.json();

        // Validate input
        if (!loan_id || !repayer_acc_no || !amount_paid || amount_paid <= 0) {
            return Response.json({ error: 'Invalid input data' }, { status: 400 });
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Check if loan exists
            const [loanRows] = await connection.execute(
                'SELECT remaining_amount FROM Loan WHERE loan_id = ?',
                [loan_id]
            );

            if (loanRows.length === 0) {
                throw new Error('Loan not found');
            }

            const remaining_amount = loanRows[0].remaining_amount;

            if (remaining_amount <= 0) {
                throw new Error('Loan already repaid');
            }

            // Insert loan repayment transaction
            const transaction_id = `TRX-${nanoid(10)}`; // Generate unique transaction ID
            await connection.execute(
                `INSERT INTO LoanTransaction (transaction_id, loan_id, repayer_acc_no, amount_paid) 
                 VALUES (?, ?, ?, ?)`,
                [transaction_id, loan_id, repayer_acc_no, amount_paid]
            );

            // Update loan remaining amount
            const new_remaining = Math.max(remaining_amount - amount_paid, 0);
            await connection.execute(
                'UPDATE Loan SET remaining_amount = ? WHERE loan_id = ?',
                [new_remaining, loan_id]
            );

            await connection.commit();

            return Response.json({
                message: 'Loan repayment successful',
                transaction_id,
                new_remaining
            }, { status: 201 });

        } catch (error) {
            await connection.rollback();
            return Response.json({ error: error.message }, { status: 400 });
        } finally {
            connection.release();
        }

    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
