'use client'
import { useState, useEffect } from "react";
import { redirect } from 'next/navigation'


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({ userId: "",name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const endpoint = isLogin ? "/api/login" : "/api/signup";
    const body = isLogin ? { userId: formData.userId, password: formData.password } : formData;
    let route = '/login'
    
    console.log("Sending data:", body);
    console.log("📡 Sending request to:", endpoint);


    try {
      //console.log(body);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      else{
        route = isLogin? '/dashboard' : '/login';
        if(!isLogin){
          setIsLogin(true);
        }
      }
    //   alert(isLogin ? "Login successful" : "Signup successful");
      

    } catch (err) {
        console.log(err)
      setError(err.message);
    }
    finally {
        redirect(route)
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-50 to-indigo-100"}`}>
      <div className={`w-full max-w-md p-6 rounded-2xl shadow-2xl ${darkMode ? "bg-gray-800 text-white" : "bg-gradient-to-r from-blue-50 to-indigo-100 text-black"}`}>
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {(
            <div>
              <label className="block text-sm font-medium">User Id</label>
              <input 
                type="text" 
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="User ID" 
                required 
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
              />
            </div>
          )}
            {(!isLogin &&
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name" 
                required 
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
              />
            </div>
            )}
          {(!isLogin &&
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              required 
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
            />
          </div>
          )}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password" 
              required 
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
            />
          </div>
          <button 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:underline ml-1"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="mt-4 w-full text-sm text-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
}