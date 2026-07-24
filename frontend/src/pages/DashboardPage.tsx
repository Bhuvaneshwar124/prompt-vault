import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Prompt, PagedResponse } from '../types/prompt';
import { Category } from '../types/categoryTag';
import { ApiResponse } from '../types/auth';
import { PromptCard } from '../components/PromptCard';
import { CreatePromptModal } from '../components/CreatePromptModal';
import { Search, Plus, Sparkles, SlidersHorizontal, Terminal, ArrowRight } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await api.get<ApiResponse<Category[]>>('/categories');
      if (res.data.success) setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (selectedCategory) params.append('category', selectedCategory);

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
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPrompts();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

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

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Module 3: Core Prompt Engine</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              AI Prompt Vault & Search Hub
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Store, filter, and compile AI prompts with dynamic variables.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs py-3 px-6 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Prompt</span>
          </button>
        </div>
      </div>

      {/* Search & Filtering Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts by title, description, or keyword..."
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-indigo-500 rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        {categories.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === ''
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Prompt Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-card rounded-3xl p-6 border border-slate-800 h-64 animate-pulse bg-slate-900/40" />
          ))}
        </div>
      ) : prompts.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Prompts Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No AI prompts match your current search criteria. Try clearing search filters or create a new prompt.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Prompt</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((p) => (
            <PromptCard
              key={p.id}
              prompt={p}
              onDelete={handleDeletePrompt}
              currentUsername={user?.username}
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
