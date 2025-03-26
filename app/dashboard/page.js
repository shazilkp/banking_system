"use client";
import { useRef,useState } from "react";
import { ChartPie, UserRoundPlus, Landmark ,IndianRupee, HandCoins, PiggyBank, WalletMinimal, History, Ticket, User, Send, ReceiptIcon, ReceiptText} from 'lucide-react';


const Dashboard = () => {
  const [activeForm, setActiveForm] = useState(null);

  return (
      <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-90 bg-gray-900 text-white p-6 flex-shrink-0">
        <div className="p-5 flex flex-col text-center"><h2 className="text-3xl font-bold mb-6">NITC Bank</h2></div>
  
        <div className={`flex flex-col p-4 text-base font-normal rounded-lg 
          ${activeForm === null ? "bg-blue-700 text-white" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm(null)} className="flex flex-row ml-5"> <ChartPie className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Dashboard</div>
        </button> 
				</div>
        
        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "createAccount" ? "bg-blue-700 text-white" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("createAccount")} className="flex flex-row ml-5"> <UserRoundPlus className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Create Account</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "takeLoan" ? "bg-blue-700 text-white" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("takeLoan")} className="flex flex-row ml-5"> <Landmark className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Take a Loan</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "transferMoney" ? "bg-blue-700 text-white" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("transferMoney")} className="flex flex-row ml-5"> <IndianRupee className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Transfer Money</div>
        </button> 
				</div>
        
        <div className={`flex flex-col p-4 text-base font-normal rounded-lg 
          ${activeForm === "withdraw" ? "bg-blue-700 text-white" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("withdraw")} className="flex flex-row ml-5"> <HandCoins className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Withdraw</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "repayLoan" ? "bg-blue-700 text-white" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("repayLoan")} className="flex flex-row ml-5"> <PiggyBank  className="w-7 h-7  text-primary"/><div className="text-xl ml-2">Repay Loan</div>
        </button> 
				</div>

        <div className={`flex flex-col  p-4 text-base font-normal rounded-lg 
          ${activeForm === "viewBalance" ? "bg-blue-700 text-white" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("viewBalance")} className="flex flex-row ml-5"> <WalletMinimal  className="w-7 h-7  text-primary"/><div className="text-xl ml-2">View Balance</div>
        </button> 
				</div>

        <div className={`flex flex-col   p-4 text-base font-normal rounded-lg 
          ${activeForm === "viewTransactions" ? "bg-blue-700 text-white" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
				<button onClick={() => setActiveForm("viewTransactions")} className="flex flex-row ml-5"> <History  className="w-7 h-7  text-primary"/><div className="text-xl ml-2">View Transaction History</div>
        </button> 
				</div>
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
  const [avatar, setAvatar] = useState("https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg");
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

  const activities = [
    {
      id: 1,
      icon: <IndianRupee className="w-5 h-5 text-white" />,
      bgColor: "bg-green-500",
      text: "Deposit of $500 credited to ",
      highlight: "Checking",
      date: "28-12-2018 12:34 PM",
    },
    {
      id: 2,
      icon: <IndianRupee className="w-5 h-5 text-white" />,
      bgColor: "bg-red-500",
      text: "Withdrawal of $200 debited from ",
      highlight: "Savings",
      date: "26-11-2018 08:47 PM",
    },
    {
      id: 3,
      icon: <Send className="w-5 h-5 text-white" />,
      bgColor: "bg-blue-600",
      text: "Transfer of $300 from Checking to Savings",
      highlight: "",
      date: "24-11-2018 11:13 PM",
    },
    {
      id: 4,
      icon: <PiggyBank className="w-5 h-5 text-white" />,
      bgColor: "bg-yellow-500",
      text: "Repayment of Loan ",
      highlight: "#123456",
      date: "31-12-2017 09:22 AM",
    },
  ];

  const bills = [
    {
      id: 1,
      icon: <ReceiptText className="w-5 h-5 text-white" />,
      bgColor: "bg-gray-600",
      text: "Electricity Bill: ",
      highlight: "$150 due on 2025-04-05",
      date: "28-12-2018 12:34 PM",
    },
    {
      id: 2,
      icon: <ReceiptText className="w-5 h-5 text-white" />,
      bgColor: "bg-gray-600",
      text: "Internet:  ",
      highlight: "$60 due on 2025-04-15",
      date: "26-11-2018 08:47 PM",
    },
    {
      id: 3,
      icon: <ReceiptText className="w-5 h-5 text-white" />,
      bgColor: "bg-gray-600",
      text: "Water Bill: ",
      highlight: "$75 due on 2025-04-10",
      date: "24-11-2018 11:13 PM",
    },
  ];

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
          <h3 className="text-3xl font-bold text-gray-800">Welcome back, Victor!</h3>
          <p className="text-gray-600">Last login: 09/06/2016 05:34:59 PM PHT</p>
          
          
        </div>
      </div>

      {/* Middle Section: Accounts and Expenses */}
      <div className="flex flex-grow gap-6">
        
        {/* All Accounts - Larger */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          
          <h3 className="text-lg font-bold mb-4 text-gray-800">All Accounts</h3>
          <div className="relative overflow-x-auto shadow-md rounded-lg" ><table className="w-full  text-left">
            <thead>
              <tr className="bg-indigo-100">
                <th className=" p-3">Type</th>
                <th className=" p-3">Account Name</th>
                <th className=" p-3">Status</th>
                <th className=" p-3">Currency</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition">
                <td className=" p-3">Checking</td>
                <td className=" p-3">1267451**** - WOLFE</td>
                <td className=" p-3 text-green-600">Active</td>
                <td className=" p-3">USD</td>
              </tr>
              <tr className=" hover:bg-gray-100 transition">
                <td className=" p-3">Savings</td>
                <td className=" p-3">5719371**** - MAENGUNE</td>
                <td className=" p-3 text-green-600">Active</td>
                <td className=" p-3">USD</td>
              </tr>
            </tbody>
          </table>
          </div>
          
        </div>

        {/* Expenses Report - Chart */}
        <div className="w-1/3 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Expenses Report</h3>
          <div className="h-48 flex items-center justify-center bg-indigo-50 rounded-lg">
            
<div class="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
  <div class="flex justify-between">
    <div>
      <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">32.4k</h5>
      <p class="text-base font-normal text-gray-500 dark:text-gray-400">Users this week</p>
    </div>
    <div
      class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
      12%
      <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
      </svg>
    </div>
  </div>
  <div id="area-chart"></div>
  <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
    <div class="flex justify-between items-center pt-5">
      
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="lastDaysdropdown"
        data-dropdown-placement="bottom"
        class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
        type="button">
        Last 7 days
        <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      
      <div id="lastDaysdropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
            </li>
          </ul>
      </div>
      <a
        href="#"
        class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
        Users Report
        <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
      </a>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Bottom Section: Activities and Pending Bills - Side by Side */}
      <div className="flex gap-6">
        {/* All Activities */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow ">
          {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
        <a href="#" className="text-blue-500 text-sm hover:underline">
          View All
        </a>
      </div>

      {/* Activity List */}
      <ul className="mt-4 space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${activity.bgColor}`}
            >
              {activity.icon}
            </div>

            {/* Text Content */}
            <div className="text-gray-700 text-sm">
              <span>{activity.text}</span>
              <span className="text-blue-500 font-semibold cursor-pointer">
                {activity.highlight}
              </span>
              <p className="text-xs text-gray-500">{activity.date}</p>
            </div>
          </li>
        ))}
      </ul>
        </div>

        {/* Pending Bills */}

        
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow ">
           {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Pending Bills</h3>
        <a href="#" className="text-blue-500 text-sm hover:underline">
          View All
        </a>
      </div>

      {/* Bills List */}
      <ul className="mt-4 space-y-4">
        {bills.map((bills) => (
          <li key={bills.id} className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${bills.bgColor}`}
            >
              {bills.icon}
            </div>

            {/* Text Content */}
            <div className="text-gray-700 text-sm">
              <span>{bills.text}</span>
              <span className="text-blue-500 font-semibold cursor-pointer">
                {bills.highlight}
              </span>
              <p className="text-xs text-gray-500">{bills.date}</p>
            </div>
          </li>
        ))}
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

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setActiveForm(null);
    // Call your account creation API here if needed
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Create Account</h3>
        
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
        
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
        >
          Submit
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


const TakeLoanForm = ({ setActiveForm }) => {
  const [loanType, setLoanType] = useState("");
  const [branch, setBranch] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loanId, setLoanId] = useState(null);
  const [showApproval, setShowApproval] = useState(false);

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
    setShowConfirmation(false);
    setShowApproval(true);
    // After 2 seconds, close the approval modal and clear the form.
    setTimeout(() => {
      setShowApproval(false);
      setActiveForm(null);
    }, 2000);
  };

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
          <select
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Loan Type</option>
            {loanOptions.map((loan, index) => (
              <option key={index} value={loan.type}>
                {loan.type} ({loan.rate} interest)
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
    setShowConfirmation(false);
    setTimeout(() => {
      setActiveForm(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Withdraw</h3>
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
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
        >
          Withdraw
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

      {/* Approval Modal */}
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
    setShowConfirmation(false);
    setTimeout(() => {
      setActiveForm(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Repay Loan</h3>
        {!validated && (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Loan ID"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={loanId}
                onChange={(e) => setLoanId(e.target.value)}
              />
            </div>
            <button
              onClick={validateLoanId}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
            >
              Validate Loan ID
            </button>
          </>
        )}
        {validated && loanDetails && (
          <div className="mt-4">
            <p className="mb-2 text-gray-700">Pending Amount: ${loanDetails.pendingAmount}</p>
            <p className="mb-4 text-gray-700">Due Date: {loanDetails.dueDate}</p>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Account Number for Repayment"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
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
            <button
              onClick={handleRepayment}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
            >
              Submit Repayment
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-2xl max-w-sm w-full bg-white bg-opacity-80">
            <p className="text-lg mb-4">
              Confirm repayment of ${repayAmount} from account {accountNumber} for loan {loanId}?
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


const ViewBalanceForm = ({ setActiveForm }) => {
  // Simulated account balances
  const accounts = [
    { id: "all", type: "All Accounts", balance: 17288.29 },
    { id: "acc1", type: "Checking", account: "1267451****", balance: 10500.0, currency: "USD" },
    { id: "acc2", type: "Savings", account: "5719371****", balance: 6788.29, currency: "USD" }
  ];

  const [selectedAccountId, setSelectedAccountId] = useState("all");

  // Find the account based on selection
  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">View Balance</h3>
        <select
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            <h4 className="font-bold mb-2 text-gray-800">{selectedAccount.type} Account Balance:</h4>
            <p className="text-2xl font-bold text-blue-600">
              ${selectedAccount.balance.toFixed(2)} {selectedAccount.currency}
            </p>
          </div>
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full bg-white">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Transaction History</h3>
        <select
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">ID</th>
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Description</th>
                  <th className="border border-gray-300 p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-100 transition">
                    <td className="border border-gray-300 p-2">{tx.id}</td>
                    <td className="border border-gray-300 p-2">{tx.date}</td>
                    <td className="border border-gray-300 p-2">{tx.description}</td>
                    <td className="border border-gray-300 p-2">{tx.amount}</td>
                  </tr>
                ))}
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
