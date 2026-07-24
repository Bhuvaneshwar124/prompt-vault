import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Key, User, Clock, CheckCircle2, Layers } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, token } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>JWT Authentication Active</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.firstName ? user.firstName : user?.username}!
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Module 1 Authentication Core initialized successfully. You are now securely authenticated.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 px-5 py-3 rounded-2xl flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Role Authority</p>
              <p className="text-sm font-bold text-indigo-300 font-mono">
                {user?.roles?.[0] || 'ROLE_USER'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-2">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-300">User Identity</h3>
          <div className="space-y-1 text-xs">
            <p className="text-slate-400">Username: <span className="text-slate-100 font-medium">{user?.username}</span></p>
            <p className="text-slate-400">Email: <span className="text-slate-100 font-medium">{user?.email}</span></p>
            <p className="text-slate-400">User ID: <span className="text-indigo-400 font-mono">#{user?.id}</span></p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-300">Stateless JWT Token</h3>
          <p className="text-xs text-slate-400">
            HMAC-SHA256 Signed Bearer Token stored securely in state and localStorage.
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[10px] text-indigo-300 font-mono truncate">
            {token ? `Bearer ${token}` : 'No token'}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-300">Module Status</h3>
          <p className="text-xs text-slate-400">
            Module 1 completed. Ready for Module 2: Category & Tag Management Engine.
          </p>
          <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5" />
            <span>Ready for Next Phase</span>
          </div>
        </div>
      </div>
    </div>
  );
};
