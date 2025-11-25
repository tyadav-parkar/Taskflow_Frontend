import React, { useState, useContext } from "react";
import { api } from "../utils/api";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import type { AuthResponse } from "../types/auth";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post<AuthResponse>("/user/login", data);
      
      if (res.data.success && res.data.token && res.data.user) {
        login(res.data.token, res.data.user);
        navigate("/");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Failed to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Welcome Back
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <Mail size={20} className="text-gray-500" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full ml-3 bg-transparent outline-none"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <Lock size={20} className="text-gray-500" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full ml-3 bg-transparent outline-none"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Logging in...</span>
            ) : (
              <>
                <LogIn size={20} /> Login
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;