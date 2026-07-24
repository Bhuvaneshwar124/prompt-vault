import React, { useState } from 'react';
import { Prompt } from '../types/prompt';
import { X, Copy, Check, Sparkles, Sliders } from 'lucide-react';

interface VariableFillerModalProps {
  prompt: Prompt;
  onClose: () => void;
}

export const VariableFillerModal: React.FC<VariableFillerModalProps> = ({ prompt, onClose }) => {
  const [varValues, setVarValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const handleVarChange = (name: string, val: string) => {
    setVarValues((prev) => ({ ...prev, [name]: val }));
  };

  const getCompiledPrompt = () => {
    let result = prompt.promptText;
    prompt.extractedVariables.forEach((v) => {
      const val = varValues[v] || `{{${v}}}`;
      result = result.replaceAll(`{{${v}}}`, val);
    });
    return result;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCompiledPrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card w-full max-w-2xl rounded-3xl p-6 border border-slate-800 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{prompt.title}</h3>
              <p className="text-xs text-slate-400">Fill in dynamic variables to generate final prompt string</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Input Fields */}
        {prompt.extractedVariables.length > 0 && (
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Template Variables ({prompt.extractedVariables.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prompt.extractedVariables.map((variable) => (
                <div key={variable} className="space-y-1">
                  <label className="block text-xs font-mono text-slate-300">
                    {`{{${variable}}}`}
                  </label>
                  <input
                    type="text"
                    value={varValues[variable] || ''}
                    onChange={(e) => handleVarChange(variable, e.target.value)}
                    placeholder={`Enter value for ${variable}...`}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compiled Output Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Compiled Output</span>
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-1.5 px-3 rounded-lg shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Compiled Prompt'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-indigo-200 whitespace-pre-wrap max-h-48 overflow-y-auto">
            {getCompiledPrompt()}
          </pre>
        </div>
      </div>
    </div>
  );
};
