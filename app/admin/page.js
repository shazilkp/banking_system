
"use client";
import { useState, useRef } from "react";

const AdminDashboard = () => {
  const [activeModule, setActiveModule] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex-shrink-0 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <button onClick={() => setActiveModule(null)} className="w-full p-3 bg-blue-700 text-white my-2 rounded hover:bg-blue-800 transition">Dashboard</button>
        <button onClick={() => setActiveModule("loanApproval")} className="w-full p-3 bg-blue-700 text-white my-2 rounded hover:bg-blue-800 transition">Loan Approvals</button>
        <button onClick={() => setActiveModule("accountApproval")} className="w-full p-3 bg-blue-700 text-white my-2 rounded hover:bg-blue-800 transition">Account Approvals</button>
        <button onClick={() => setActiveModule("accountFreeze")} className="w-full p-3 bg-blue-700 text-white my-2 rounded hover:bg-blue-800 transition">Account Freezing</button>
        <button onClick={() => setActiveModule("transactionReversal")} className="w-full p-3 bg-blue-700 text-white my-2 rounded hover:bg-blue-800 transition">Transaction Reversal</button>
        <button onClick={() => setActiveModule("depositManagement")} className="w-full p-3 bg-blue-700 text-white my-2 rounded hover:bg-blue-800 transition">Deposit Management</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white overflow-hidden p-6">
        {activeModule === null && <AdminOverview />}
        {activeModule === "loanApproval" && <LoanApprovalModule />}
        {activeModule === "accountApproval" && <AccountApprovalModule />}
        {activeModule === "accountFreeze" && <AccountFreezingModule />}
        {activeModule === "transactionReversal" && <TransactionReversalModule />}
        {activeModule === "depositManagement" && <DepositManagementModule />}
      </main>
    </div>
  );
};

const AdminOverview = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Welcome, Admin!</h2>
      <p className="text-gray-700">Manage loans, accounts, transactions, and deposits efficiently.</p>
    </div>
  );
};

const LoanApprovalModule = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Loan Approvals</h2>
      <p className="text-gray-700">View and approve/reject loan applications with credit score analysis.</p>
    </div>
  );
};

const AccountApprovalModule = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Account Approvals</h2>
      <p className="text-gray-700">Review and approve new account requests with verification details.</p>
    </div>
  );
};

const AccountFreezingModule = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Account Freezing</h2>
      <p className="text-gray-700">Search for accounts and freeze/unfreeze them as necessary.</p>
    </div>
  );
};

const TransactionReversalModule = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Transaction Reversal</h2>
      <p className="text-gray-700">Securely review and validate transaction reversal requests.</p>
    </div>
  );
};

const DepositManagementModule = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Deposit Management</h2>
      <p className="text-gray-700">Manually manage deposits and view real-time status updates.</p>
    </div>
  );
};

export default AdminDashboard;
