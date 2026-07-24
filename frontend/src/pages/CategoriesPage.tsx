import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Category, Tag, CategoryRequest, TagRequest } from '../types/categoryTag';
import { ApiResponse } from '../types/auth';
import { FolderPlus, Tag as TagIcon, Plus, Trash2, Edit3, Sparkles, Hash } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Category Form State
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catColor, setCatColor] = useState('#6366f1');
  const [catError, setCatError] = useState('');
  const [catSubmitting, setCatSubmitting] = useState(false);

  // Tag Form State
  const [tagName, setTagName] = useState('');
  const [tagError, setTagError] = useState('');
  const [tagSubmitting, setTagSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, tagRes] = await Promise.all([
        api.get<ApiResponse<Category[]>>('/categories'),
        api.get<ApiResponse<Tag[]>>('/tags'),
      ]);

      if (catRes.data.success) setCategories(catRes.data.data);
      if (tagRes.data.success) setTags(tagRes.data.data);
    } catch (err) {
      console.error("Failed to load taxonomy data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCatError('');
    if (!catName.trim()) return;

    try {
      setCatSubmitting(true);
      const payload: CategoryRequest = {
        name: catName,
        description: catDesc,
        colorCode: catColor,
      };
      const res = await api.post<ApiResponse<Category>>('/categories', payload);
      if (res.data.success) {
        setCategories([...categories, res.data.data]);
        setCatName('');
        setCatDesc('');
      }
    } catch (err: any) {
      setCatError(err.response?.data?.message || 'Failed to create category');
    } finally {
      setCatSubmitting(false);
    }
  };

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    setTagError('');
    if (!tagName.trim()) return;

    try {
      setTagSubmitting(true);
      const payload: TagRequest = { name: tagName };
      const res = await api.post<ApiResponse<Tag>>('/tags', payload);
      if (res.data.success) {
        setTags([...tags, res.data.data]);
        setTagName('');
      }
    } catch (err: any) {
      setTagError(err.response?.data?.message || 'Failed to create tag');
    } finally {
      setTagSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTag = async (id: number) => {
    try {
      await api.delete(`/tags/${id}`);
      setTags(tags.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Module 2: Taxonomy Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Category & Tag Management</h1>
        <p className="text-slate-400 text-sm mt-1">
          Organize your prompts with hierarchical categories and multi-dimensional tags.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories Panel */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <FolderPlus className="w-5 h-5 text-indigo-400" />
              <span>Create New Category</span>
            </h2>

            {catError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs">
                {catError}
              </div>
            )}

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category Name *</label>
                <input
                  type="text"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Software Engineering"
                  className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3 text-sm text-slate-100 placeholder-slate-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <input
                  type="text"
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Short summary of prompts in this category"
                  className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3 text-sm text-slate-100 placeholder-slate-600 outline-none"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Badge Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={catColor}
                      onChange={(e) => setCatColor(e.target.value)}
                      className="w-9 h-9 rounded-lg bg-transparent border border-slate-800 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-400">{catColor}</span>
                  </div>
                </div>

                <div className="flex-grow pt-4">
                  <button
                    type="submit"
                    disabled={catSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{catSubmitting ? 'Creating...' : 'Add Category'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Categories List */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-300">Active Categories ({categories.length})</h3>
            {categories.length === 0 ? (
              <p className="text-xs text-slate-500">No categories created yet.</p>
            ) : (
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: cat.colorCode }}
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-white">{cat.name}</h4>
                        <span className="text-[10px] text-indigo-400 font-mono">/slug/{cat.slug}</span>
                        {cat.description && (
                          <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-slate-500 hover:text-rose-400 p-2 rounded-lg hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tags Panel */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <TagIcon className="w-5 h-5 text-purple-400" />
              <span>Create New Tag</span>
            </h2>

            {tagError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs">
                {tagError}
              </div>
            )}

            <form onSubmit={handleCreateTag} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tag Name *</label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="e.g. spring-boot, react, chatgpt"
                    className="w-full bg-slate-900/80 border border-slate-800 focus:border-purple-500 rounded-xl py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-600 outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={tagSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{tagSubmitting ? 'Creating...' : 'Add Tag'}</span>
              </button>
            </form>
          </div>

          {/* Tags Cloud List */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-300">Active Tags ({tags.length})</h3>
            {tags.length === 0 ? (
              <p className="text-xs text-slate-500">No tags created yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full text-xs font-medium group"
                  >
                    <span>#{tag.name}</span>
                    <button
                      onClick={() => handleDeleteTag(tag.id)}
                      className="text-purple-400/60 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
