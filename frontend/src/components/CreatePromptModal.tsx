import React, { useState } from 'react';
import api from '../api/axios';
import { PromptRequest, Prompt } from '../types/prompt';
import { ApiResponse } from '../types/auth';
import { X, Plus, Sparkles, AlertCircle, FileText, Cpu, Bot, Link2 } from 'lucide-react';

interface CreatePromptModalProps {
  onClose: () => void;
  onSuccess: (prompt: Prompt) => void;
}

export const CreatePromptModal: React.FC<CreatePromptModalProps> = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<PromptRequest>({
    title: '',
    description: '',
    promptText: '',
    systemInstruction: '',
    targetModel: 'GPT-4o',
    aiTool: 'ChatGPT',
    externalChatUrl: '',
    chatSummary: '',
    categoryId: 1,
    tagIds: [],
    isPublic: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.promptText.trim()) {
      setError('Please fill in all required fields (Prompt Title and Prompt Text)');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post<ApiResponse<Prompt>>('/prompts', formData);
      if (res.data.success) {
        onSuccess(res.data.data);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-card w-full max-w-3xl rounded-3xl p-8 border border-slate-800 space-y-6 shadow-2xl relative my-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Index AI Prompt & Chat Location</h2>
              <p className="text-xs text-slate-400">Track chats across ChatGPT, Gemini, Groq, Claude, and DeepSeek</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center space-x-3 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Prompt Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Senior Java Spring Boot Code Reviewer"
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 placeholder-slate-600 outline-none"
              required
            />
          </div>

          {/* AI Tool Integration Fields */}
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-800/40 space-y-4">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>AI Provider & Chat Location Indexing</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">AI Provider / Platform</label>
                <select
                  value={formData.aiTool}
                  onChange={(e) => setFormData({ ...formData, aiTool: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 outline-none"
                >
                  <option value="ChatGPT">ChatGPT (OpenAI)</option>
                  <option value="Gemini">Google Gemini</option>
                  <option value="Groq">Groq LPU</option>
                  <option value="Claude">Claude (Anthropic)</option>
                  <option value="DeepSeek">DeepSeek R1</option>
                  <option value="Midjourney">Midjourney</option>
                  <option value="Other">Other AI Tool</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
                  <Link2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>External Chat Session URL</span>
                </label>
                <input
                  type="url"
                  value={formData.externalChatUrl}
                  onChange={(e) => setFormData({ ...formData, externalChatUrl: e.target.value })}
                  placeholder="https://chatgpt.com/c/67890..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 placeholder-slate-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Conversation Summary / Result</label>
              <input
                type="text"
                value={formData.chatSummary}
                onChange={(e) => setFormData({ ...formData, chatSummary: e.target.value })}
                placeholder="e.g. Refactored security filter chain code in ChatGPT"
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 placeholder-slate-600 outline-none"
              />
            </div>
          </div>

          {/* Model Target & Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Target Model / Stack</span>
              </label>
              <select
                value={formData.targetModel}
                onChange={(e) => setFormData({ ...formData, targetModel: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 outline-none"
              >
                <option value="GPT-4o">GPT-4o</option>
                <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                <option value="LLaMA 3 70B (Groq)">LLaMA 3 70B (Groq)</option>
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="DeepSeek R1">DeepSeek R1</option>
                <option value="Java / Spring Boot">Java / Spring Boot</option>
                <option value="React / Next.js">React / Next.js</option>
                <option value="Python / Machine Learning">Python / Machine Learning</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Short summary of what this prompt achieves..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 placeholder-slate-600 outline-none"
              />
            </div>
          </div>

          {/* Prompt Template Text */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Prompt Template Text *</span>
              </label>
              <span className="text-[10px] text-indigo-400 font-mono">
                Tip: Use {"{{variable_name}}"} for dynamic inputs
              </span>
            </div>
            <textarea
              rows={4}
              value={formData.promptText}
              onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
              placeholder="Act as a {{role}}. Review the following {{language}} snippet..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3.5 text-xs font-mono text-slate-100 placeholder-slate-600 outline-none leading-relaxed"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-600/25 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{loading ? 'Indexing Prompt...' : 'Save & Index Prompt'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePromptModal;
