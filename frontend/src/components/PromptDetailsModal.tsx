import React, { useState, useEffect } from 'react';
import { Prompt } from '../types/prompt';
import { Comment, RatingSummary } from '../types/community';
import { ApiResponse } from '../types/auth';
import { RatingStars } from './RatingStars';
import api from '../api/axios';
import { X, MessageSquare, Send, Trash2, Cpu, FileText, User as UserIcon, Heart, Sparkles } from 'lucide-react';

interface PromptDetailsModalProps {
  prompt: Prompt;
  onClose: () => void;
  currentUsername?: string;
}

export const PromptDetailsModal: React.FC<PromptDetailsModalProps> = ({
  prompt,
  onClose,
  currentUsername,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [ratingSummary, setRatingSummary] = useState<RatingSummary>({
    averageRating: 0,
    totalRatings: 0,
  });
  const [likeCount, setLikeCount] = useState(prompt.likeCount);

  const fetchCommunityData = async () => {
    try {
      const [ratingsRes, commentsRes] = await Promise.all([
        api.get<ApiResponse<RatingSummary>>(`/prompts/${prompt.id}/ratings`),
        api.get<ApiResponse<Comment[]>>(`/prompts/${prompt.id}/comments`),
      ]);

      if (ratingsRes.data.success) setRatingSummary(ratingsRes.data.data);
      if (commentsRes.data.success) setComments(commentsRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCommunityData();
  }, [prompt.id]);

  const handleRate = async (stars: number) => {
    try {
      const res = await api.post<ApiResponse<RatingSummary>>(
        `/prompts/${prompt.id}/ratings`,
        { stars }
      );
      if (res.data.success) {
        setRatingSummary(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await api.post<ApiResponse<number>>(`/prompts/${prompt.id}/like`);
      if (res.data.success) {
        setLikeCount(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await api.post<ApiResponse<Comment>>(
        `/prompts/${prompt.id}/comments`,
        { content: newComment }
      );
      if (res.data.success) {
        setComments([res.data.data, ...comments]);
        setNewComment('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-card w-full max-w-4xl rounded-3xl p-8 border border-slate-800 space-y-8 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: prompt.category?.colorCode }}
              >
                {prompt.category?.name}
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>{prompt.targetModel}</span>
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{prompt.title}</h2>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rating & Likes Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RatingStars
                currentRating={ratingSummary.userRating || Math.round(ratingSummary.averageRating)}
                onRate={handleRate}
              />
              <span className="text-xs font-bold text-amber-400">
                {ratingSummary.averageRating} / 5.0
              </span>
              <span className="text-[11px] text-slate-500">
                ({ratingSummary.totalRatings} ratings)
              </span>
            </div>
          </div>

          <button
            onClick={handleLike}
            className="flex items-center space-x-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer text-xs"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>{likeCount} Likes</span>
          </button>
        </div>

        {/* System Instructions & Prompt Text */}
        <div className="space-y-4">
          {prompt.systemInstruction && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                System Instructions
              </h4>
              <div className="bg-purple-950/30 border border-purple-900/40 p-4 rounded-2xl text-xs font-mono text-purple-200">
                {prompt.systemInstruction}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Prompt Template</span>
            </h4>
            <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs font-mono text-indigo-200 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
              {prompt.promptText}
            </pre>
          </div>
        </div>

        {/* Community Comments Section */}
        <div className="space-y-6 pt-4 border-t border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            <span>Community Discussion ({comments.length})</span>
          </h3>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="flex items-center space-x-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment or improvement feedback..."
              className="flex-grow bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs text-slate-100 placeholder-slate-600 outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-2.5 px-5 rounded-xl shadow-lg shadow-indigo-600/25 flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post</span>
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {comments.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No comments yet. Be the first to start the discussion!</p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px] flex items-center justify-center">
                        {comment.author?.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-semibold text-slate-200">
                        {comment.author?.username}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 pl-7">{comment.content}</p>
                  </div>

                  {currentUsername && comment.author?.username === currentUsername && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
