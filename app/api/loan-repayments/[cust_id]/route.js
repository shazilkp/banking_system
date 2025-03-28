import { pool } from "../../../../lib/db";

export async function GET(req, {params}) {
    try {
        const {cust_id} = await params;

        if (!cust_id) {
            return Response.json({ error: "Customer ID is required" }, { status: 400 });
        }

        const connection = await pool.getConnection();
        try {
            // Fetch all loans for the customer
            const [loans] = await connection.execute(
                "SELECT * FROM Loan WHERE borrower_id = ?",
                [cust_id]
            );

            if (loans.length === 0) {
                return Response.json({ error: "No loans found for this customer" }, { status: 404 });
            }

            const loanIds = loans.map(loan => loan.loan_id);
            
            // Fetch all loan transactions for these loans
            const [transactions] = await connection.execute(
                `SELECT * FROM LoanTransaction WHERE loan_id IN (${loanIds.map(() => "?").join(",")})`,
                loanIds
            );
            
            connection.release();

            return Response.json({ transactions }, { status: 200 });
        } catch (error) {
            connection.release();
            return Response.json({ error: error.message }, { status: 400 });
        }
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

