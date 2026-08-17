// src/pages/Login.tsx
import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

import heroImage from "../assets/hero.png"; 

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password });
      login(response.data.token, response.data.user);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden w-full bg-[#13151A] font-sans text-white selection:bg-[#97ce4c] selection:text-black">
      
      {/* Left Side - Form Section */}
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-20 xl:px-32 relative">
        <div className="w-full max-w-md mx-auto space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
              Dimension <span className="text-[#97ce4c]">C-137</span>
            </h1>
            <p className="mt-3 text-[15px] text-gray-400 leading-relaxed">
              A brand new day in the multiverse. <br className="hidden sm:block" />
              Sign in and get back to your adventures.
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm font-medium text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#2D323E] bg-[#1C1F26] px-4 py-3.5 text-white outline-none transition-all duration-300 focus:ring-1 focus:ring-[#97ce4c]"
                placeholder="morty@citadel.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#2D323E] bg-[#1C1F26] px-4 py-3.5 text-white outline-none transition-all duration-300 focus:ring-1 focus:ring-[#97ce4c]"
                placeholder="At least 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-[#97ce4c] py-4 text-base font-bold text-[#13151A] transition-all duration-300 hover:bg-[#86b843] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Opening Portal..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="grow border-t border-[#2D323E]"></div>
            <span className="mx-4 shrink-0 text-sm text-gray-500">Or</span>
            <div className="grow border-t border-[#2D323E]"></div>
          </div>

          <p className="text-center text-sm text-gray-400">
            Don't you have an account?{" "}
            <Link to="/register" className="font-semibold text-white hover:text-[#97ce4c] transition-colors">
              Sign up
            </Link>
          </p>
        </div>

      </div>

      <div className="hidden lg:block lg:w-1/2 p-6">
        <div className="relative h-full w-full overflow-hidden rounded-4xl bg-[#1C1F26]">
          <img 
            src={heroImage} 
            alt="Rick and Morty Dimension" 
            className="h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-[#13151A]/80 via-transparent to-transparent"></div>
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-4xl"></div>
        </div>
      </div>

    </div>
  );
};