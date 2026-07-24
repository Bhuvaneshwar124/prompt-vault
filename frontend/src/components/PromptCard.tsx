import React, { useState } from 'react';
import { Prompt } from '../types/prompt';
import { VariableFillerModal } from './VariableFillerModal';
import { PromptDetailsModal } from './PromptDetailsModal';
import { Star, Eye, Sliders, Cpu, Trash2, Heart, MessageSquare } from 'lucide-react';
import api from '../api/axios';

interface PromptCardProps {
  prompt: Prompt;
  onFavoriteToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  currentUsername?: string;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onFavoriteToggle,
  onDelete,
  currentUsername,
}) => {
  const [showFiller, setShowFiller] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorite, setIsFavorite] = useState(prompt.isFavorite);
  const [likeCount, setLikeCount] = useState(prompt.likeCount);

  const handleFavorite = async () => {
    try {
      const res = await api.patch(`/prompts/${prompt.id}/favorite`);
      if (res.data.success) {
        setIsFavorite(!isFavorite);
        if (onFavoriteToggle) onFavoriteToggle(prompt.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await api.post(`/prompts/${prompt.id}/like`);
      if (res.data.success) {
        setLikeCount(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isAuthor = currentUsername && prompt.author?.username === currentUsername;

  return (
    <>
      <div className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:shadow-xl hover:shadow-indigo-500/5">
        {/* Top Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {prompt.category && (
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm"
                  style={{ backgroundColor: prompt.category.colorCode }}
                >
                  {prompt.category.name}
                </span>
              )}
              <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                <Cpu className="w-3 h-3 text-indigo-400" />
                <span>{prompt.targetModel}</span>
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleFavorite}
                className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-amber-400'
                }`}
              >
                <Star className="w-4 h-4 fill-current" />
              </button>

              {isAuthor && onDelete && (
                <button
                  onClick={() => onDelete(prompt.id)}
                  className="p-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <h3
            onClick={() => setShowDetails(true)}
            className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 cursor-pointer"
          >
            {prompt.title}
          </h3>

          {prompt.description && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {prompt.description}
            </p>
          )}
        </div>

        {/* Code Snippet Box */}
        <div
          onClick={() => setShowDetails(true)}
          className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-900 font-mono text-[11px] text-slate-300 line-clamp-3 relative cursor-pointer hover:border-slate-800 transition-colors"
        >
          {prompt.promptText}
        </div>

        {/* Tags & Variables */}
        <div className="space-y-3 pt-1">
          {prompt.extractedVariables && prompt.extractedVariables.length > 0 && (
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">Vars:</span>
              {prompt.extractedVariables.map((v) => (
                <span key={v} className="bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-[10px] font-mono px-2 py-0.5 rounded-md">
                  {`{{${v}}}`}
                </span>
              ))}
            </div>
          )}

          {prompt.tags && prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {prompt.tags.map((t) => (
                <span key={t.id} className="text-[10px] font-medium text-slate-400 bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded-md">
                  #{t.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3 text-slate-500 text-[11px]">
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-400" />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={() => setShowDetails(true)}
              className="flex items-center space-x-1 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          </div>

          <button
            onClick={() => setShowFiller(true)}
            className="flex items-center space-x-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Use Prompt</span>
          </button>
        </div>
      </div>

      {showFiller && (
        <VariableFillerModal prompt={prompt} onClose={() => setShowFiller(false)} />
      )}

      {showDetails && (
        <PromptDetailsModal
          prompt={prompt}
          onClose={() => setShowDetails(false)}
          currentUsername={currentUsername}
        />
      )}
    </>
  );
};
