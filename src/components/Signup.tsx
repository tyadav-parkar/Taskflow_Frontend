import React, { useState, useContext } from "react";
import { api } from "../utils/api";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { UserRound, Mail, Lock, UserPlus, AlertCircle } from "lucide-react";
import type { AuthResponse } from "../types/auth";

const Signup = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const errors = { name: "", email: "", password: "" };
    let isValid = true;

    if (!data.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!data.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await api.post<AuthResponse>("/user/register", data);
      
      if (res.data.success && res.data.token && res.data.user) {
        login(res.data.token, res.data.user);
        navigate("/");
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Create Account
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
              Full Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <UserRound size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full ml-3 bg-transparent outline-none"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                  setValidationErrors({ ...validationErrors, name: "" });
                }}
                required
              />
            </div>
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
            )}
          </div>

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
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                  setValidationErrors({ ...validationErrors, email: "" });
                }}
                required
              />
            </div>
            {validationErrors.email && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <Lock size={20} className="text-gray-500" />
              <input
                type="password"
                placeholder="Create a password (min. 8 characters)"
                className="w-full ml-3 bg-transparent outline-none"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                  setValidationErrors({ ...validationErrors, password: "" });
                }}
                required
              />
            </div>
            {validationErrors.password && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <UserPlus size={20} /> Create Account
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;