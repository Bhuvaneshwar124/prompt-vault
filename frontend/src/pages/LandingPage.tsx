import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, Terminal, Bot, Zap, Globe, Code2, ArrowRight, 
  Star, Sliders, ShieldCheck, Compass, CheckCircle2, Copy, 
  ExternalLink, Layers, MessageSquare, Flame, Check
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [demoRole, setDemoRole] = useState('Principal Software Architect');
  const [demoLang, setDemoLang] = useState('Java / Spring Boot');

  const demoPromptText = `Act as a ${demoRole}. Perform a comprehensive code review for this ${demoLang} snippet. Check for memory leaks, SOLID violations, and thread safety issues.`;

  const handleCopyDemo = () => {
    navigator.clipboard.writeText(demoPromptText);
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-24 relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-8 max-w-4xl mx-auto pt-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-bold tracking-wide shadow-lg shadow-indigo-500/10 animate-pulse">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>The Enterprise AI Prompt Management Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Index, Fill & Organize AI Prompts Across <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Every Model & AI Tool
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Prompt Vault is your unified prompt engine. Index chat sessions from <strong className="text-white">ChatGPT, Gemini, Groq, Claude, and DeepSeek</strong>, populate dynamic <code className="text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">{"{{variables}}"}</code> in 1-click, and discover community-rated prompts by tech stack.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <Compass className="w-5 h-5 text-purple-200" />
              <span>Explore Public Prompt Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>{isAuthenticated ? 'Go to My Indexer' : 'Get Started Free'}</span>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No AI API key required</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Free & Open Access</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct AI Chat Indexing</span>
            </span>
          </div>
        </div>

        {/* INTERACTIVE DEMO WIDGET */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl bg-slate-900/70 max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">Interactive Prompt Template Engine</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                <Bot className="w-3 h-3" />
                <span>ChatGPT (OpenAI)</span>
              </span>
              <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono px-2.5 py-1 rounded-full">
                GPT-4o
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live Controls */}
            <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
                <Sliders className="w-4 h-4" />
                <span>Live Variable Inputs</span>
              </h3>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold">{"{{role}}"}</label>
                <select
                  value={demoRole}
                  onChange={(e) => setDemoRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
                >
                  <option value="Principal Software Architect">Principal Software Architect</option>
                  <option value="Senior Security Engineer">Senior Security Engineer</option>
                  <option value="Lead Full Stack Developer">Lead Full Stack Developer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold">{"{{language}}"}</label>
                <select
                  value={demoLang}
                  onChange={(e) => setDemoLang(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
                >
                  <option value="Java / Spring Boot">Java / Spring Boot</option>
                  <option value="React / Next.js">React / Next.js</option>
                  <option value="Python / PyTorch">Python / PyTorch</option>
                  <option value="PostgreSQL SQL">PostgreSQL SQL</option>
                </select>
              </div>
            </div>

            {/* Generated Output Box */}
            <div className="space-y-3 flex flex-col justify-between bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Compiled Prompt Output</span>
                  <button
                    onClick={handleCopyDemo}
                    className="flex items-center space-x-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedDemo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDemo ? 'Copied!' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  {demoPromptText}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60">
                <span className="italic">Indexed chat link ready to open</span>
                <a
                  href="https://chatgpt.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline flex items-center space-x-1"
                >
                  <span>Open ChatGPT</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORTED AI PROVIDERS BAR */}
        <div className="space-y-4 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Indexed Across Top AI Models & Providers
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-300">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>ChatGPT (OpenAI)</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-300">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Google Gemini</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-300">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>Groq LPU</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-300">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Claude (Anthropic)</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-300">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>DeepSeek R1</span>
            </div>
          </div>
        </div>

        {/* CORE PRODUCT CAPABILITIES (4 CARDS) */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Why Engineers & Creators Use Prompt Vault
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Stop losing your best AI prompts in endless chat histories. Index, rate, and reuse them effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-4 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                External AI Chat Indexing
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Save the exact web URL of your ChatGPT or Gemini conversation along with chat summary results to return to past chat sessions instantly.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-4 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                Dynamic Variable Templating
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Turn static prompts into reusable templates using <code className="text-purple-300 font-mono">{"{{placeholders}}"}</code>. Auto-generates variable forms to copy prompts in seconds.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-pink-500/40 transition-all duration-300 space-y-4 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                Star Ratings & Discussion
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rate prompts from 1 to 5 stars, read community reviews, and discover high-performing prompts validated by other developers.
              </p>
            </div>

            {/* Card 4 */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-4 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                Tech Stack Marketplace
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter prompts by Java, React, Python, SQL, Docker, or Node.js. Instant public access with zero sign-in required to browse.
              </p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS SECTION (3 SIMPLE STEPS) */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8 bg-slate-950/60">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-400 uppercase tracking-widest">
              <span>Simple Workflow</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              How Prompt Vault Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-lg shadow-indigo-600/30">
                1
              </div>
              <h3 className="text-base font-bold text-white">Create or Save Prompt</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your prompt title, target model, system instructions, and external chat URL from ChatGPT, Gemini, or Groq.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm shadow-lg shadow-purple-600/30">
                2
              </div>
              <h3 className="text-base font-bold text-white">Populate Dynamic Variables</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fill input variables such as <code className="text-purple-300">{"{{code_snippet}}"}</code> or <code className="text-purple-300">{"{{framework}}"}</code> directly in the interactive modal.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white font-extrabold flex items-center justify-center text-sm shadow-lg shadow-pink-600/30">
                3
              </div>
              <h3 className="text-base font-bold text-white">Share & Explore Ratings</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Publish prompts to the public Tech Stack Marketplace. Check community star ratings and feedback to improve prompt engineering.
              </p>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION BANNER */}
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 text-center space-y-6 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight relative z-10">
            Ready to Build Your AI Prompt Vault?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto relative z-10 leading-relaxed">
            Join developers, AI engineers, and content creators organizing high-performance prompts in one central engine.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Public Marketplace</span>
            </Link>

            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs transition-all cursor-pointer"
            >
              <span>Create Free Account</span>
            </Link>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-300">Prompt Vault</span>
            <span>— Enterprise AI Prompt Management</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/explore" className="hover:text-indigo-400 transition-colors">Explore Hub</Link>
            <Link to="/login" className="hover:text-indigo-400 transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-indigo-400 transition-colors">Get Started</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
