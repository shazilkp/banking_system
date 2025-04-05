import { pool } from "../../../../../lib/db";
import { nanoid } from "nanoid";

export async function PATCH(req, { params }) {
    try {
        const { acc_no } = await params;
        const { status, admin_id, action_type } = await req.json();
        console.log(acc_no,status, admin_id, action_type)
        if (!acc_no || !admin_id || !["active", "inactive", "closed","pending"].includes(status) ||
            !["approve", "freeze", "close"].includes(action_type)) {
            return Response.json({ error: "Invalid account number, status, admin ID, or action type" }, { status: 400 });
        }

        // Start transaction
        const conn = await pool.getConnection();
        await conn.beginTransaction();

        // Update account status
        const updateQuery = "UPDATE Account SET status = ? WHERE account_no = ?";
        const [result] = await conn.execute(updateQuery, [status, acc_no]);

        //console.log(result);
        if (result.affectedRows === 0) {
            await conn.rollback();
            return Response.json({ error: "Account not found" }, { status: 404 });
        }

        // Log the admin action with the correct action type
        const actionId = `ACT-${nanoid(10)}`;
        const logQuery = `
            INSERT INTO admin_account_action (admin_action_id, admin_id, acc_no, type)
            VALUES (?, ?, ?, ?)
        `;
        await conn.execute(logQuery, [actionId, admin_id, acc_no, action_type]);

        // Commit transaction
        await conn.commit();
        conn.release();

        return Response.json({ message: `Account status updated to ${status} and action ${action_type} logged successfully.` }, { status: 200 });

    } catch (error) {
        console.error("Error updating account status:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
