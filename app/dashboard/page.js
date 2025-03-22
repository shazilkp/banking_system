import React from "react";

export default function MockPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">Mock Page</h1>
        <p className="mt-4 text-gray-600">
          This is a temporary mock page built with React and Tailwind CSS.
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
          Click Me
        </button>
      </div>
    </div>
  );
}
