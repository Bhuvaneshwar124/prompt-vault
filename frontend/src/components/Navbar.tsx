import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Terminal, LogOut, Shield, FolderGit2, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-nav px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Prompt Vault
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-semibold text-indigo-400">
                AI Prompt Engine
              </span>
            </div>
          </Link>

          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  location.pathname === '/dashboard'
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/categories"
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  location.pathname === '/categories'
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Categories & Tags</span>
              </Link>
            </div>
          )}
        </div>

        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-slate-900/60 border border-slate-800 rounded-full px-4 py-1.5">
              <div className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-xs">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-200">{user?.username}</p>
                <div className="flex items-center space-x-1">
                  <Shield className="w-2.5 h-2.5 text-indigo-400" />
                  <p className="text-[10px] text-indigo-400 font-mono">
                    {user?.roles?.[0] || 'ROLE_USER'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-rose-400 bg-slate-900/40 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
