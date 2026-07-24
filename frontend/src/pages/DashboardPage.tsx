import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Prompt, PagedResponse } from '../types/prompt';
import { ApiResponse } from '../types/auth';
import { PromptCard } from '../components/PromptCard';
import { CreatePromptModal } from '../components/CreatePromptModal';
import { 
  Search, Plus, Sparkles, Terminal, Bot, Zap, Globe, Code2, 
  Star, LayoutGrid
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Workspace Tab State
  const [activeTab, setActiveTab] = useState<'all' | 'ai-chats' | 'favorites'>('all');

  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedAiTool, setSelectedAiTool] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const aiToolsList = [
    { id: 'ChatGPT', label: 'ChatGPT', icon: <Bot className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'Gemini', label: 'Gemini', icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'Groq', label: 'Groq', icon: <Zap className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'Claude', label: 'Claude', icon: <Code2 className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'DeepSeek', label: 'DeepSeek', icon: <Globe className="w-3.5 h-3.5 text-cyan-400" /> },
  ];

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (selectedAiTool) params.append('aiTool', selectedAiTool);

      const res = await api.get<ApiResponse<PagedResponse<Prompt>>>(`/prompts?${params.toString()}`);
      if (res.data.success) {
        setPrompts(res.data.data.content);
      }
    } catch (err) {
      console.error("Failed to load prompts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPrompts();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, selectedAiTool]);

  const handlePromptCreated = (newPrompt: Prompt) => {
    setPrompts([newPrompt, ...prompts]);
  };

  const handleDeletePrompt = async (id: number) => {
    try {
      await api.delete(`/prompts/${id}`);
      setPrompts(prompts.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered prompts based on activeTab
  const displayedPrompts = prompts.filter((p) => {
    if (activeTab === 'favorites') return p.isFavorite;
    if (activeTab === 'ai-chats') return p.externalChatUrl && p.externalChatUrl.trim() !== '';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Unified Hero Banner */}
      <div className="glass-card p-8 rounded-3xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Vault & AI Chat Indexer</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              AI Chat Indexer & Prompt Vault
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Store prompts, fill variables, star favorites, and index external AI chat locations (ChatGPT, Gemini, Groq, Claude, DeepSeek).
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs py-3 px-6 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create & Index Prompt</span>
          </button>
        </div>
      </div>

      {/* Workspace Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>All Prompts ({prompts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-chats')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'ai-chats'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Bot className="w-4 h-4 text-emerald-400" />
          <span>AI Chat Location Indexer</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'favorites'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Star className="w-4 h-4 text-amber-400 fill-current" />
          <span>Starred Favorites ({prompts.filter(p => p.isFavorite).length})</span>
        </button>
      </div>

      {/* Search & Filter Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts by title, description, chat summary, or target model..."
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-indigo-500 rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* AI Tool Provider Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-2">Filter AI Tool:</span>
          <button
            onClick={() => setSelectedAiTool('')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedAiTool === ''
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            All Tools
          </button>
          {aiToolsList.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedAiTool(selectedAiTool === tool.id ? '' : tool.id)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedAiTool === tool.id
                  ? 'bg-indigo-600 text-white border border-indigo-500'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {tool.icon}
              <span>{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-card rounded-3xl p-6 border border-slate-800 h-64 animate-pulse bg-slate-900/40" />
          ))}
        </div>
      ) : displayedPrompts.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Prompts Found in this View</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No items match your active tab or search filters.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create & Index Prompt</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPrompts.map((p) => (
            <PromptCard
              key={p.id}
              prompt={p}
              onDelete={handleDeletePrompt}
              currentUsername={user?.username}
              mode="indexer"
            />
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreatePromptModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handlePromptCreated}
        />
      )}
    </div>
  );
};

export default DashboardPage;
