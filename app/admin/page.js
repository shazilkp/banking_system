
"use client";
import { useState, useRef ,useEffect} from "react";
import { ChartPie, UserRoundPlus, Landmark ,IndianRupee, HandCoins, PiggyBank, WalletMinimal, History, Ticket, User, Send, ReceiptIcon, ReceiptText,ClipboardList, UserCheck, UserX, Clock, AlertCircle,CheckCircle2,XCircle} from 'lucide-react';
import { BanknotesIcon, ArrowDownIcon } from "@heroicons/react/24/outline";



const AdminDashboard = () => {
  const [activeForm, setActiveForm] = useState(null);

  return (
      <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-90 bg-gray-900 text-white p-6 flex-shrink-0">
        <div className="p-5 flex flex-col text-center"><h2 className="text-3xl font-bold mb-6">NITC Bank</h2></div>
  
        <div className={`flex flex-col p-4 text-base font-normal rounded-lg 
          ${activeForm === null ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm(null)} className="flex flex-row ml-5"> <ChartPie className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Dashboard</div>
        </button> 
				</div>
        
        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "loanApproval" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("loanApproval")} className="flex flex-row ml-5"> <UserRoundPlus className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Approve Loans</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "accountApproval" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("accountApproval")} className="flex flex-row ml-5"> <Landmark className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Approve Accounts</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "accountFreeze" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("accountFreeze")} className="flex flex-row ml-5"> <IndianRupee className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Freeze Account</div>
        </button> 
				</div>
        
        <div className={`flex flex-col p-4 text-base font-normal rounded-lg 
          ${activeForm === "transactionReversal" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("transactionReversal")} className="flex flex-row ml-5"> <HandCoins className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Reverse Transaction</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "depositManagement" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("depositManagement")} className="flex flex-row ml-5"> <PiggyBank  className="w-7 h-7  text-primary"/><div className="text-xl ml-2">deposit Money</div>
        </button> 
				</div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white overflow-hidden">
    {activeForm === null && <AdminOverview />}
    {activeForm === "loanApproval" && <LoanApprovalModule setActiveForm={setActiveForm} />}
    {activeForm === "accountApproval" && <AccountApprovalModule setActiveForm={setActiveForm} />}
    {activeForm === "accountFreeze" && <AccountFreezingModule setActiveForm={setActiveForm} />}
    {activeForm === "transactionReversal" && <TransactionReversalModule setActiveForm={setActiveForm} />}
    {activeForm === "depositManagement" && <DepositManagementModule setActiveForm={setActiveForm} />}
</main>

    </div>
  );
};
const AdminOverview = () => {
      const [bankBalance, setBankBalance] = useState(24563280); // Example balance in dollars
      const [pendingAccounts, setPendingAccounts] = useState([
        {
          id: 1,
          accountId: "ACCT-789123",
          userName: "John Doe",
          submitted: "2025-03-15",
          status: "Pending Verification"
        },
        {
          id: 2,
          accountId: "ACCT-456789",
          userName: "Jane Smith",
          submitted: "2025-03-14",
          status: "Documents Required"
        }
      ]);
    
      const [pendingLoans, setPendingLoans] = useState([
        {
          id: 1,
          loanId: "LOAN-852369",
          userName: "Mike Johnson",
          amount: "$50,000",
          type: "Mortgage",
          status: "Under Review"
        },
        {
          id: 2,
          loanId: "LOAN-741258",
          userName: "Sarah Williams",
          amount: "$20,000",
          type: "Personal",
          status: "Risk Assessment"
        }
      ]);
    
      const recentTransactions = [
        {
          id: 1,
          type: "Deposit",
          amount: "$500,000",
          account: "Corporate Account X-789",
          date: "2025-04-01 09:45 AM"
        },
        {
          id: 2,
          type: "Withdrawal",
          amount: "$250,000",
          account: "Business Account Y-123",
          date: "2025-04-01 10:15 AM"
        }
      ];
    
      const suspiciousActivities = [
        {
          id: 1,
          account: "User-459",
          amount: "$15,000",
          reason: "Unusual large withdrawal",
          date: "2025-03-31 11:30 PM"
        },
        {
          id: 2,
          account: "User-782",
          amount: "$9,500",
          reason: "Multiple failed login attempts",
          date: "2025-03-31 09:15 PM"
        }
      ];
    
      const pendingLoanPayments = [
        {
          id: 1,
          loanId: "LN-456987",
          userName: "Robert Brown",
          dueDate: "2025-04-05",
          amountDue: "$1,250"
        },
        {
          id: 2,
          loanId: "LN-321654",
          userName: "Emily Davis",
          dueDate: "2025-04-07",
          amountDue: "$890"
        }
      ];
    
      const handleApprove = (type, id) => {
        // Approval logic here
      };
    
      const handleReject = (type, id) => {
        // Rejection logic here
      };
    
      return (
        <div className="flex flex-col overflow-y-auto h-full gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-100">
          {/* Top Section: Bank Balance Summary */}
          <div className="flex-shrink-0 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">Bank Total Balance</h3>
              <p className="text-4xl font-bold text-green-600 mt-2">
                ${bankBalance.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <BanknotesIcon className="w-8 h-8 text-green-600" />
                <p className="text-gray-600 mt-2">Daily Deposits</p>
                <p className="text-xl font-bold">$1,234,567</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <ArrowDownIcon className="w-8 h-8 text-red-600" />
                <p className="text-gray-600 mt-2">Daily Withdrawals</p>
                <p className="text-xl font-bold">$987,654</p>
              </div>
            </div>
          </div>
    
          {/* Middle Section: Approvals */}
          <div className="flex gap-6">
        {/* Pending Account Approvals */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Pending Account Approvals</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {pendingAccounts.length} pending
            </span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-indigo-100">
                <th className="p-3">Account ID</th>
                <th className="p-3">User Name</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingAccounts.map((account) => (
                <tr key={account.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{account.accountId}</td>
                  <td className="p-3">{account.userName}</td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      {account.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pending Loan Approvals */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Pending Loan Approvals</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {pendingLoans.length} pending
            </span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-indigo-100">
                <th className="p-3">Loan ID</th>
                <th className="p-3">User Name</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingLoans.map((loan) => (
                <tr key={loan.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{loan.loanId}</td>
                  <td className="p-3">{loan.userName}</td>
                  <td className="p-3">{loan.amount}</td>
                  <td className="p-3">{loan.type}</td>
                  <td className="p-3">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
          {/* Bottom Section: Transactions and Alerts */}
          <div className="flex gap-6">
            {/* Recent Transactions */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Recent Large Transactions</h3>
              <ul className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <li key={transaction.id} className="flex justify-between items-center p-3 hover:bg-gray-50">
                    <div>
                      <span className={`font-semibold ${transaction.type === 'Deposit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type}
                      </span>
                      <p className="text-gray-600 text-sm">{transaction.account}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{transaction.amount}</p>
                      <p className="text-gray-500 text-sm">{transaction.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
    
            {/* Right Column: Suspicious Activity and Loan Payments */}
            <div className="w-1/3 flex flex-col gap-6">
              {/* Suspicious Activity */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Suspicious Activity</h3>
                <ul className="space-y-4">
                  {suspiciousActivities.map((activity) => (
                    <li key={activity.id} className="p-3 bg-red-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-red-600">{activity.reason}</p>
                          <p className="text-sm text-gray-600">{activity.account}</p>
                        </div>
                        <p className="text-red-600 font-semibold">{activity.amount}</p>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{activity.date}</p>
                    </li>
                  ))}
                </ul>
              </div>
    
              {/* Pending Loan Payments */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Pending Loan Payments</h3>
                <ul className="space-y-4">
                  {pendingLoanPayments.map((payment) => (
                    <li key={payment.id} className="p-3 bg-yellow-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{payment.userName}</p>
                          <p className="text-sm text-gray-600">{payment.loanId}</p>
                        </div>
                        <p className="text-red-600 font-semibold">{payment.amountDue}</p>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">Due: {payment.dueDate}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    };
// Approve Loan Requests Module with Loan Type Included
const LoanApprovalModule = ({ setActiveForm }) => {
  // Sample pending loan requests data with loan type included
  const [pendingLoans, setPendingLoans] = useState([
    {
      id: 1,
      userName: "Alice Smith",
      loanId: "LN1001",
      loanType: "Personal Loan",
      requestedAmount: 2000,
      userDetails: {
        accounts: [
          { accountId: "ACC100", balance: 3000 },
          { accountId: "ACC101", balance: 1500 }
        ],
        previousLoans: [
          { loanId: "LN0901", amount: 1000, status: "Paid" },
          { loanId: "LN0902", amount: 1500, status: "Paid" }
        ]
      }
    },
    {
      id: 2,
      userName: "Bob Johnson",
      loanId: "LN1002",
      loanType: "Mortgage",
      requestedAmount: 3500,
      userDetails: {
        accounts: [
          { accountId: "ACC200", balance: 5000 },
          { accountId: "ACC201", balance: 2200 }
        ],
        previousLoans: [
          { loanId: "LN0910", amount: 2000, status: "Paid" }
        ]
      }
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [processedSlipId, setProcessedSlipId] = useState(null);
  const [processStatus, setProcessStatus] = useState(""); // "approved" or "rejected"

  const openUserDetails = (request) => {
    setSelectedRequest(request);
    setShowUserDetails(true);
  };

  const handleProcessLoan = (action) => {
    // action can be "approved" or "rejected"
    setProcessStatus(action);
    const slipId = Math.floor(Math.random() * 1000000);
    setProcessedSlipId(slipId);

    // Remove processed request from pending list
    setPendingLoans(pendingLoans.filter((loan) => loan.id !== selectedRequest.id));

    setShowUserDetails(false);
    setSelectedRequest(null);

    // Simulate processing delay then close the form
    setTimeout(() => {
      setActiveForm(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-2xl w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Pending Loan Requests</h3>
        {pendingLoans.length === 0 ? (
          <p className="text-gray-700">No pending loan requests.</p>
        ) : (
          <ul className="space-y-4">
            {pendingLoans.map((loan) => (
              <li
                key={loan.id}
                className="p-4 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openUserDetails(loan)}
              >
                <p className="text-lg text-blue-600 font-semibold">
                  {loan.userName}
                </p>
                <p className="text-gray-700">
                  Loan ID: <span className="font-bold">{loan.loanId}</span>
                </p>
                <p className="text-gray-700">
                  Loan Type: <span className="font-bold">{loan.loanType}</span>
                </p>
                <p className="text-gray-700">
                  Requested Amount: <span className="font-bold">${loan.requestedAmount}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-lg w-full bg-white bg-opacity-80">
            <h4 className="text-xl font-bold mb-4 text-gray-800">
              User Details: {selectedRequest.userName}
            </h4>
            <div className="mb-4">
              <h5 className="font-semibold text-gray-800">Accounts:</h5>
              <ul className="list-disc list-inside">
                {selectedRequest.userDetails.accounts.map((acc, index) => (
                  <li key={index} className="text-gray-700">
                    Account ID: {acc.accountId} - Balance: ${acc.balance}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h5 className="font-semibold text-gray-800">Previous Loans:</h5>
              <ul className="list-disc list-inside">
                {selectedRequest.userDetails.previousLoans.map((loan, index) => (
                  <li key={index} className="text-gray-700">
                    Loan ID: {loan.loanId} - Amount: ${loan.amount} - Status: {loan.status}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleProcessLoan("rejected")}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
              >
                Reject Loan
              </button>
              <button
                onClick={() => handleProcessLoan("approved")}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
              >
                Approve Loan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processed Modal */}
      {processedSlipId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg">
              Loan {processStatus === "approved" ? "approved" : "rejected"} successfully!
            </p>
            <p className="text-lg">
              Process Slip ID: <span className="font-bold">{processedSlipId}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Approve Bank Account Requests Module
const AccountApprovalModule = ({ setActiveForm }) => {
  // Sample pending bank account requests data
  const [pendingAccounts, setPendingAccounts] = useState([
    {
      id: 1,
      userName: "Charlie Brown",
      accountId: "ACC300",
      accountType: "Checking",
      initialDeposit: 500,
      userDetails: {
        documents: ["ID Proof", "Address Proof"],
        contact: "charlie@example.com",
        existingAccounts: [
          { accountId: "ACC250", balance: 1200 }
        ]
      }
    },
    {
      id: 2,
      userName: "Dana White",
      accountId: "ACC400",
      accountType: "Savings",
      initialDeposit: 1000,
      userDetails: {
        documents: ["ID Proof", "Income Proof"],
        contact: "dana@example.com",
        existingAccounts: [
          { accountId: "ACC350", balance: 3000 },
          { accountId: "ACC351", balance: 1500 }
        ]
      }
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [processedSlipId, setProcessedSlipId] = useState(null);
  const [processStatus, setProcessStatus] = useState(""); // "approved" or "rejected"

  const openUserDetails = (request) => {
    setSelectedRequest(request);
    setShowUserDetails(true);
  };

  const handleProcessAccount = (action) => {
    // action can be "approved" or "rejected"
    setProcessStatus(action);
    const slipId = Math.floor(Math.random() * 1000000);
    setProcessedSlipId(slipId);

    // Remove processed request from pending list
    setPendingAccounts(pendingAccounts.filter((acc) => acc.id !== selectedRequest.id));

    setShowUserDetails(false);
    setSelectedRequest(null);

    // Simulate processing delay then close the form
    setTimeout(() => {
      setActiveForm(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-2xl w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Pending Bank Account Requests</h3>
        {pendingAccounts.length === 0 ? (
          <p className="text-gray-700">No pending bank account requests.</p>
        ) : (
          <ul className="space-y-4">
            {pendingAccounts.map((acc) => (
              <li
                key={acc.id}
                className="p-4 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openUserDetails(acc)}
              >
                <p className="text-lg text-blue-600 font-semibold">
                  {acc.userName}
                </p>
                <p className="text-gray-700">
                  Account ID: <span className="font-bold">{acc.accountId}</span>
                </p>
                <p className="text-gray-700">
                  Account Type: <span className="font-bold">{acc.accountType}</span>
                </p>
                <p className="text-gray-700">
                  Initial Deposit: <span className="font-bold">${acc.initialDeposit}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-lg w-full bg-white bg-opacity-80">
            <h4 className="text-xl font-bold mb-4 text-gray-800">
              User Details: {selectedRequest.userName}
            </h4>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-bold">Account ID:</span> {selectedRequest.accountId}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Account Type:</span> {selectedRequest.accountType}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Initial Deposit:</span> ${selectedRequest.initialDeposit}
              </p>
            </div>
            <div className="mb-4">
              <h5 className="font-semibold text-gray-800">User Documents:</h5>
              <ul className="list-disc list-inside">
                {selectedRequest.userDetails.documents.map((doc, index) => (
                  <li key={index} className="text-gray-700">{doc}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h5 className="font-semibold text-gray-800">Existing Accounts:</h5>
              <ul className="list-disc list-inside">
                {selectedRequest.userDetails.existingAccounts.map((exAcc, index) => (
                  <li key={index} className="text-gray-700">
                    Account ID: {exAcc.accountId} - Balance: ${exAcc.balance}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleProcessAccount("rejected")}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
              >
                Reject Account
              </button>
              <button
                onClick={() => handleProcessAccount("approved")}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
              >
                Approve Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processed Modal */}
      {processedSlipId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg">
              Bank account request {processStatus === "approved" ? "approved" : "rejected"} successfully!
            </p>
            <p className="text-lg">
              Process Slip ID: <span className="font-bold">{processedSlipId}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};


    const AccountFreezingModule = ({ setActiveForm }) => {
      const [accountId, setAccountId] = useState("");
      const [validated, setValidated] = useState(false);
      const [accountDetails, setAccountDetails] = useState(null);
      const [showConfirmation, setShowConfirmation] = useState(false);
      const [freezeSlipId, setFreezeSlipId] = useState(null);
    
      const validateAccountId = () => {
        if (accountId.trim() !== "") {
          // Simulate validation and fetching account details
          setAccountDetails({
            ownerName: "John Doe",
            accountType: "Savings",
            balance: 2500,
            status: "Active"
          });
          setValidated(true);
        }
      };
    
      const handleFreeze = () => {
        if (accountId && accountDetails) {
          setShowConfirmation(true);
        }
      };
    
      const confirmFreeze = () => {
        const slipId = Math.floor(Math.random() * 1000000);
        setFreezeSlipId(slipId);
        setShowConfirmation(false);
        setTimeout(() => {
          setActiveForm(null);
        }, 2000);
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
          <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Freeze Bank Account</h3>
            {!validated && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Account ID"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                  />
                </div>
                <button
                  onClick={validateAccountId}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
                >
                  Validate Account ID
                </button>
              </>
            )}
            {validated && accountDetails && (
              <div className="mt-4">
                <p className="mb-2 text-gray-700">
                  <span className="font-bold">Owner Name:</span> {accountDetails.ownerName}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-bold">Account Type:</span> {accountDetails.accountType}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-bold">Balance:</span> ${accountDetails.balance}
                </p>
                <p className="mb-4 text-gray-700">
                  <span className="font-bold">Status:</span> {accountDetails.status}
                </p>
                <button
                  onClick={handleFreeze}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
                >
                  Freeze Account
                </button>
              </div>
            )}
          </div>
    
          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
                <p className="text-lg mb-4">
                  Confirm freezing account ID <span className="font-bold">{accountId}</span> for owner{" "}
                  <span className="font-bold">{accountDetails.ownerName}</span>?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmFreeze}
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
    
          {/* Approval Modal */}
          {freezeSlipId && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
                <p className="text-lg">
                  Account frozen successfully! Freeze Slip ID:{" "}
                  <span className="font-bold">{freezeSlipId}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      );
    };
    

    const TransactionReversalModule = ({ setActiveForm }) => {
      const [transactionId, setTransactionId] = useState("");
      const [validated, setValidated] = useState(false);
      const [transactionDetails, setTransactionDetails] = useState(null);
      const [showConfirmation, setShowConfirmation] = useState(false);
      const [reverseSlipId, setReverseSlipId] = useState(null);
    
      const validateTransactionId = () => {
        if (transactionId.trim() !== "") {
          // Simulate validation and fetching transaction details
          setTransactionDetails({
            amount: 500,
            date: "2025-04-15",
            status: "Completed",
            description: "Payment for order #1234"
          });
          setValidated(true);
        }
      };
    
      const handleReverse = () => {
        if (transactionId && transactionDetails) {
          setShowConfirmation(true);
        }
      };
    
      const confirmReverse = () => {
        const slipId = Math.floor(Math.random() * 1000000);
        setReverseSlipId(slipId);
        setShowConfirmation(false);
        setTimeout(() => {
          setActiveForm(null);
        }, 2000);
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
          <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Reverse Transaction</h3>
            {!validated && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Transaction ID"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </div>
                <button
                  onClick={validateTransactionId}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
                >
                  Validate Transaction ID
                </button>
              </>
            )}
            {validated && transactionDetails && (
              <div className="mt-4">
                <p className="mb-2 text-gray-700">
                  <span className="font-bold">Amount:</span> ${transactionDetails.amount}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-bold">Date:</span> {transactionDetails.date}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-bold">Status:</span> {transactionDetails.status}
                </p>
                {transactionDetails.description && (
                  <p className="mb-4 text-gray-700">
                    <span className="font-bold">Description:</span> {transactionDetails.description}
                  </p>
                )}
                <button
                  onClick={handleReverse}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
                >
                  Reverse Transaction
                </button>
              </div>
            )}
          </div>
    
          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
                <p className="text-lg mb-4">
                  Confirm reversal of transaction ID <span className="font-bold">{transactionId}</span>?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmReverse}
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
    
          {/* Approval Modal */}
          {reverseSlipId && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
                <p className="text-lg">
                  Transaction reversed successfully! Reverse Slip ID:{" "}
                  <span className="font-bold">{reverseSlipId}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      );
    };
    

    const DepositManagementModule = ({ setActiveForm }) => {
      const [username, setUsername] = useState("");
      const [accountId, setAccountId] = useState("");
      const [depositAmount, setDepositAmount] = useState("");
      const [validated, setValidated] = useState(false);
      const [accountDetails, setAccountDetails] = useState(null);
      const [showConfirmation, setShowConfirmation] = useState(false);
      const [depositSlipId, setDepositSlipId] = useState(null);
    
      const validateAccount = () => {
        if (username.trim() !== "" && accountId.trim() !== "") {
          // Simulate validation and fetching account details
          setAccountDetails({
            ownerName: username,
            accountId,
            balance: 1000, // Example current balance
          });
          setValidated(true);
        }
      };
    
      const handleDeposit = () => {
        if (depositAmount) {
          setShowConfirmation(true);
        }
      };
    
      const confirmDeposit = () => {
        // Increase the account balance by the deposit amount
        const newBalance =
          accountDetails.balance + parseFloat(depositAmount || "0");
        setAccountDetails({ ...accountDetails, balance: newBalance });
    
        const slipId = Math.floor(Math.random() * 1000000);
        setDepositSlipId(slipId);
        setShowConfirmation(false);
        setTimeout(() => {
          setActiveForm(null);
        }, 2000);
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
          <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Deposit Money</h3>
            {!validated && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Account ID"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                  />
                </div>
                <button
                  onClick={validateAccount}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
                >
                  Validate Account
                </button>
              </>
            )}
            {validated && accountDetails && (
              <div className="mt-4">
                <p className="mb-2 text-gray-700">
                  <span className="font-bold">Owner Name:</span> {accountDetails.ownerName}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-bold">Account ID:</span> {accountDetails.accountId}
                </p>
                <p className="mb-4 text-gray-700">
                  <span className="font-bold">Current Balance:</span> ${accountDetails.balance}
                </p>
                <div className="mb-4">
                  <input
                    type="number"
                    placeholder="Enter Deposit Amount"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleDeposit}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
                >
                  Deposit Money
                </button>
              </div>
            )}
          </div>
    
          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
                <p className="text-lg mb-4">
                  Confirm depositing ${depositAmount} into account ID{" "}
                  <span className="font-bold">{accountId}</span> for user{" "}
                  <span className="font-bold">{username}</span>?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeposit}
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
    
          {/* Approval Modal */}
          {depositSlipId && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
                <p className="text-lg">
                  Deposit successful! New Balance: ${accountDetails.balance}. Deposit Slip ID:{" "}
                  <span className="font-bold">{depositSlipId}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      );
    };
    

export default AdminDashboard;
