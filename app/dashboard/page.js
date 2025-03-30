"use client";

import { useRef,useState,useEffect } from "react";
import { ChartPie, UserRoundPlus, Landmark ,IndianRupee, HandCoins, PiggyBank, WalletMinimal, History,Send, ReceiptIcon, ReceiptText} from 'lucide-react';


const Dashboard = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [userId,setUserId] = useState(null);
  const [userName,setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user ID
        const response = await fetch("/api/auth/", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent
        });
  
        if (!response.ok) throw new Error("Unauthorized");
  
        const data = await response.json();
        setUserId(data.userId);
  
        // Fetch user name only after user ID is retrieved
        const userResponse = await fetch(`/api/user/${data.userId}`);
        if (!userResponse.ok) throw new Error("User not found");
  
        const userData = await userResponse.json();
  
        setUserName(userData.customers[0].customer_name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  /*
  useEffect(() => {

    const fetchUserName = async () => {
      try {
          const response = await fetch(`/api/user/${userId}`);

       
  
          if (!response.ok) {
              throw new Error("User not found");
          }
  
          const data = await response.json();
          setUserName(data.customer_name);
          return data.customer_name;
      } catch (error) {
          console.error("Error fetching user ID:", error);
          return null;
      }
  };

  // Usage
  const userID =fetchUserName();
  console.log(userID);
  },[userId])
  */

  useEffect(() => {
    console.log(userId,userName);
  },[userId,userName])

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
          ${activeForm === "createAccount" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("createAccount")} className="flex flex-row ml-5"> <UserRoundPlus className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Create Account</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "takeLoan" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("takeLoan")} className="flex flex-row ml-5"> <Landmark className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Take a Loan</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "transferMoney" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("transferMoney")} className="flex flex-row ml-5"> <IndianRupee className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Transfer Money</div>
        </button> 
				</div>
        
        <div className={`flex flex-col p-4 text-base font-normal rounded-lg 
          ${activeForm === "withdraw" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("withdraw")} className="flex flex-row ml-5"> <HandCoins className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Withdraw</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "repayLoan" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("repayLoan")} className="flex flex-row ml-5"> <PiggyBank  className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Repay Loan</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "viewBalance" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("viewBalance")} className="flex flex-row ml-5"> <WalletMinimal  className="w-7 h-7  text-primary"/><div className="text-xl ml-2">View Balance</div>
        </button> 
				</div>

        <div className={`flex flex-col   p-4 text-base font-normal rounded-lg 
          ${activeForm === "viewTransactions" ? "bg-blue-700 text-white" : "text-gray-900 text-white hover:bg-gray-100 hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("viewTransactions")} className="flex flex-row ml-5"> <History  className="w-7 h-7  text-primary"/><div className="text-xl ml-2">View Transaction History</div>
        </button> 
				</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeForm === null && <DashboardOverview userId={userId} userName= {userName}/>}
        {activeForm === "createAccount" && <CreateAccountForm setActiveForm={setActiveForm} userId={userId} />}
        {activeForm === "takeLoan" && <TakeLoanForm setActiveForm={setActiveForm} userId={userId} />}
        {activeForm === "transferMoney" && <TransferMoneyForm setActiveForm={setActiveForm} userId={userId}/>}

        {activeForm === "withdraw" && <WithdrawForm setActiveForm={setActiveForm} userId={userId}/>}
        {activeForm === "repayLoan" && <RepayLoanForm setActiveForm={setActiveForm} userId={userId} />}
        {activeForm === "viewBalance" && <ViewBalanceForm setActiveForm={setActiveForm} userId={userId}/>}

        {activeForm === "viewTransactions" && <ViewTransactionHistoryForm setActiveForm={setActiveForm} userId={userId} />}
      </main>
    </div>
  );
};


const DashboardOverview = ({ userId ,userName}) => {
  const [avatar, setAvatar] = useState(
    "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
  );
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

  // Accounts state
  const [accounts, setAccounts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activitiesNotUnique, setActivitiesNotUnique] = useState([]);
  const [loanRepayments,setLoanRepayments] = useState([]);
  const [loans,setLoans] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reportData, setReportData] = useState([]);

  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState(null);
  const [transactionsError, setTransactionsError] = useState(null);
  const [loanRepaymentsError, setLoanRepaymentsError] = useState(null);
  const [loansError, setLoansError] = useState(null);
  
  useEffect(() => {
    const fetchAccounts = async () => {
      
      try {
        const response = await fetch(`/api/accounts/user/${userId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch accounts");
        }
        const data = await response.json();
        setAccounts(data.accounts);
  
        // Fetch transactions only after accounts are set
        fetchTransactions(data.accounts);
      } catch (error) {
        setAccountsError(error.message);
        setAccountsLoading(false);
      }
    };
  
    const fetchTransactions = async (accounts) => {
      try {
        const transactionsPromises = accounts.map(async (account) => {
          const response = await fetch(`/api/transfers/${account.account_no}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch transactions for account ${account.account_no}`);
          }
          return response.json();
        });
  
        const transactionsResults = await Promise.allSettled(transactionsPromises);
        console.log(transactionsResults);
        const successfulTransactions = transactionsResults
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value.transactions)
          .flat();
  
        setTransactions(successfulTransactions);
  
        const rejectedTransactions = transactionsResults
          .filter((result) => result.status === "rejected")
          .map((result) => result.reason.message);
  
        if (rejectedTransactions.length > 0) {
          setTransactionsError(rejectedTransactions.join(", "));
        }
      } catch (error) {
        setTransactionsError(error.message);
      }
    };
  
    const fetchLoanRepayments = async () => {
      try {
        console.log("hello194");
        const response = await fetch(`/api/loan-repayments/${userId}`);
        
        
        if (!response.ok) {
          throw new Error("Failed to fetch loan repayments");
        }
        const data = await response.json();
        //console.log(data);
        setLoanRepayments(data.transactions);
      } catch (error) {
        setLoanRepaymentsError(error.message);
      }
    };

    const fetchLoans = async () => {
      
      try {
        const response = await fetch(`/api/loans/${userId}`);
        
        
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }

        const data = await response.json();
        console.log("hello",data);
        setLoans(data);
      } catch (error) {
        setLoansError(error.message);
      }
    };
  
    if (userId) {
      fetchAccounts();
      fetchLoanRepayments();
      fetchLoans();
    }
  
    setAccountsLoading(false);
  }, [userId]);

  useEffect(() => {
    console.log(activities);
  },[activities])
  
  useEffect(() => {
    const formattedTransactions = transactions.map((tx) => {
      const senderAccount = accounts.find((acc) => acc.account_no === tx.sender_acc_no);
      const receiverAccount = accounts.find((acc) => acc.account_no === tx.receiver_acc_no);
  
      const senderExists = !!senderAccount;
      const receiverExists = !!receiverAccount;
  
      let type = "Unknown";
      let icon = "❓";
      let bgColor = "bg-gray-200";
      let amountColor = "text-gray-500";
      let senderType = senderAccount ? senderAccount.account_type : tx.sender_acc_no || "Unknown";
      let receiverType = receiverAccount ? receiverAccount.account_type : tx.receiver_acc_no || "Unknown";
      
      let description = "";
  
      if (tx.sender_acc_no === null) {
        type = "Deposit";
        icon = <IndianRupee className="w-5 h-5 text-white" />;
        bgColor = "bg-green-500";
        amountColor = "text-blue-500";
        description = (
          <>
            Deposit of <span className={`${amountColor} font-bold`}>₹{tx.amount}</span> credited to {receiverType}
          </>
        );
      } else if (tx.receiver_acc_no === null) {
        type = "Withdrawal";
        icon = <IndianRupee className="w-5 h-5 text-white" />;
        bgColor = "bg-red-500";
        amountColor = "text-orange-500";
        description = (
          <>
            Withdrawal of <span className={`${amountColor} font-bold`}>₹{tx.amount}</span> from {senderType}
          </>
        );
      } else if (senderExists && receiverExists) {
        type = "Internal Transfer";
        icon = <Send className="w-5 h-5 text-white" />;
        bgColor = "bg-blue-500";
        amountColor = "text-yellow-500";
        description = (
          <>
            Internal transfer of <span className={`${amountColor} font-bold`}>₹{tx.amount}</span> from {senderType} to {receiverType}
          </>
        );
      } else if (senderExists) {
        type = "Sent";
        icon = <IndianRupee className="w-5 h-5 text-white" />;
        bgColor = "bg-red-200";
        amountColor = "text-red-500";
        description = (
          <>
            Sent <span className={`${amountColor} font-bold`}>₹{tx.amount}</span> from {senderType} to {tx.receiver_acc_no || "Unknown"}
          </>
        );
      } else if (receiverExists) {
        type = "Received";
        icon = <IndianRupee className="w-5 h-5 text-white" />;
        bgColor = "bg-green-200";
        amountColor = "text-green-500";
        description = (
          <>
            Received <span className={`${amountColor} font-bold`}>₹{tx.amount}</span> in {receiverType} from {tx.sender_acc_no || "Unknown"}
          </>
        );
      }
  
      return {
        id: tx.id,
        type,
        from: tx.sender_acc_no || "Bank",
        to: tx.receiver_acc_no || "Cash",
        amount: tx.amount,
        date: tx.timestamp || new Date().toISOString(),
        icon,
        bgColor,
        description,
      };
    });
  
    const uniqueTransactions = Array.from(new Map(formattedTransactions.map(tx => [tx.id, tx])).values());
  
    const formattedLoanRepayments = loanRepayments.map((loan) => {
      const repayerAccount = accounts.find((acc) => acc.account_no === loan.repayer_acc_no);
      const repayerType = repayerAccount ? repayerAccount.type : "Unknown";
  
      return {
        id: loan.transaction_id,
        type: "Loan Repayment",
        from: loan.repayer_acc_no,
        to: loan.loan_id,
        amount: loan.amount_paid,
        date: loan.payment_date,
        icon: <PiggyBank className="w-5 h-5 text-white" />,
        bgColor: "bg-yellow-500",
        description: (
          <>
            Loan Repayment: <span className="text-blue-500 font-bold">₹{loan.amount_paid}</span> from {repayerType} to Loan {loan.loan_id}
          </>
        ),
      };
    });
  
    // Merge and sort by date (most recent first)
    const mergedActivities = [...uniqueTransactions, ...formattedLoanRepayments].sort(
      (a, b) => new Date(b.date) - new Date(a.date));
      
    const mergedActivitiesNotUnique = [...formattedTransactions, ...formattedLoanRepayments].sort(
      (a, b) => new Date(b.date) - new Date(a.date));

    setActivities(mergedActivities);
    setActivitiesNotUnique(mergedActivitiesNotUnique);
  }, [accounts, transactions, loanRepayments]);

  
  

  
    useEffect(() => {
      const groupedData = {};
  
      activities.forEach(({ date, amount, type }) => {
        const day = new Date(date).toLocaleDateString();
        if (!groupedData[day]) groupedData[day] = { income: 0, expense: 0 };
        
        if (type === 'Deposit' || type === 'Received') {
          groupedData[day].income += amount;
        } else if (type === 'Sent' || type === 'Withdraw' || type === 'Loan Repayment'){
          groupedData[day].expense += amount;
        }

        groupedData[day].net = groupedData[day].income - groupedData[day].expense;
      });
  
      setReportData(Object.entries(groupedData));
    }, [activities]);

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : reportData.length - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex < reportData.length - 1 ? prevIndex + 1 : 0));
    };


  return (
    <div className="flex flex-col overflow-y-auto h-full gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-100">
      {/* Top Section: Avatar & Welcome */}
      <div className="flex-shrink-0 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex items-center space-x-6 h-1/5">
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
          <h3 className="text-3xl font-bold text-gray-800">
            Welcome back, {userName}!
          </h3>
          <p className="text-gray-600">
            Last login: 09/06/2016 05:34:59 PM PHT
          </p>
        </div>
      </div>

      {/* Middle Section: Accounts and Expenses */}
      <div className="flex flex-grow gap-6">
        {/* All Accounts - Larger */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            All Accounts
          </h3>
          <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="p-3">Type</th>
                  <th className="p-3">Account Number</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Currency</th>
                </tr>
              </thead>
              <tbody>
                {accountsLoading && (
                  <tr>
                    <td className="p-3" colSpan="4">
                      Loading accounts...
                    </td>
                  </tr>
                )}
                {accountsError && (
                  <tr>
                    <td className="p-3 text-red-500" colSpan="4">
                      {accountsError}
                    </td>
                  </tr>
                )}
                {!accountsLoading && !accountsError && accounts.length === 0 && (
                  <tr>
                    <td className="p-3" colSpan="4">
                      No accounts found.
                    </td>
                  </tr>
                )}
                {!accountsLoading &&
                  !accountsError &&
                  accounts.map((acc) => (
                    <tr
                      key={acc.account_no}
                      className="border-b border-gray-300 hover:bg-gray-100 transition"
                    >
                      <td className="p-3 capitalize">{acc.account_type}</td>
                      <td className="p-3">
                        {acc.account_no}
                      </td>
                      <td className="p-3">
                        <span
                          className={
                            acc.status === "active"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {acc.status}
                        </span>
                      </td>
                      <td className="p-3">USD</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expenses Report - Chart */}
        <div className="w-1/3 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            Expenses Report
          </h3>
          <div className="h-48 flex items-center justify-center bg-indigo-50 rounded-lg">
            {/* Expenses chart placeholder */}
            <div className="w-full max-w-lg mx-auto p-4 h-full bg-white rounded-lg shadow relative flex items-center">
              <button onClick={handlePrev} className="absolute left-0 px-4 py-2  rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-full text-center h-full">
                {reportData.length > 0 && (
                  <div className="flex flex-col-reverse h-full items-center">
                    <p className="font-semibold mb-2">{reportData[currentIndex][0]}</p>
                    <div className="flex items-end gap-2">
                      <div className="bg-blue-500 w-10 rounded-md" style={{ height: `${reportData[currentIndex][1].income / 100}px` }}></div>
                      <div className="bg-red-500 w-10 rounded-md" style={{ height: `${reportData[currentIndex][1].expense / 100}px` }}></div>
                    </div>
                    <div className="flex justify-between w-full text-xs mt-2">
                      <span className="text-blue-500">Income: {reportData[currentIndex][1].income}</span>
                      <span className="text-red-500">Expense: {reportData[currentIndex][1].expense}</span>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={handleNext} className="absolute right-0 px-4 py-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Activities and Pending Bills */}
      <div className="flex gap-6">
        {/* All Activities */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
            
          </div>
          <ul className="mt-4 space-y-4">
            {activities.slice(0,5).map((activity) => (
              <li key={activity.id} className="flex items-start gap-4">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${activity.bgColor}`}>
                  {activity.icon}
                </div>
                <div className="text-gray-700 text-sm">
                  <span>{activity.description}</span>
                  <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pending Bills */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Pending Loans</h3>
            
          </div>
          <ul className="mt-4 space-y-4">
            {loans.slice(0,5).map((loan) => (
              <li key={loan.loan_id} className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-200">
                  <Landmark/>
                </div>
                <div className="text-gray-700 text-sm">
                  <span>Loan ID: </span>
                  <span className="text-blue-500 font-semibold cursor-pointer">
                    {loan.loan_id}
                  </span>
                  <p className="text-xs text-gray-500">
                    Remaining Amount: ₹{loan.remaining_amount}
                  </p>
                  <p className="text-xs text-gray-500">
                    Due Date: {new Date(loan.repayment_date).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};


const CreateAccountForm = ({ setActiveForm, userId }) => {
  const [accountType, setAccountType] = useState("");
  const [branch, setBranch] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Show confirmation modal before proceeding
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    setLoading(true);
    setError(null);

    try {
      // Call the account creation API
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cust_id: userId,
          account_type: accountType,
          initial_balance: 0, // Or update with another value if needed
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to create account");
      }

      const data = await response.json();
      console.log("Account created successfully:", data);
      // Optionally, display a success notification or update state here

    } catch (err) {
      console.error("Error creating account:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setActiveForm(null); // Close the form
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Create Account</h3>
        
        {/* Optionally include an input for full name if needed */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        
        <div className="mb-4">
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Account Type</option>
            <option value="savings">Savings</option>
            <option value="current">Current</option>
          </select>
        </div>
        
        <div className="mb-4">
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Bank Branch</option>
            <option value="branch1">Downtown Branch</option>
            <option value="branch2">Uptown Branch</option>
          </select>
        </div>

        {error && (
          <p className="mb-4 text-red-500 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !accountType}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Submit"}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg mb-4">
              Are you sure you want to create a{" "}
              <span className="font-bold">{accountType || "..."}</span> account at{" "}
              <span className="font-bold">{branch || "..."}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const TakeLoanForm = ({ setActiveForm, userId }) => {
  const [loanType, setLoanType] = useState("");
  const [branch, setBranch] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loanId, setLoanId] = useState(null);
  const [showApproval, setShowApproval] = useState(false);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  const loanOptions = [
    { type: "Agriculture", rate: "5" },
    { type: "House", rate: "6" },
    { type: "Car", rate: "7" },
    { type: "Small Business", rate: "8" },
    { type: "Education", rate: "4" },
    { type: "Personal", rate: "9" }
  ];

  const getInterestRate = (type) => {
    const loan = loanOptions.find((option) => option.type === type);
    return loan ? loan.rate : 0;
  };

  const handleSubmit = () => {
    if (loanType && branch && loanAmount) {
      setShowConfirmation(true);
    }
  };

  const confirmLoan = () => {
    console.log("confirm");
    submitLoanRequest();
    setLoanId(Math.floor(Math.random() * 1000000));
    setShowConfirmation(false);
    setShowApproval(true);
    // After 2 seconds, close the approval modal and clear the form.
    setTimeout(() => {
      setShowApproval(false);
      setActiveForm(null);
    }, 2000);
  };


  async function submitLoanRequest() {
    try {
      console.log("1212");
      const response = await fetch("/api/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrower_id:userId, principal_amount:loanAmount,interest: getInterestRate(loanType),duration })
      });

      if (!response.ok) {
        throw new Error(`Failed to request loan: ${response.statusText}`);
      }

    } catch (error) {
      console.error("Error requesting loan:", error);
    }
  }





  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Take a Loan</h3>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Loan Amount"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
        type="number"
        placeholder="Duration (months)"
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
        </div>
        
        <div className="mb-4">
          <select
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Loan Type</option>
            {loanOptions.map((loan, index) => (
              <option key={index} value={loan.type}>
                {loan.type} ({loan.rate}% interest)
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Bank Branch</option>
            <option value="branch1">Downtown Branch</option>
            <option value="branch2">Uptown Branch</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg mb-4">
              Are you sure you want a{" "}
              <span className="font-bold">{loanType || "..."}</span> loan of $
              {loanAmount} at <span className="font-bold">{branch || "..."}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLoan}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {showApproval && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg mb-4">
              Your loan has been approved! Loan ID: <span className="font-bold">{loanId}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};


const TransferMoneyForm1 = ({ setActiveForm , userId }) => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Transfer Money</h3>
        <div className="mb-4">
          <select
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            <option value="">Select Your Account</option>
            {userAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Recipient Name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Recipient Bank Account ID"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={recipientAccountId}
            onChange={(e) => setRecipientAccountId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="What For?"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          onClick={handleTransfer}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
        >
          Transfer
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg mb-4">
              Confirm transfer of ${amount} to {recipientName} (
              {recipientAccountId}) for {purpose}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmTransfer}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TransferMoneyForm = ({ setActiveForm, userId }) => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAccountId, setRecipientAccountId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);


  async function fetchAccountsByCustomerId(custId) {
    try {
        const response = await fetch(`/api/accounts/user/${custId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch accounts: ${response.statusText}`);
        }

        const accounts = await response.json(); // Expected to be an array
       // console.log(accounts);
        return accounts; // [{ accountId: "123" }, { accountId: "456" }]
    } catch (error) {
        console.error("Error fetching accounts:", error);
        return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      console.log("hello guys");
      try {
        const data = await fetchAccountsByCustomerId(userId);
        console.log(data);
        setUserAccounts(data.accounts);
        console.log(userAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }
    
      fetchData();
      console.log(userAccounts);
    
  }, [userId]);

  

  const handleTransfer = () => {
    if (selectedAccount && recipientName && recipientAccountId && purpose && amount) {
      setShowConfirmation(true);
    }
  };

  const confirmTransfer = async () => {
    try {
      const response = await fetch("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_acc_no: selectedAccount,  // Match API key
          receiver_acc_no: recipientAccountId, // Match API key
          amount: Number(amount), // Ensure it's a number
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "Transfer failed");
      }
  
      alert("Transfer successful!");
      setActiveForm(null);
    } catch (error) {
      console.error("Error processing transfer:", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Transfer Money</h3>
        <div className="mb-4">
          <select
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
           {/* <option value="">Select Your Account</option>*/}
           <option value="">
            {userAccounts.length === 0 
              ? "Loading accounts..." 
              : "Select Your Account"}
          </option>
            {userAccounts.map((account) => (
              <option key={account.account_no} value={account.account_no}>
                {account.account_no}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Recipient Name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Recipient Bank Account ID"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={recipientAccountId}
            onChange={(e) => setRecipientAccountId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="What For?"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          onClick={handleTransfer}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
        >
          Transfer
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg mb-4">
              Confirm transfer of ${amount} to {recipientName} (
              {recipientAccountId}) for {purpose}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmTransfer}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const WithdrawForm = ({ setActiveForm, userId }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [withdrawSlipId, setWithdrawSlipId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleWithdraw = () => {
    // Validate that account number is provided and amount is greater than 0
    if (accountNumber.trim() && parseFloat(amount) > 0) {
      setShowConfirmation(true);
    }
  };

  const confirmWithdraw = async () => {
    setShowConfirmation(false);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/transfers/withdrawals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acc_no: accountNumber,
          cust_id: userId,
          amount: Number(amount),
        }),
      });

      // Read the response as text and then try to parse JSON
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
        console.error("Withdrawal error data:", data);
        // Fallback to a message that includes the status code if no error message is provided
        throw new Error(data.error || `Withdrawal failed with status ${response.status}`);
      }

      console.log("Withdrawal successful:", data);
      setWithdrawSlipId(data.withdrawal_id);

      // Optionally clear the inputs
      setAccountNumber("");
      setAmount("");
    } catch (err) {
      console.error("Error processing withdrawal:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      // Optionally close the form after a delay if successful
      if (!error) {
        setTimeout(() => {
          setActiveForm(null);
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Withdraw</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Account Number"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          onClick={handleWithdraw}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg mb-4">
              Confirm withdrawal of ${amount} from account {accountNumber}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmWithdraw}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {withdrawSlipId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg">
              Your withdrawal has been processed! Withdrawal Slip ID:{" "}
              <span className="font-bold">{withdrawSlipId}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};



const RepayLoanForm = ({ setActiveForm, userId }) => {
  const [loans, setLoans] = useState([]);
  const [selectedLoanId, setSelectedLoanId] = useState("");
  const [loanDetails, setLoanDetails] = useState(null);
  const [loanError, setLoanError] = useState("");

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  const [repayAmount, setRepayAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [repaymentSlipId, setRepaymentSlipId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repayError, setRepayError] = useState("");

  // Fetch all loans for the current user
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`/api/loans/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }
        const data = await response.json();
        setLoans(data);
        if (data.length > 0) {
          // Select the first loan by default
          setSelectedLoanId(data[0].loan_id);
          setLoanDetails({
            pendingAmount: data[0].remaining_amount,
            dueDate: data[0].repayment_date,
          });
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
        setLoanError(error.message);
      }
    };

    fetchLoans();
  }, [userId]);

  // Fetch all accounts for the current user
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`/api/accounts/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch accounts");
        }
        const data = await response.json();
        // Assuming the response structure contains { accounts: [...] }
        setAccounts(data.accounts || []);
        if (data.accounts && data.accounts.length > 0) {
          setSelectedAccount(data.accounts[0].account_no);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, [userId]);

  // Update loan details when user selects a different loan
  const handleLoanChange = (e) => {
    const id = e.target.value;
    setSelectedLoanId(id);
    const loan = loans.find((l) => l.loan_id === id);
    if (loan) {
      setLoanDetails({
        pendingAmount: loan.remaining_amount,
        dueDate: loan.repayment_date,
      });
    }
  };

  // Update selected account
  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  // Show confirmation modal if repayment details are valid
  const handleRepayment = () => {
    if (!selectedLoanId || !selectedAccount || !repayAmount || parseFloat(repayAmount) <= 0) {
      setRepayError("Please select a loan, an account, and enter a valid repayment amount.");
      return;
    }
    setRepayError("");
    setShowConfirmation(true);
  };

  // On confirmation, call the backend repayment API
  const confirmRepayment = async () => {
    setShowConfirmation(false);
    setLoading(true);
    setRepayError("");
    try {
      const response = await fetch("/api/loan-repayments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loan_id: selectedLoanId,
          repayer_acc_no: selectedAccount,
          amount_paid: parseFloat(repayAmount),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Repayment failed");
      }
      const data = await response.json();
      setRepaymentSlipId(data.repaymentSlipId);
    } catch (error) {
      console.error("Error processing repayment:", error);
      setRepayError(error.message);
    } finally {
      setLoading(false);
      if (!repayError) {
        setTimeout(() => {
          setActiveForm(null);
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Repay Loan</h3>
        {loanError && <p className="text-red-500 mb-4">{loanError}</p>}
        {loans.length === 0 ? (
          <p>No loans found.</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Select Loan:</label>
              <select
                value={selectedLoanId}
                onChange={handleLoanChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {loans.map((loan) => (
                  <option key={loan.loan_id} value={loan.loan_id}>
                    {loan.loan_id} - Pending: ${loan.remaining_amount}
                  </option>
                ))}
              </select>
            </div>
            {loanDetails && (
              <div className="mb-4">
                <p className="text-gray-700">Pending Amount: ${loanDetails.pendingAmount}</p>
                <p className="text-gray-700">Due Date: {loanDetails.dueDate}</p>
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Select Account for Repayment:</label>
              <select
                value={selectedAccount}
                onChange={handleAccountChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {accounts.map((acc) => (
                  <option key={acc.account_no} value={acc.account_no}>
                    {acc.account_type} - {acc.account_no}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Repayment Amount"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={repayAmount}
                onChange={(e) => setRepayAmount(e.target.value)}
              />
            </div>
            {repayError && <p className="text-red-500 mb-4">{repayError}</p>}
            <button
              onClick={handleRepayment}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
            >
              {loading ? "Processing..." : "Submit Repayment"}
            </button>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg mb-4">
              Confirm repayment of ${repayAmount} from account {selectedAccount} for loan {selectedLoanId}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRepayment}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {repaymentSlipId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg">
              Repayment successful! Repayment Slip ID:{" "}
              <span className="font-bold">{repaymentSlipId}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};


const ViewBalanceForm = ({ setActiveForm, userId }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState("all");

  async function fetchAccountsByCustomerId(custId) {
    try {
      const response = await fetch(`/api/accounts/user/${custId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch accounts: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Raw API Response:", data);
      console.log("Fetched accounts response:", data);

      return data.accounts || []; // Extract array from object if needed
    } catch (error) {
      console.error("Error fetching accounts:", error);
      return [];
    }
  }

  async function fetchAccBalanceForAccount(accountId) {
    try {
      const response = await fetch(`/api/accounts/user/${accountId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch balance for account ${accountId}: ${response.statusText}`);
      }
      const responseJson = await response.json();
      console.log(`Balance for account ${accountId}:`, responseJson);
      return responseJson.accounts;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return 0;
    }
  }

  async function fetchAllAccountBalances(custId) {
    const accounts_ = await fetchAccountsByCustomerId(custId);
   
    if (!accounts_.length) {
      console.log("No accounts found for this customer.");
      return [];
    }

    // Fetch balances for each account in parallel
    const accountsWithBalances = await Promise.all(
      accounts_.map(async (account) => {
        const balance = await fetchAccBalanceForAccount(account.account_no);
        return { ...account, balance };
      })
    );

    return accountsWithBalances;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const accountsData = await fetchAccountsByCustomerId(userId);
        setAccounts(accountsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading account balances...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);

  const displayedAccounts = selectedAccountId === "all"
    ? accounts
    : accounts.filter((acc) => acc.account_no === selectedAccountId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">View Balance</h3>

        <p className="text-xl font-semibold text-gray-800 mb-2">
          Total Balance: <span className="text-blue-600">${totalBalance.toFixed(2)}</span>
        </p>

        <select
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
        >
          <option value="all">All Accounts</option>
          {accounts.map((acc) => (
            <option key={acc.account_no} value={acc.account_no}>
              {acc.account_type} - {acc.account_no}
            </option>
          ))}
        </select>

        <ul className="border-t border-gray-300 mt-2 pt-2">
          {displayedAccounts.length > 0 ? (
            displayedAccounts.map((acc) => (
              <li key={acc.account_no} className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">{acc.account_type} ({acc.account_no})</span>
                <span className="font-bold text-blue-600">${acc.balance?.toFixed(2) || "0.00"}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-700">No accounts found.</p>
          )}
        </ul>

        <button
          onClick={() => setActiveForm(null)}
          className="mt-4 w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

const ViewTransactionHistoryForm = ({ setActiveForm,userId }) => {
  // Simulated transactions with account ids (acc1 for Checking, acc2 for Savings)
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accounts,setAccounts] = useState([]);

  const allTransactions = [
    { id: 1, accountId: "acc1", date: "2025-03-01", description: "Deposit", amount: 500 },
    { id: 2, accountId: "acc2", date: "2025-03-05", description: "Withdrawal", amount: -200 },
    { id: 3, accountId: "acc1", date: "2025-03-10", description: "Transfer", amount: -300 },
    { id: 4, accountId: "acc2", date: "2025-03-12", description: "Deposit", amount: 700 }
  ];

  async function fetchAccountsByCustomerId(custId) {
    try {
        const response = await fetch(`/api/accounts/user/${custId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch accounts: ${response.statusText}`);
        }

        const accounts = await response.json(); // Expected to be an array
       // console.log(accounts);
        return accounts; // [{ accountId: "123" }, { accountId: "456" }]
    } catch (error) {
        console.error("Error fetching accounts:", error);
        return [];
    }
}

async function fetchTransactionsForAccount(accountId) {
  try {
      const response = await fetch(`/api/transfers/${accountId}`);

      if (!response.ok) {
          throw new Error(`Failed to fetch transactions for account ${accountId}: ${response.statusText}`);
      }

      const response_json = await response.json();
      const transactions = response_json.transactions;
      console.log(transactions.length);
      console.log(response_json);
      return transactions;
  } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
  }
}

/*
async function fetchCustomerTransactions(custId) {
  console.log("simpler execution")
  const response = await fetchAccountsByCustomerId(custId);
  const accounts = response.accounts;
 

  if (accounts.length === 0) {
      console.log("No accounts found for this customer.");
      return [];
  }
  const account_no = accounts[0].account_no;
  const transactions = await fetchTransactionsForAccount(account_no);
  return transactions;
}

*/


async function fetchCustomerTransactions(custId) {
  console.log("array execution")
  const response = await fetchAccountsByCustomerId(custId);
  const accounts_resp = response.accounts; // Ensure response is structured correctly

  if (!accounts_resp || accounts_resp.length === 0) {
    console.log("No accounts found for this customer.");
    return [];
  }

  // Fetch transactions for each account in parallel
  const transactionsByAccount = await Promise.all(
    accounts_resp.map(async (account) => {
      const transactions = await fetchTransactionsForAccount(account.account_no);
      return {
        accountId: account.account_no,
        transactions,
      };
    })
  );

  return transactionsByAccount; // [{ accountId: "123", transactions: [...] }, { accountId: "456", transactions: [...] }]
}


//const transactions =  fetchCustomerTransactions("shazilkp");
//console.log(transactions);
useEffect(() => {
  async function fetchData() {
    try {
      const data = await fetchCustomerTransactions(userId);
      console.log(userId)
      const accounts_resp = await fetchAccountsByCustomerId(userId);
      setAccounts(accounts_resp?.accounts || []);

      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
  
}, []); 




//const transactions =  fetchCustomerTransactions(userID);





if (error) return <p className="text-red-500">Error: {error}</p>;

  const [selectedAccountId, setSelectedAccountId] = useState("all");

  // Filter transactions if a specific account is selected
  /*
  const transactions =
    selectedAccountId === "all"
      ? allTransactions
      : allTransactions.filter((tx) => tx.accountId === selectedAccountId);
      
*/

const disp_transactions = selectedAccountId === "all"
  ? Array.from(new Map(
      transactions.flatMap(acc => acc.transactions).map(tx => [tx.id, tx])
    ).values()) // Remove duplicates by id
  : transactions
      .filter(acc => acc.accountId === selectedAccountId) // Find the right account
      .flatMap(acc => acc.transactions); // Extract transactions




//const disp_transactioyns = transactions.flatMap(acc => acc.transactions);
console.log(transactions);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Transaction History</h3>
        <select
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
        >
          <option value="all">All Accounts</option>
          {accounts.map((acc) => (
            <option key={acc.account_no} value={acc.account_no}>
              {acc.account_type} {acc.account_no ? `- ${acc.account_no}` : ""}
            </option>
          ))}
        </select>

        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left">ID</th>
                <th className="border border-gray-300 p-2 text-left">Date</th>
                <th className="border border-gray-300 p-2 text-left">Time</th>
                <th className="border border-gray-300 p-2 text-left">Type</th>
                <th className="border border-gray-300 p-2 text-left">Sender Account</th>
                <th className="border border-gray-300 p-2 text-left">Receiver Account</th>
                <th className="border border-gray-300 p-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {disp_transactions.map((tx) => {
                const dateObj = new Date(tx.timestamp);
                const formattedDate = dateObj.toLocaleDateString(); // Extracts date
                const formattedTime = dateObj.toLocaleTimeString(); // Extracts time

                return (
                  <tr key={tx.id} className="hover:bg-gray-100 transition">
                    <td className="border border-gray-300 p-2">{tx.id}</td>
                    <td className="border border-gray-300 p-2">{formattedDate}</td>
                    <td className="border border-gray-300 p-2">{formattedTime}</td>
                    <td className="border border-gray-300 p-2">{tx.type}</td>
                    <td className="border border-gray-300 p-2">{tx.sender_acc_no || "N/A"}</td>
                    <td className="border border-gray-300 p-2">{tx.receiver_acc_no || "N/A"}</td>
                    <td className="border border-gray-300 p-2">₹{tx.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>


          </div>
        ) : (
          <p className="text-gray-700">No transactions found for this account.</p>
        )}
        <button
          onClick={() => setActiveForm(null)}
          className="mt-4 w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};



export default Dashboard;
