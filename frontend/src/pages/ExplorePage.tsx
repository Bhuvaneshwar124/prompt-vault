import React, { useState, useEffect } from 'react';
import { Prompt } from '../types/prompt';
import { ApiResponse } from '../types/auth';
import { PromptCard } from '../components/PromptCard';
import { useAuth } from '../context/AuthContext';
import { Search, Sparkles, Code2, Bot, SlidersHorizontal, Flame, Compass } from 'lucide-react';
import api from '../api/axios';

const TECH_STACK_FILTERS = [
  { label: 'All Stack', value: '' },
  { label: 'Java / Spring', value: 'java' },
  { label: 'React / Next.js', value: 'react' },
  { label: 'Python / ML', value: 'python' },
  { label: 'SQL / Databases', value: 'sql' },
  { label: 'Docker / DevOps', value: 'docker' },
  { label: 'Node.js', value: 'node' },
  { label: 'Tailwind CSS', value: 'tailwind' },
];

const AI_TOOL_FILTERS = ['All Tools', 'ChatGPT', 'Gemini', 'Groq', 'Claude', 'DeepSeek'];

export const ExplorePage: React.FC = () => {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [selectedAiTool, setSelectedAiTool] = useState<string>('All Tools');

  const fetchPublicPrompts = async () => {
    try {
      setLoading(true);
      const querySearch = selectedTech ? `${searchTerm} ${selectedTech}`.trim() : searchTerm;
      const toolParam = selectedAiTool === 'All Tools' ? '' : selectedAiTool;

      const res = await api.get<ApiResponse<{ content: Prompt[] }>>('/prompts', {
        params: {
          search: querySearch,
          aiTool: toolParam,
          page: 0,
          size: 50,
        },
      });

      if (res.data.success && res.data.data.content) {
        setPrompts(res.data.data.content);
      }
    } catch (err) {
      console.error('Failed to fetch public prompts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPublicPrompts();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedTech, selectedAiTool]);

  return (
    <div className="min-h-screen pb-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8 pt-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/20 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Public Prompt Hub & Tech Stack Marketplace</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Discover Top-Rated <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">AI Prompts</span> by Tech Stack
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Explore curated prompts tested across ChatGPT, Gemini, Groq, Claude, and DeepSeek. Check community star ratings, read reviews, and run variable templates instantly.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by tech stack, prompt title, or keyword..."
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-indigo-500/60 rounded-2xl pl-11 pr-4 py-3 text-xs md:text-sm text-slate-100 placeholder-slate-500 outline-none shadow-inner"
            />
          </div>

          {/* AI Tool Dropdown Filter */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Bot className="w-4 h-4 text-purple-400 hidden sm:inline" />
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">AI Platform:</span>
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
              {AI_TOOL_FILTERS.map((tool) => (
                <button
                  key={tool}
                  onClick={() => setSelectedAiTool(tool)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
                    selectedAiTool === tool
                      ? 'bg-purple-600/30 text-purple-300 border-purple-500/50 shadow-md shadow-purple-500/10'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 pt-1 border-t border-slate-800/60">
          <Code2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span className="text-xs font-bold text-slate-400 flex-shrink-0 uppercase tracking-wider">Tech Stack:</span>
          <div className="flex items-center space-x-2">
            {TECH_STACK_FILTERS.map((tech) => (
              <button
                key={tech.value}
                onClick={() => setSelectedTech(tech.value)}
                className={`text-xs font-medium px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                  selectedTech === tech.value
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tech.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Public Prompts */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 rounded-3xl bg-slate-900/40 border border-slate-800 animate-pulse p-6 space-y-4">
              <div className="h-6 w-1/3 bg-slate-800 rounded-full" />
              <div className="h-4 w-3/4 bg-slate-800 rounded-lg" />
              <div className="h-20 bg-slate-950 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : prompts.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-slate-800 space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-200">No Prompts Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Try adjusting your search criteria or switching the tech stack filter to explore more prompts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              currentUsername={user?.username}
              mode="community"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
