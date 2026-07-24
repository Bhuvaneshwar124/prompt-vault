import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Bot, Sparkles, Zap, Code2, Globe, Heart, Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12 px-6 md:px-12 mt-auto relative z-20">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Prompt Vault
                </span>
                <span className="block text-[9px] uppercase tracking-widest font-semibold text-indigo-400">
                  AI Prompt Engine
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Index chat locations across ChatGPT, Gemini, Groq, Claude, and DeepSeek. Fill dynamic template variables and share rated prompts.
            </p>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Backend Status: Connected (v1.0)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Product Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">Home & Product Overview</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-indigo-400 transition-colors">Public Explore Hub</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">My Prompt Indexer</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition-colors">Sign In / Account</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: AI Platforms */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">AI Tool Indexing</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>ChatGPT (OpenAI)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Google Gemini Pro</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-orange-400" />
                <span>Groq LPU Hardware</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Claude (Anthropic)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>DeepSeek R1</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Tech Stack Filters */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Tech Stacks Covered</h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md">Java / Spring</span>
              <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md">React / Next.js</span>
              <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md">Python / ML</span>
              <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md">PostgreSQL / SQL</span>
              <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md">Docker / DevOps</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Prompt Vault. All rights reserved.</p>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Built for developers & AI creators</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
