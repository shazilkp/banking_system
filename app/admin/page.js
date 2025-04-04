
"use client";
import { useState, useRef ,useEffect} from "react";
import { ChartPie, UserRoundPlus, Landmark ,IndianRupee, HandCoins, PiggyBank, WalletMinimal, History, Ticket, User, Send, ReceiptIcon, ReceiptText,ClipboardList, UserCheck, UserX, Clock, AlertCircle,CheckCircle2,XCircle,LogOut} from 'lucide-react';
import { BanknotesIcon, ArrowDownIcon } from "@heroicons/react/24/outline";



const AdminDashboard = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [userId,setUserId] = useState(null);

  useEffect(() => {

    const fetchUserId = async () => {
      try {
          const response = await fetch("/api/auth/", {
              method: "GET",
              credentials: "include", // Ensure cookies are sent
          });
  
          if (!response.ok) {
              throw new Error("Unauthorized");
          }
  
          const data = await response.json();
          setUserId(data.userId);
          return data.userId;
      } catch (error) {
          console.error("Error fetching user ID:", error);
          return null;
      }
  };

  // Usage
  const userID =fetchUserId();
  },[])

  useEffect(() => {
    console.log(userId);

  },[userId])

  const handleSignOut = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // Send cookie
      });
  
      // Optional: clear any client-side state here
      window.location.href = "/login"; // or use router.push('/login')
    } catch (error) {
      console.error("Logout failed:", error);
    }
    console.log("Signed out");
  };

  return (
      <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-90 bg-gray-900 text-white p-6 flex-shrink-0">
        <div className="p-5 flex flex-col text-center"><h2 className="text-3xl font-bold mb-6">NITC Bank</h2></div>

       {/*
        <div className={`flex flex-col p-4 text-base font-normal rounded-lg 
            ${activeForm === null ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
            
				<button onClick={() => setActiveForm(null)} className="flex flex-row ml-5" > <ChartPie className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Dashboard</div>
        </button>                                  
				</div>

        */}

        
        
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
				<button onClick={() => setActiveForm("depositManagement")} className="flex flex-row ml-5"> <PiggyBank  className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Deposit Money</div>
        </button> 
				</div>

        <div className="mt-6">
          <div className="flex flex-col p-4 text-base font-normal rounded-lg  hover:bg-blue-700 text-white">
            <button onClick={handleSignOut} className="flex flex-row ml-5">
              <LogOut className="w-7 h-7 text-primary" />
              <div className="text-xl ml-2">Sign Out</div>
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white overflow-hidden">
   {/*  {activeForm === null && <AdminOverview />}*/}
    {(activeForm === "loanApproval" || activeForm === null) && <LoanApprovalModule setActiveForm={setActiveForm} adminId={userId}/>}
    {activeForm === "accountApproval" && <AccountApprovalModule setActiveForm={setActiveForm} adminId={userId}/>}
    {activeForm === "accountFreeze" && <AccountFreezingModule setActiveForm={setActiveForm} adminId={userId}/>}
    {activeForm === "transactionReversal" && <TransactionReversalModule setActiveForm={setActiveForm} adminId = {userId} />}
    {activeForm === "depositManagement" && <DepositManagementModule setActiveForm={setActiveForm} adminId = {userId} />}
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
const LoanApprovalModule = ({ setActiveForm,adminId }) => {
  // Sample pending loan requests data with loan type included
  const [pendingLoans, setPendingLoans] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [processedSlipId, setProcessedSlipId] = useState(null);
  const [processStatus, setProcessStatus] = useState(""); // "approved" or "rejected"

  useEffect(() => {
    fetchPendingLoans();
  }, []); 

  const fetchPendingLoans = async() => {
    try {
      const response = await fetch(`/api/admin/loans/pending`);
      if (!response.ok) throw new Error("Failed to fetch pending loans");

      const data = await response.json();
      console.log(data);
      setPendingLoans(data.loans);
    } catch (error) {
      console.error("Error fetching pending accounts:", error);
    }
  };

  const openUserDetails = (request) => {
    setSelectedRequest(request);
    setShowUserDetails(true);
  };

  const handleProcessLoan = async(action) => {
    // action can be "approved" or "rejected"

    if (!selectedRequest) {
      console.error("No loan selected");
      return;
    }

    const loanId = selectedRequest.loan_id;
    console.log("Processing loan:", loanId, "Action:", action);

    try {
      
      const response = await fetch(`/api/admin/loans/${loanId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: action === "approved" ? "approved" : "rejected",
          admin_id: adminId, // Replace with dynamic admin ID
        }),
      });

      if (!response.ok) throw new Error("Failed to process loan");


      setProcessStatus(action);
      const slipId = Math.floor(Math.random() * 1000000);
      setProcessedSlipId(slipId);

      // Remove processed request from pending list
    setPendingLoans(pendingLoans.filter((loan) => loan.loan_id !== selectedRequest.loan_id));

    setShowUserDetails(false);
    setSelectedRequest(null);

    // Simulate processing delay then close the form
    setTimeout(() => {
      setActiveForm(null);
    }, 9000);

    } catch (error) {
      console.error("Error processing loan:", error);
    }
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
                key={loan.loan_id}
                className="p-4 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openUserDetails(loan)}
              >
                <p className="text-lg text-blue-600 font-semibold">
                  {loan.borrower_id}
                </p>
                <p className="text-gray-700">
                  Loan ID: <span className="font-bold">{loan.loan_id}</span>
                </p>
                <p className="text-gray-700">
                  Requested Amount: <span className="font-bold">${loan.principal_amount}</span>
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
              Loan Details: {selectedRequest.loan_id}
            </h4>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-bold">Borrower ID:</span> {selectedRequest.borrower_id}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Requested Amount:</span> ${selectedRequest.principal_amount}
              </p>
              
              <p className="text-gray-700">
                <span className="font-bold">Repay by:</span> ${selectedRequest.repayment_date}
              </p>
            
            </div>
            
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  handleProcessLoan("rejected")
                }}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
              >
                Reject Loan
              </button>
              <button
                onClick={() => {
                  handleProcessLoan("approved")
                } }
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
const AccountApprovalModule = ({ setActiveForm ,adminId}) => {
  // Sample pending bank account requests data
  const [pendingAccounts, setPendingAccounts] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [processedSlipId, setProcessedSlipId] = useState(null);
  const [processStatus, setProcessStatus] = useState(""); 


  useEffect(() => {
    fetchPendingAccounts();
  }, []); 

  const fetchPendingAccounts = async() => {
    try {
      const response = await fetch(`/api/admin/accounts/pending`);
      if (!response.ok) throw new Error("Failed to fetch pending accounts");

      const data = await response.json();
      console.log(data);
      setPendingAccounts(data.accounts);
    } catch (error) {
      console.error("Error fetching pending accounts:", error);
    }
  };

  const openUserDetails = (request) => {
    setSelectedRequest(request);
    setShowUserDetails(true);
  };

  const handleProcessAccount = async(action) => {
    // action can be "approved" or "rejected"
   
    if (!selectedRequest) {
      console.error("No account selected for processing");
      return;
    }
  
    const accountNo = selectedRequest.account_no; // Ensure correct field name
    console.log("Processing account:", accountNo, "Action:", action, "Admin ID:", adminId);

    try {
      console.log(`/api/admin/accounts/${accountNo}`)
      const response = await fetch(`/api/admin/accounts/${accountNo}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: action === "approve" ? "active" : "inactive",
          admin_id: adminId,
          action_type: "approve"
        }),
      });

      if (!response.ok) throw new Error("Failed to process account");

      const slipId = Math.floor(Math.random() * 1000000);
      setProcessedSlipId(slipId);
      setProcessStatus(action);

      // Remove processed request from pending list
    setPendingAccounts(pendingAccounts.filter((acc) => acc.id !== selectedRequest.id));

    setShowUserDetails(false);
    setSelectedRequest(null);

    // Simulate processing delay then close the form
    setTimeout(() => {
      setActiveForm(null);
    }, 2000);

    } catch (error) {
      console.error("Error processing Account:", error);
    }

    
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
                key={acc.account_no}
                className="p-4 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openUserDetails(acc)}
              >
                <p className="text-lg text-blue-600 font-semibold">
                  {acc.cust_id }
                </p>
                <p className="text-gray-700">
                  Account ID: <span className="font-bold">{acc.account_no}</span>
                </p>
                <p className="text-gray-700">
                  Account Type: <span className="font-bold">{acc.account_type}</span>
                </p>
                <p className="text-gray-700">
                  Initial Deposit: <span className="font-bold">${acc.balance}</span>
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
              User Details: {selectedRequest.cust_id}
            </h4>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-bold">Account ID:</span> {selectedRequest.account_no}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Account Type:</span> {selectedRequest.account_type}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Initial Deposit:</span> ${selectedRequest.balance}
              </p>
            
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() =>{ 
                  
                  handleProcessAccount("close")
                } }
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
              >
                Reject Account
              </button>
              <button
                onClick={() => {
                  
                  handleProcessAccount("approve");
                }}
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
              Bank account request {processStatus === "approve" ? "approved" : "rejected"} successfully!
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


const AccountFreezingModule = ({ setActiveForm , adminId}) => {
  const [accountId, setAccountId] = useState("");
  const [validated, setValidated] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [freezeSlipId, setFreezeSlipId] = useState(null);

  const validateAccountId = async() => {
    if (accountId.trim() !== "") {
      try {
        const response = await fetch(`/api/accounts/${accountId}`);
        if (!response.ok) throw new Error("Invalid Account ID or Account Not Found");
        
        const data = await response.json();
        console.log(data);
        setAccountDetails(data.accounts[0]);
        setValidated(true);
      } catch (error) {
        console.error('Error validating account:', error);
      }
  };}

  const handleFreeze = () => {
    if (accountId && accountDetails) {
      setShowConfirmation(true);
    }
  };

  const confirmFreeze = async () => {
    try {
      console.log(accountId);
      const response = await fetch(`/api/admin/accounts/${accountId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "inactive",admin_id:adminId,action_type: "freeze" }),
      });

      if (!response.ok) throw new Error("Failed to freeze account");

      const slipId = Math.floor(Math.random() * 1000000);
    setFreezeSlipId(slipId);
    setShowConfirmation(false);
    setTimeout(() => {
      setActiveForm(null);
    }, 2000);
    } catch (error) {
      console.error('Error freezing account:', error);
    }
  }
  

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
              <span className="font-bold">UserID:</span> {accountDetails.cust_id}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-bold">Account Type:</span> {accountDetails.account_type}
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
    
    const TransactionReversalModule = ({ setActiveForm,adminId }) => {
      const [transactionId, setTransactionId] = useState("");
      const [validated, setValidated] = useState(false);
      const [transactionDetails, setTransactionDetails] = useState(null);
      const [showConfirmation, setShowConfirmation] = useState(false);
      const [reverseSlipId, setReverseSlipId] = useState(null);
     
      const [reason, setReason] = useState("");
      const [loading, setLoading] = useState(false);
    
      const validateTransactionId = async () => {
        try {
            const response = await fetch(`/api/admin/transactions/${transactionId}`);
            if (!response.ok) throw new Error("Transaction not found");
    
            const data = await response.json();
    
            setTransactionDetails({
                amount: data.amount,
                date: data.date, // This was missing
                status: data.status
            });
    
            setValidated(true);
        } catch (error) {
            alert(error.message);
        }
    };
    
      const handleReverse = () => {
        if (transactionId && transactionDetails) {
          setShowConfirmation(true);
        }
      };
    
      const confirmReverse = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/admin/transactions/reverse/${transactionId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ admin_id: adminId, reason }),
          });
          if (!response.ok) throw new Error("Reversal failed");
          const data = await response.json();
         // setReverseSlipId(data.reverseSlipId);
          setShowConfirmation(false);
          setTimeout(() => setActiveForm(null), 2000);
        } catch (error) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
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
                <p className="mb-2 text-gray-700 font-bold">Amount: ${transactionDetails.amount}</p>
                <p className="mb-2 text-gray-700">Date: {transactionDetails.date}</p>
                <p className="mb-2 text-gray-700">Status: {transactionDetails.status}</p>
                <input
                  type="text"
                  placeholder="Enter Reason"
                  className="w-full p-2 border rounded my-2"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <button
                  onClick={handleReverse}
                  className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition-colors"
                >
                  Reverse Transaction
                </button>
              </div>
            )}
          </div>
    
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
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          )}
    
          {reverseSlipId && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
                <p className="text-lg">
                  Transaction reversed successfully! Reverse Slip ID: <span className="font-bold">{reverseSlipId}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      );
    };
    
    const DepositManagementModule = ({ setActiveForm, adminId }) => {
      const [accountNumber, setAccountNumber] = useState("");
      const [amount, setAmount] = useState("");
      const [showConfirmation, setShowConfirmation] = useState(false);
      const [depositSlipId, setDepositSlipId] = useState(null);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(false);
    
      const handleDeposit = () => {
        if (accountNumber.trim() && parseFloat(amount) > 0) {
          setShowConfirmation(true);
        }
      };
    
      const confirmDeposit = async () => {
        setShowConfirmation(false);
        setLoading(true);
        setError(null);
    
        try {
          const response = await fetch("/api/transfers/deposits", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              acc_no: accountNumber,
              admin_id: adminId,
              amount: Number(amount),
            }),
          });
    
          const responseText = await response.text();
          let data = {};
          if (responseText) {
            try {
              data = JSON.parse(responseText);
            } catch (err) {
              console.error("Error parsing JSON:", err);
            }
          }
    
          if (!response.ok) {
            console.error("Deposit error data:", data);
            throw new Error(data.error || `Deposit failed with status ${response.status}`);
          }
    
          console.log("Deposit successful:", data);
          setDepositSlipId(data.deposit_id);
    
          setAccountNumber("");
          setAmount("");
        } catch (err) {
          console.error("Error processing deposit:", err);
          setError(err.message);
        } finally {
          setLoading(false);
          if (!error) {
            setTimeout(() => {
              setActiveForm(null);
            }, 2000);
          }
        }
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100">
          <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Deposit</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Account Number"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Amount"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button
              onClick={handleDeposit}
              disabled={loading}
              className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Processing..." : "Deposit"}
            </button>
          </div>
    
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
                <p className="text-lg mb-4">
                  Confirm deposit of ${amount} into account {accountNumber}?
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
    
          {depositSlipId && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
                <p className="text-lg">
                  Your deposit has been processed! Deposit Slip ID: {" "}
                  <span className="font-bold">{depositSlipId}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      );
    };
export default AdminDashboard;
