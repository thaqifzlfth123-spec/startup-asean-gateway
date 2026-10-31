import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, X, Bot, User, Loader2, ChevronDown, Minimize2 } from 'lucide-react';
import { askAseanNavigator } from '../services/gemmaService';

export default function AseanChatbot({ verifiedStartup }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 **Hello! I am Aura**, your Gemma 4 AI Navigator for Startup ASEAN.\n\nAsk me anything about cross-border expansion, government grants (Cradle, Startup SG, NIA), tax treaties, or hiring talent across Southeast Asia!`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);

    try {
      const reply = await askAseanNavigator(text, verifiedStartup || {}, (streamedText) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: streamedText };
          return updated;
        });
      });
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: reply };
        return updated;
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, I encountered a temporary network delay. Please try asking again!'
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'How do I apply for Cradle CIP Spark in Malaysia?',
    'What are the incentives for expanding to Singapore?',
    'How do I hire remote software engineers in Vietnam?',
    'Explain the Malaysia-Singapore Tax Avoidance Treaty'
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-teal-700 text-slate-900 shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all cursor-pointer flex items-center gap-2 group"
      >
        <Sparkles className="w-5 h-5 text-teal-700 animate-spin-slow" />
        <span className="text-xs font-bold pr-1 hidden sm:inline">Ask Gemma Navigator</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] bg-white border border-slate-300/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
          
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-700/20 border border-teal-200/40 flex items-center justify-center text-teal-700">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900">Aura • ASEAN AI Navigator</h4>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-700/10 text-teal-700 font-semibold border border-teal-200/30">
                    Gemma 4
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">
                  {verifiedStartup ? `Context: ${verifiedStartup.name} (${verifiedStartup.country})` : 'Cross-Border Knowledge Engine'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((m, idx) => {
              if (m.role === 'assistant' && !m.content) return null;
              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-md bg-teal-700/30 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-teal-700 text-slate-900 rounded-br-none shadow-sm'
                        : 'bg-slate-50/80 text-slate-700 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    {m.content}
                  </div>

                  {m.role === 'user' && (
                    <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs italic bg-slate-50/40 p-2.5 rounded-lg border border-slate-200/60 w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-700" />
                <span>Gemma 4 (gemma-4-26b-a4b-it) thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-50/90 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 whitespace-nowrap cursor-pointer transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-50 border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about ASEAN grants, hiring, or soft landing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-teal-200"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 rounded-xl bg-teal-700 hover:bg-teal-700 disabled:bg-slate-100 text-slate-900 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
