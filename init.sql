CREATE TABLE Users(
    user_id VARCHAR(30) PRIMARY KEY,
    email VARCHAR(100),
    pass_hash VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Customer (
    cust_id VARCHAR(30) PRIMARY KEY,
    customer_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (cust_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


CREATE TABLE Admin (
    admin_id VARCHAR(30) PRIMARY KEY,
    FOREIGN KEY (admin_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


CREATE TABLE Account (
    account_no CHAR(20) PRIMARY KEY,
    balance INT NOT NULL CHECK (balance >= 0),
    status CHAR(10) NOT NULL CHECK (status IN ('pending','active', 'inactive', 'closed')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    cust_id VARCHAR(30) NOT NULL,
    account_type CHAR(10) NOT NULL CHECK (account_type IN ('savings', 'current')),
    FOREIGN KEY (cust_id) REFERENCES Customer(cust_id) ON DELETE CASCADE
);

CREATE TABLE Transactions (
    trans_id CHAR(30) PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    sender_acc_no CHAR(20),
    receiver_acc_no CHAR(20),
    amount INT NOT NULL CHECK (amount > 0),
    FOREIGN KEY (sender_acc_no) REFERENCES Account(account_no) ON DELETE CASCADE,
    FOREIGN KEY (receiver_acc_no) REFERENCES Account(account_no) ON DELETE CASCADE
);


CREATE TABLE Reverse_transaction (
    admin_id VARCHAR(30),
    trans_id CHAR(30),
    reason VARCHAR(256) NOT NULL,  -- Store reason for reversal
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (admin_id, trans_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id) ON DELETE CASCADE,
    FOREIGN KEY (trans_id) REFERENCES Transactions(trans_id) ON DELETE CASCADE
);


CREATE TABLE Loan (
    loan_id CHAR(30) PRIMARY KEY,
    principal_amount INT NOT NULL CHECK (principal_amount > 0),
    remaining_amount INT NOT NULL CHECK (remaining_amount >= 0),
    interest FLOAT CHECK (interest >= 0),
    borrower_id VARCHAR(30),  -- Reference Customer instead of Account
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Loan creation timestamp
    repayment_date DATE NOT NULL,  -- Due date for loan repayment
    status CHAR(10) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'closed')) DEFAULT 'pending',
    FOREIGN KEY (borrower_id) REFERENCES Customer(cust_id) ON DELETE CASCADE
);



CREATE TABLE LoanTransaction (
    transaction_id CHAR(30) PRIMARY KEY,
    loan_id CHAR(30),
    repayer_acc_no CHAR(20),  -- Repayer's account number instead of Customer ID
    amount_paid INT NOT NULL CHECK (amount_paid > 0),
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES Loan(loan_id) ON DELETE CASCADE,
    FOREIGN KEY (repayer_acc_no) REFERENCES Account(account_no) ON DELETE CASCADE
);


CREATE TABLE admin_account_action (
    admin_action_id CHAR(30) PRIMARY KEY,  -- New unique identifier for admin actions
    admin_id VARCHAR(30) NOT NULL,
    acc_no CHAR(20) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    type CHAR(10) CHECK (type IN ('approve', 'freeze', 'close')),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id) ON DELETE CASCADE,
    FOREIGN KEY (acc_no) REFERENCES Account(account_no) ON DELETE CASCADE
);


CREATE TABLE admin_loan_action (
    admin_action_id CHAR(30) PRIMARY KEY,  -- New unique identifier for admin actions
    admin_id VARCHAR(30) NOT NULL,
    loan_id CHAR(30) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    type CHAR(10) CHECK (type IN ('approved', 'rejected', 'closed')),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id) ON DELETE CASCADE,
    FOREIGN KEY (loan_id) REFERENCES Loan(loan_id) ON DELETE CASCADE
);


CREATE TABLE Withdrawal (
    withdrawal_id CHAR(30) PRIMARY KEY,
    acc_no CHAR(20),
    cust_id VARCHAR(30),
    amount INT NOT NULL CHECK (amount > 0),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (acc_no) REFERENCES Account(account_no) ON DELETE CASCADE,
    FOREIGN KEY (cust_id) REFERENCES Customer(cust_id) ON DELETE CASCADE
);


CREATE TABLE Deposit (
    deposit_id CHAR(30) PRIMARY KEY,
    acc_no CHAR(20),
    admin_id VARCHAR(30),
    amount INT NOT NULL CHECK (amount > 0),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (acc_no) REFERENCES Account(account_no) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id) ON DELETE CASCADE
);