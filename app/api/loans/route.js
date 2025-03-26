import { pool } from "../../../lib/db";
import { nanoid } from 'nanoid';


function addMonthsToDate(startDate, months) {
    let newDate = new Date(startDate);
    newDate.setMonth(newDate.getMonth() + months); // Add months
    return newDate;
}

export async function POST(req) {
    try {
        const { borrower_id, principal_amount, interest, duration } = await req.json();

        const startDate = new Date();
        let repayment_date = addMonthsToDate(startDate,duration);
        repayment_date = repayment_date.toISOString().slice(0, 19).replace("T", " ")

        // Validate input
        if (!borrower_id || !principal_amount || principal_amount <= 0 || interest < 0 || !repayment_date) {
            return Response.json({ error: "Invalid input data" }, { status: 400 });
        }

        // Generate a unique loan ID
        const loan_id = `LOAN-${nanoid(10)}`;
        const remaining_amount = principal_amount + (principal_amount * interest * duration) / 1200.00; // Initially, remaining amount = principal

        // Insert loan record into the database
        const query = `
            INSERT INTO Loan (loan_id, principal_amount, remaining_amount, interest, borrower_id, repayment_date)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [loan_id, principal_amount, remaining_amount, interest, borrower_id, repayment_date];

        await pool.execute(query, values);

        return Response.json({ message: "Loan created successfully", loan_id }, { status: 201 });

    } catch (error) {
        console.error("Error creating loan:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
