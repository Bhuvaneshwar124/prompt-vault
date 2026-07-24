import React, { useState } from 'react';
import { Prompt } from '../types/prompt';
import { VariableFillerModal } from './VariableFillerModal';
import { PromptDetailsModal } from './PromptDetailsModal';
import { AiToolBadge } from './AiToolBadge';
import { Star, Sliders, Cpu, Trash2, Heart, MessageSquare } from 'lucide-react';
import api from '../api/axios';

interface PromptCardProps {
  prompt: Prompt;
  onFavoriteToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  currentUsername?: string;
  mode?: 'indexer' | 'community';
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onFavoriteToggle,
  onDelete,
  currentUsername,
  mode = 'indexer',
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
              <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                <Cpu className="w-3 h-3 text-indigo-400" />
                <span>{prompt.targetModel}</span>
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleFavorite}
                title="Star Prompt"
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
                  title="Delete Prompt"
                  className="p-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* AI Tool Badge & External Link */}
          <div className="pt-1">
            <AiToolBadge tool={prompt.aiTool} externalUrl={prompt.externalChatUrl} />
          </div>

          <h3
            onClick={() => mode === 'community' && setShowDetails(true)}
            className={`text-base font-bold text-white transition-colors line-clamp-1 ${
              mode === 'community' ? 'group-hover:text-indigo-300 cursor-pointer' : ''
            }`}
          >
            {prompt.title}
          </h3>

          {prompt.description && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {prompt.description}
            </p>
          )}

          {prompt.chatSummary && (
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-900 text-[11px] text-slate-400 italic">
              <span className="font-semibold text-slate-300 not-italic">Chat Summary: </span>
              {prompt.chatSummary}
            </div>
          )}
        </div>

        {/* Code Snippet Box */}
        <div
          onClick={() => mode === 'community' && setShowDetails(true)}
          className={`bg-slate-950/80 p-3.5 rounded-2xl border border-slate-900 font-mono text-[11px] text-slate-300 line-clamp-3 relative transition-colors ${
            mode === 'community' ? 'cursor-pointer hover:border-slate-800' : ''
          }`}
        >
          {prompt.promptText}
        </div>

        {/* Extracted Variables */}
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

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          {mode === 'community' ? (
            <>
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
                  <span>Reviews & Ratings</span>
                </button>
              </div>

              <button
                onClick={() => setShowFiller(true)}
                className="flex items-center space-x-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Use Prompt</span>
              </button>
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] text-slate-500 italic">Indexed Prompt</span>
              <button
                onClick={() => setShowFiller(true)}
                className="flex items-center space-x-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Use Prompt</span>
              </button>
            </div>
          )}
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

export default PromptCard;
