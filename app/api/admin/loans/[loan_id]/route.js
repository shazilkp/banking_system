import { pool } from "../../../../../lib/db";
import { nanoid } from "nanoid";

export async function PATCH(req, { params }) {
    try {
        const { loan_id } = params;
        const { status, admin_id } = await req.json();
        //console.log(loan_id,status, admin_id)
        // Validate input
        if (!loan_id || !status || !admin_id || !["approved", "rejected", "closed","pending"].includes(status)) {
            return Response.json({ error: "Invalid loan ID, status, or admin ID" }, { status: 400 });
        }

        // Begin transaction
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // Update loan status
            const query = "UPDATE Loan SET status = ? WHERE loan_id = ?";
            const [result] = await conn.execute(query, [status, loan_id]);

            if (result.affectedRows === 0) {
                await conn.rollback();
                return Response.json({ error: "Loan not found or status unchanged" }, { status: 404 });
            }

            // Log admin action
            const admin_action_id = `ACT-${nanoid(10)}`;
            const logQuery = `
                INSERT INTO admin_loan_action (admin_action_id, admin_id, loan_id, type)
                VALUES (?, ?, ?, ?)
            `;
            await conn.execute(logQuery, [admin_action_id, admin_id, loan_id, status]);

            // Commit transaction
            await conn.commit();
            return Response.json({ message: `Loan status updated to ${status}` }, { status: 200 });

        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    } catch (error) {
        console.error("Error updating loan status:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
