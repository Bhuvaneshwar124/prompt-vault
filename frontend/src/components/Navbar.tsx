import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Terminal, LogOut, Shield, LayoutDashboard, Compass, Home, Sparkles, User as UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand & Main Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tight">
                Prompt Vault
              </span>
              <span className="block text-[9px] uppercase tracking-widest font-extrabold text-indigo-400">
                Enterprise AI Engine
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1.5 bg-slate-900/60 p-1 rounded-2xl border border-slate-800/80">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>

            <Link
              to="/explore"
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/explore'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>Explore Hub</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  location.pathname === '/dashboard'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                <span>My Indexer</span>
              </Link>
            )}
          </div>
        </div>

        {/* Right User & Auth Controls */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-800 rounded-2xl px-3.5 py-1.5 shadow-inner">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-100">{user?.username}</p>
                <div className="flex items-center space-x-1">
                  <Shield className="w-2.5 h-2.5 text-indigo-400" />
                  <p className="text-[9px] text-indigo-400 font-mono">
                    {user?.roles?.[0] || 'ROLE_USER'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              title="Logout"
              className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400 bg-slate-900/60 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2.5">
            <Link
              to="/login"
              className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-slate-800/60 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
