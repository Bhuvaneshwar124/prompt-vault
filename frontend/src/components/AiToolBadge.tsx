import React from 'react';
import { Bot, ExternalLink, Zap, Sparkles, Code2, Globe } from 'lucide-react';

interface AiToolBadgeProps {
  tool: string;
  externalUrl?: string;
}

export const AiToolBadge: React.FC<AiToolBadgeProps> = ({ tool, externalUrl }) => {
  const getToolConfig = (t: string) => {
    switch (t?.toLowerCase()) {
      case 'chatgpt':
        return {
          name: 'ChatGPT',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/30',
          textColor: 'text-emerald-400',
          icon: <Bot className="w-3.5 h-3.5 text-emerald-400" />,
        };
      case 'gemini':
        return {
          name: 'Google Gemini',
          bgColor: 'bg-sky-500/10',
          borderColor: 'border-sky-500/30',
          textColor: 'text-sky-400',
          icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" />,
        };
      case 'groq':
        return {
          name: 'Groq LPU',
          bgColor: 'bg-orange-500/10',
          borderColor: 'border-orange-500/30',
          textColor: 'text-orange-400',
          icon: <Zap className="w-3.5 h-3.5 text-orange-400" />,
        };
      case 'claude':
        return {
          name: 'Claude 3.5',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/30',
          textColor: 'text-amber-400',
          icon: <Code2 className="w-3.5 h-3.5 text-amber-400" />,
        };
      case 'deepseek':
        return {
          name: 'DeepSeek R1',
          bgColor: 'bg-cyan-500/10',
          borderColor: 'border-cyan-500/30',
          textColor: 'text-cyan-400',
          icon: <Globe className="w-3.5 h-3.5 text-cyan-400" />,
        };
      default:
        return {
          name: tool || 'AI Tool',
          bgColor: 'bg-indigo-500/10',
          borderColor: 'border-indigo-500/30',
          textColor: 'text-indigo-400',
          icon: <Bot className="w-3.5 h-3.5 text-indigo-400" />,
        };
    }
  };

  const config = getToolConfig(tool);

  return (
    <div className="flex items-center space-x-2">
      <span
        className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.bgColor} ${config.borderColor} ${config.textColor}`}
      >
        {config.icon}
        <span>{config.name}</span>
      </span>

      {externalUrl && (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center space-x-1 text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2 py-0.5 rounded-lg transition-colors group"
          title={`Open chat session in ${config.name}`}
        >
          <span>Open Chat</span>
          <ExternalLink className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      )}
    </div>
  );
};
