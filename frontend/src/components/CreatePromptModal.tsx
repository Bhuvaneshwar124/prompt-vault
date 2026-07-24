import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Category, Tag } from '../types/categoryTag';
import { PromptRequest, Prompt } from '../types/prompt';
import { ApiResponse } from '../types/auth';
import { X, Plus, Sparkles, AlertCircle, FileText, Cpu, Folder } from 'lucide-react';

interface CreatePromptModalProps {
  onClose: () => void;
  onSuccess: (prompt: Prompt) => void;
}

export const CreatePromptModal: React.FC<CreatePromptModalProps> = ({ onClose, onSuccess }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<PromptRequest>({
    title: '',
    description: '',
    promptText: '',
    systemInstruction: '',
    targetModel: 'GPT-4',
    categoryId: 0,
    tagIds: [],
    isPublic: true,
  });

  useEffect(() => {
    const fetchTaxonomy = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          api.get<ApiResponse<Category[]>>('/categories'),
          api.get<ApiResponse<Tag[]>>('/tags'),
        ]);
        if (catRes.data.success && catRes.data.data.length > 0) {
          setCategories(catRes.data.data);
          setFormData((prev) => ({ ...prev, categoryId: catRes.data.data[0].id }));
        }
        if (tagRes.data.success) setTags(tagRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTaxonomy();
  }, []);

  const handleTagToggle = (tagId: number) => {
    const currentTags = formData.tagIds || [];
    if (currentTags.includes(tagId)) {
      setFormData({ ...formData, tagIds: currentTags.filter((id) => id !== tagId) });
    } else {
      setFormData({ ...formData, tagIds: [...currentTags, tagId] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.promptText.trim() || !formData.categoryId) {
      setError('Please fill in all required fields (Title, Prompt Text, Category)');
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
              <h2 className="text-xl font-bold text-white">Create New AI Prompt</h2>
              <p className="text-xs text-slate-400">Save, tag, and organize prompts with dynamic variable support</p>
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
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Prompt Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Java Code Reviewer"
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 placeholder-slate-600 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
                <Folder className="w-3.5 h-3.5 text-indigo-400" />
                <span>Category *</span>
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 outline-none"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Model Target & Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Target Model</span>
              </label>
              <select
                value={formData.targetModel}
                onChange={(e) => setFormData({ ...formData, targetModel: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 outline-none"
              >
                <option value="GPT-4">GPT-4 / GPT-4o</option>
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="Midjourney v6">Midjourney v6</option>
                <option value="Llama 3">Llama 3</option>
                <option value="DALL-E 3">DALL-E 3</option>
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
              rows={5}
              value={formData.promptText}
              onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
              placeholder="Act as a {{role}}. Review the following {{language}} snippet..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3.5 text-xs font-mono text-slate-100 placeholder-slate-600 outline-none leading-relaxed"
              required
            />
          </div>

          {/* Tags Selection */}
          {tags.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Select Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const selected = formData.tagIds?.includes(tag.id);
                  return (
                    <button
                      type="button"
                      key={tag.id}
                      onClick={() => handleTagToggle(tag.id)}
                      className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                        selected
                          ? 'bg-purple-600 text-white border-purple-500'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      #{tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
              <span>{loading ? 'Creating...' : 'Create Prompt'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
