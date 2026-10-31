import React, { useState } from 'react';
import { Key, X, Check, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../services/gemmaService';

export default function ApiKeyModal({ isOpen, onClose, onKeySaved }) {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setStoredApiKey(apiKey.trim());
    setIsSaved(true);
    onKeySaved(Boolean(apiKey.trim()));
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setApiKey('');
    setStoredApiKey('');
    onKeySaved(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white border border-slate-300 rounded-2xl p-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-teal-700/10 border border-teal-200/30 flex items-center justify-center text-teal-700">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Google AI Studio API Key</h3>
            <p className="text-xs text-slate-500">Model: <code className="text-teal-700">gemma-4-26b-a4b-it</code> (@google/genai)</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 my-3 leading-relaxed">
          Paste your Google AI Studio <code className="text-teal-700">GEMINI_API_KEY</code> to activate live <strong className="text-slate-900">Gemma 4 (26B-A4B-IT)</strong> multimodal certificate vision, <code className="text-teal-700">ThinkingLevel.HIGH</code> reasoning, and Google Search grounding.
        </p>

        <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-[11px] text-teal-700 mb-4 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <span>
            <strong>Demo Ready:</strong> If left empty, the application uses high-fidelity Gemma neural reasoning emulation with pre-loaded certificates!
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              API Key (starts with AIza...)
            </label>
            <input
              type="password"
              placeholder="Enter AI Studio API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-teal-200"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 hover:underline flex items-center gap-1"
            >
              <span>Get Free Key on AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-red-400 hover:text-red-300 cursor-pointer"
              >
                Clear Key
              </button>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-teal-700 hover:hover:text-slate-900 text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Key</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
