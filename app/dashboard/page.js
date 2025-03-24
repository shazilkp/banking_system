"use client";
import { useRef,useState } from "react";


const Dashboard = () => {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-6">Sierra Bank</h2>
        <button
          onClick={() => setActiveForm(null)}
          className="w-full p-3 bg-gray-700 my-2 rounded hover:shadow-xl transition-shadow"
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveForm("createAccount")}
          className="w-full p-3 bg-blue-600 my-2 rounded hover:shadow-xl transition-shadow"
        >
          Create Account
        </button>
        <button
          onClick={() => setActiveForm("takeLoan")}
          className="w-full p-3 bg-blue-600 my-2 rounded hover:shadow-xl transition-shadow"
        >
          Take a Loan
        </button>
        <button
          onClick={() => setActiveForm("transferMoney")}
          className="w-full p-3 bg-blue-600 my-2 rounded hover:shadow-xl transition-shadow"
        >
          Transfer Money
        </button>
        <button
          onClick={() => setActiveForm("withdraw")}
          className="w-full p-3 bg-blue-600 my-2 rounded hover:shadow-xl transition-shadow"
        >
          Withdraw
        </button>
        <button
          onClick={() => setActiveForm("repayLoan")}
          className="w-full p-3 bg-blue-600 my-2 rounded hover:shadow-xl transition-shadow"
        >
          Repay Loan
        </button>
        <button
          onClick={() => setActiveForm("viewBalance")}
          className="w-full p-3 bg-blue-600 my-2 rounded hover:shadow-xl transition-shadow"
        >
          View Balance
        </button>
        <button
          onClick={() => setActiveForm("viewTransactions")}
          className="w-full p-3 bg-blue-600 my-2 rounded hover:shadow-xl transition-shadow"
        >
          View Transaction History
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeForm === null && <DashboardOverview />}
        {activeForm === "createAccount" && <CreateAccountForm setActiveForm={setActiveForm} />}
        {activeForm === "takeLoan" && <TakeLoanForm setActiveForm={setActiveForm} />}
        {activeForm === "transferMoney" && <TransferMoneyForm setActiveForm={setActiveForm} />}
        {activeForm === "withdraw" && <WithdrawForm setActiveForm={setActiveForm} />}
        {activeForm === "repayLoan" && <RepayLoanForm setActiveForm={setActiveForm} />}
        {activeForm === "viewBalance" && <ViewBalanceForm setActiveForm={setActiveForm} />}
        {activeForm === "viewTransactions" && <ViewTransactionHistoryForm setActiveForm={setActiveForm} />}
      </main>
    </div>
  );
};
const DashboardOverview = () => {
  const [avatar, setAvatar] = useState("https://via.placeholder.com/80");
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-100">
      {/* Top Section: Avatar & Welcome */}
      <div className="flex-shrink-0 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex items-center space-x-6 h-1/5 border-l-4 border-blue-500">
        <div className="relative">
          <img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full cursor-pointer border-4 border-blue-600 hover:border-indigo-500 transition-colors"
            onClick={handleAvatarClick}
          />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Welcome back, Victor!</h3>
          <p className="text-gray-600">Last login: 09/06/2016 05:34:59 PM PHT</p>
          <p className="text-3xl font-bold text-blue-700 animate-pulse">
            Total Balance: $17,288.29
          </p>
          <p className="text-sm text-gray-500">[Placeholder: Data from backend]</p>
        </div>
      </div>

      {/* Middle Section: Accounts and Expenses */}
      <div className="flex flex-grow gap-6">
        {/* All Accounts - Larger */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border-l-4 border-green-500">
          <h3 className="text-lg font-bold mb-4 text-gray-800">All Accounts</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-100">
                <th className="border border-gray-300 p-3">Type</th>
                <th className="border border-gray-300 p-3">Account Name</th>
                <th className="border border-gray-300 p-3">Status</th>
                <th className="border border-gray-300 p-3">Currency</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 transition">
                <td className="border border-gray-300 p-3">Checking</td>
                <td className="border border-gray-300 p-3">1267451**** - WOLFE</td>
                <td className="border border-gray-300 p-3 text-green-600">Active</td>
                <td className="border border-gray-300 p-3">USD</td>
              </tr>
              <tr className="hover:bg-gray-100 transition">
                <td className="border border-gray-300 p-3">Savings</td>
                <td className="border border-gray-300 p-3">5719371**** - MAENGUNE</td>
                <td className="border border-gray-300 p-3 text-green-600">Active</td>
                <td className="border border-gray-300 p-3">USD</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Expenses Report - Chart */}
        <div className="w-1/3 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border-l-4 border-purple-500">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Expenses Report</h3>
          <div className="h-48 flex items-center justify-center bg-indigo-50 rounded-lg">
            <p className="text-gray-500">[Placeholder: Expense graph from backend]</p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Activities and Pending Bills - Side by Side */}
      <div className="flex gap-6">
        {/* All Activities */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border-l-4 border-orange-500">
          <h3 className="text-lg font-bold mb-4 text-gray-800">All Activities</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Deposit of $500 credited to Checking</li>
            <li>Withdrawal of $200 debited from Savings</li>
            <li>Transfer of $300 from Checking to Savings</li>
            <li>Repayment of Loan #123456</li>
          </ul>
        </div>

        {/* Pending Bills */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border-l-4 border-red-500">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Pending Bills</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Electricity Bill: $150 due on 2025-04-05</li>
            <li>Water Bill: $75 due on 2025-04-10</li>
            <li>Internet: $60 due on 2025-04-15</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


// Create Account Form
const CreateAccountForm = ({ setActiveForm }) => {
  const [accountType, setAccountType] = useState("");
  const [branch, setBranch] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">Create Account</h3>
      <input type="text" placeholder="Full Name" className="w-full p-2 border mb-2" />
      <select className="w-full p-2 border mb-2" onChange={(e) => setAccountType(e.target.value)}>
        <option value="">Select Account Type</option>
        <option value="savings">Savings</option>
        <option value="current">Current</option>
      </select>
      <select className="w-full p-2 border mb-2" onChange={(e) => setBranch(e.target.value)}>
        <option value="">Select Bank Branch</option>
        <option value="branch1">Downtown Branch</option>
        <option value="branch2">Uptown Branch</option>
      </select>
      <button onClick={() => setShowConfirmation(true)} className="bg-blue-600 text-white p-2 rounded">
        Submit
      </button>

      {showConfirmation && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p>Are you sure you want to create a {accountType} account at {branch}?</p>
          <button onClick={() => setActiveForm(null)} className="bg-green-600 text-white p-2 rounded mt-2">
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

// Take Loan Form
const TakeLoanForm = ({ setActiveForm }) => {
  const [loanType, setLoanType] = useState("");
  const [branch, setBranch] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loanId, setLoanId] = useState(null);

  const loanOptions = [
    { type: "Agriculture", rate: "5%" },
    { type: "House", rate: "6%" },
    { type: "Car", rate: "7%" },
    { type: "Small Business", rate: "8%" },
    { type: "Education", rate: "4%" },
    { type: "Personal", rate: "9%" }
  ];

  const handleSubmit = () => {
    if (loanType && branch && loanAmount) {
      setShowConfirmation(true);
    }
  };

  const confirmLoan = () => {
    setLoanId(Math.floor(Math.random() * 1000000));
    setTimeout(() => setActiveForm(null), 2000);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">Take a Loan</h3>
      <input
        type="number"
        placeholder="Loan Amount"
        className="w-full p-2 border mb-2"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />
      <select className="w-full p-2 border mb-2" onChange={(e) => setLoanType(e.target.value)}>
        <option value="">Select Loan Type</option>
        {loanOptions.map((loan, index) => (
          <option key={index} value={loan.type}>
            {loan.type} ({loan.rate} interest)
          </option>
        ))}
      </select>
      <select className="w-full p-2 border mb-2" onChange={(e) => setBranch(e.target.value)}>
        <option value="">Select Bank Branch</option>
        <option value="branch1">Downtown Branch</option>
        <option value="branch2">Uptown Branch</option>
      </select>
      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 rounded">
        Apply
      </button>
      {showConfirmation && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p>
            Are you sure you want a {loanType} loan of ${loanAmount} at {branch}?
          </p>
          <button onClick={confirmLoan} className="bg-green-600 text-white p-2 rounded mt-2">
            Confirm
          </button>
        </div>
      )}
      {loanId && (
        <div className="mt-4 p-4 border rounded bg-green-100">
          <p>Your loan has been approved! Loan ID: {loanId}</p>
        </div>
      )}
    </div>
  );
};

// Transfer Money Form
const TransferMoneyForm = ({ setActiveForm }) => {
  const [userAccounts] = useState([
    { id: "acc1", name: "Checking - 1267451****" },
    { id: "acc2", name: "Savings - 5719371****" }
  ]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAccountId, setRecipientAccountId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTransfer = () => {
    if (selectedAccount && recipientName && recipientAccountId && purpose && amount) {
      setShowConfirmation(true);
    }
  };

  const confirmTransfer = () => {
    alert(
      `Transfer of $${amount} from ${selectedAccount} to ${recipientName} (${recipientAccountId}) for ${purpose} confirmed.`
    );
    setActiveForm(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">Transfer Money</h3>
      <select className="w-full p-2 border mb-2" value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
        <option value="">Select Your Account</option>
        {userAccounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Recipient Name"
        className="w-full p-2 border mb-2"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recipient Bank Account ID"
        className="w-full p-2 border mb-2"
        value={recipientAccountId}
        onChange={(e) => setRecipientAccountId(e.target.value)}
      />
      <input
        type="text"
        placeholder="What For?"
        className="w-full p-2 border mb-2"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 border mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer} className="bg-blue-600 text-white p-2 rounded">
        Transfer
      </button>
      {showConfirmation && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p>
            Confirm transfer of ${amount} to {recipientName} ({recipientAccountId}) for {purpose}?
          </p>
          <button onClick={confirmTransfer} className="bg-green-600 text-white p-2 rounded mt-2">
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

// Withdraw Form
const WithdrawForm = ({ setActiveForm }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [withdrawSlipId, setWithdrawSlipId] = useState(null);

  const handleWithdraw = () => {
    if (accountNumber && amount) {
      setShowConfirmation(true);
    }
  };

  const confirmWithdraw = () => {
    const slipId = Math.floor(Math.random() * 1000000);
    setWithdrawSlipId(slipId);
    setTimeout(() => {
      setActiveForm(null);
    }, 2000);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">Withdraw</h3>
      <input
        type="text"
        placeholder="Account Number"
        className="w-full p-2 border mb-2"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 border mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleWithdraw} className="bg-blue-600 text-white p-2 rounded">
        Withdraw
      </button>
      {showConfirmation && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p>
            Confirm withdrawal of ${amount} from account {accountNumber}?
          </p>
          <button onClick={confirmWithdraw} className="bg-green-600 text-white p-2 rounded mt-2">
            Confirm
          </button>
        </div>
      )}
      {withdrawSlipId && (
        <div className="mt-4 p-4 border rounded bg-green-100">
          <p>Your withdrawal has been processed! Withdrawal Slip ID: {withdrawSlipId}</p>
        </div>
      )}
    </div>
  );
};

// Repay Loan Form
const RepayLoanForm = ({ setActiveForm }) => {
  const [loanId, setLoanId] = useState("");
  const [validated, setValidated] = useState(false);
  const [loanDetails, setLoanDetails] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [repayAmount, setRepayAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [repaymentSlipId, setRepaymentSlipId] = useState(null);

  const validateLoanId = () => {
    if (loanId.trim() !== "") {
      // Simulate validation and fetching loan details
      setLoanDetails({
        pendingAmount: 1000,
        dueDate: "2025-04-30"
      });
      setValidated(true);
    }
  };

  const handleRepayment = () => {
    if (accountNumber && repayAmount) {
      setShowConfirmation(true);
    }
  };

  const confirmRepayment = () => {
    const slipId = Math.floor(Math.random() * 1000000);
    setRepaymentSlipId(slipId);
    setTimeout(() => {
      setActiveForm(null);
    }, 2000);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">Repay Loan</h3>
      {!validated && (
        <>
          <input
            type="text"
            placeholder="Enter Loan ID"
            className="w-full p-2 border mb-2"
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
          />
          <button onClick={validateLoanId} className="bg-blue-600 text-white p-2 rounded">
            Validate Loan ID
          </button>
        </>
      )}
      {validated && loanDetails && (
        <div className="mt-4">
          <p>Pending Amount: ${loanDetails.pendingAmount}</p>
          <p>Due Date: {loanDetails.dueDate}</p>
          <input
            type="text"
            placeholder="Account Number for Repayment"
            className="w-full p-2 border mb-2"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <input
            type="number"
            placeholder="Repayment Amount"
            className="w-full p-2 border mb-2"
            value={repayAmount}
            onChange={(e) => setRepayAmount(e.target.value)}
          />
          <button onClick={handleRepayment} className="bg-blue-600 text-white p-2 rounded">
            Submit Repayment
          </button>
        </div>
      )}
      {showConfirmation && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p>
            Confirm repayment of ${repayAmount} from account {accountNumber} for loan {loanId}?
          </p>
          <button onClick={confirmRepayment} className="bg-green-600 text-white p-2 rounded mt-2">
            Confirm
          </button>
        </div>
      )}
      {repaymentSlipId && (
        <div className="mt-4 p-4 border rounded bg-green-100">
          <p>Repayment successful! Repayment Slip ID: {repaymentSlipId}</p>
        </div>
      )}
    </div>
  );
};

const ViewBalanceForm = ({ setActiveForm }) => {
  // Simulated account balances
  const accounts = [
    { id: "all", type: "All Accounts", balance: 17288.29 },
    { id: "acc1", type: "Checking", account: "1267451****", balance: 10500.00, currency: "USD" },
    { id: "acc2", type: "Savings", account: "5719371****", balance: 6788.29, currency: "USD" }
  ];

  const [selectedAccountId, setSelectedAccountId] = useState("all");

  // Find the account based on selection
  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">View Balance</h3>
      <select
        className="w-full p-2 border mb-4"
        value={selectedAccountId}
        onChange={(e) => setSelectedAccountId(e.target.value)}
      >
        {accounts.map((acc) => (
          <option key={acc.id} value={acc.id}>
            {acc.type} {acc.account ? `- ${acc.account}` : ""}
          </option>
        ))}
      </select>
      {selectedAccountId === "all" ? (
        <p className="text-2xl font-bold text-blue-600">
          Total Balance: ${selectedAccount.balance.toFixed(2)}
        </p>
      ) : (
        <div>
          <h4 className="font-bold">{selectedAccount.type} Account Balance:</h4>
          <p className="text-2xl font-bold text-blue-600">
            ${selectedAccount.balance.toFixed(2)} {selectedAccount.currency}
          </p>
        </div>
      )}
      <button onClick={() => setActiveForm(null)} className="mt-4 bg-blue-600 text-white p-2 rounded">
        Back to Dashboard
      </button>
    </div>
  );
};

// View Transaction History Form
const ViewTransactionHistoryForm = ({ setActiveForm }) => {
  // Simulated transactions with account ids (acc1 for Checking, acc2 for Savings)
  const allTransactions = [
    { id: 1, accountId: "acc1", date: "2025-03-01", description: "Deposit", amount: 500 },
    { id: 2, accountId: "acc2", date: "2025-03-05", description: "Withdrawal", amount: -200 },
    { id: 3, accountId: "acc1", date: "2025-03-10", description: "Transfer", amount: -300 },
    { id: 4, accountId: "acc2", date: "2025-03-12", description: "Deposit", amount: 700 }
  ];

  const accounts = [
    { id: "all", type: "All Accounts" },
    { id: "acc1", type: "Checking", account: "1267451****" },
    { id: "acc2", type: "Savings", account: "5719371****" }
  ];

  const [selectedAccountId, setSelectedAccountId] = useState("all");

  // Filter transactions if a specific account is selected
  const transactions =
    selectedAccountId === "all"
      ? allTransactions
      : allTransactions.filter((tx) => tx.accountId === selectedAccountId);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">Transaction History</h3>
      <select
        className="w-full p-2 border mb-4"
        value={selectedAccountId}
        onChange={(e) => setSelectedAccountId(e.target.value)}
      >
        {accounts.map((acc) => (
          <option key={acc.id} value={acc.id}>
            {acc.type} {acc.account ? `- ${acc.account}` : ""}
          </option>
        ))}
      </select>
      {transactions.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="border border-gray-300 p-2">{tx.id}</td>
                <td className="border border-gray-300 p-2">{tx.date}</td>
                <td className="border border-gray-300 p-2">{tx.description}</td>
                <td className="border border-gray-300 p-2">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found for this account.</p>
      )}
      <button onClick={() => setActiveForm(null)} className="mt-4 bg-blue-600 text-white p-2 rounded">
        Back to Dashboard
      </button>
    </div>
  );
};

export default Dashboard;
