// src/components/Layout.tsx
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import { RefreshCw, LogOut, Menu, X, User } from "lucide-react";

export const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [syncing, setSyncing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    setMobileMenuOpen(false);
    try {
      const response = await api.post("/sync");
      
      alert(
        `Sync completed successfully!\n` +
        `- Characters synced: ${response.data.synced}\n` +
        `- Episodes synced: ${response.data.episodes}\n` +
        `- Relationships mapped: ${response.data.relationships}`
      );
      
      window.location.reload();
    } catch (err: any) {
      alert(err.response?.data?.error || "Synchronization failed. Try again.");
    } finally {
      setSyncing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#13151A] font-sans text-white selection:bg-[#97ce4c] selection:text-black">
      
      <header className="sticky top-0 z-40 border-b border-[#2D323E] bg-[#1C1F26]/80 px-4 py-3 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          <Link to="/" className="flex text-[#97ce4c] items-center gap-2 text-xl font-bold tracking-tight transition-opacity hover:opacity-80">
            Rick And Morty 
          </Link>

          <div className="hidden items-center space-x-4 md:flex">
            <div className="flex items-center rounded-lg bg-[#13151A] px-3 py-1.5 border border-[#2D323E]">
              <User size={14} className="mr-2 text-[#97ce4c]" /> 
              <span className="text-sm font-medium text-gray-300">{user?.email}</span>
            </div>
            
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center rounded-xl bg-[#97ce4c] px-4 py-2 text-sm font-bold text-[#13151A] transition-all hover:bg-[#86b843] hover:shadow-[0_0_15px_rgba(151,206,76,0.2)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw size={16} className={`mr-2 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing..." : "Sync Data"}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={16} className="mr-2" /> Logout
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-[#2D323E] hover:text-white md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-[#13151A]/80 backdrop-blur-sm md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute left-4 right-4 top-18 flex flex-col gap-4 rounded-2xl border border-[#2D323E] bg-[#1C1F26] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-[#2D323E] pb-4 text-sm font-medium text-gray-300">
              <User size={16} className="mr-2 text-[#97ce4c]" /> 
              <span className="truncate">{user?.email}</span>
            </div>
            
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex w-full items-center justify-center rounded-xl bg-[#97ce4c] py-3 font-bold text-[#13151A] transition-all hover:bg-[#86b843] active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={18} className={`mr-2 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing Data..." : "Sync Remote API Data"}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center rounded-xl bg-red-500/10 py-3 font-medium text-red-400 transition-colors hover:bg-red-500/20"
            >
              <LogOut size={18} className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}

      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-8 md:px-8">
        <Outlet />
      </main>
    </div>
  );
};