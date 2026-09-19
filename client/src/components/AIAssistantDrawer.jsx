import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ChevronRight,
  Minus
} from 'lucide-react';
import { useStream } from '../context/StreamContext';

/**
 * AIAssistantDrawer
 * Small-size, elegant floating AI assistant bot for the website.
 * Features a compact floating pill trigger and a sleek, non-intrusive popup card widget.
 */
export default function AIAssistantDrawer() {
  const {
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    assistantMessages,
    sendAIMessage,
    employee,
    departmentConfig,
    gapAnalysis,
    domainNextBestAction,
    suggestedAIQuestions,
  } = useStream();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const topGap = gapAnalysis?.criticalGaps?.[0] || gapAnalysis?.developingGaps?.[0];
  const topGapDisplay = topGap
    ? `${topGap.name} (${topGap.gap}% gap)`
    : (domainNextBestAction?.competencyName || 'Diagnostic In Progress');

  const suggestedQuestions = (suggestedAIQuestions && suggestedAIQuestions.length > 0)
    ? suggestedAIQuestions.slice(0, 3)
    : [
        'Why are these courses recommended for my role?',
        'Explain my biggest competency gap',
        'How was my score calculated?',
      ];

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;
    sendAIMessage(text);
    setInput('');
  };

  useEffect(() => {
    if (isAIAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [assistantMessages, isAIAssistantOpen]);

  return (
    <>
      {/* ── Small Size Floating Bot Trigger (Bottom-Right) ───────────────── */}
      {!isAIAssistantOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsAIAssistantOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 bg-gradient-to-br from-gov-navy via-[#0F2A4A] to-gov-blue text-white h-10 px-3 rounded-full shadow-lg border border-white/20 flex items-center gap-2 hover:shadow-xl transition-all cursor-pointer group"
          aria-label="Open AI Assistant"
          title="Open AI Competency Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-gov-saffron flex items-center justify-center shrink-0 shadow-xs ring-1 ring-white/30">
            <Bot size={13} className="text-white" />
          </div>
          <span className="text-[11px] font-bold tracking-tight text-white/95">AI Bot</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gov-green animate-pulse shrink-0" />
        </motion.button>
      )}

      {/* ── Small Size AI Assistant Popup Widget ─────────────────────────── */}
      <AnimatePresence>
        {isAIAssistantOpen && (
          <>
            {/* Light backdrop on mobile screens */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAIAssistantOpen(false)}
              className="fixed inset-0 bg-gov-navy/30 backdrop-blur-xs z-50 sm:hidden"
            />

            {/* Compact Floating Popup Card */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 w-[calc(100vw-2rem)] sm:w-[350px] h-[490px] max-h-[calc(100vh-4rem)] bg-white rounded-xl shadow-2xl border border-gov-gray-200 flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Compact Header */}
              <div className="px-3.5 py-2.5 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white flex items-center justify-between border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-gov-saffron/25 border border-gov-saffron flex items-center justify-center text-gov-saffron shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold leading-none text-white truncate">AI Assistant</h3>
                      <span className="w-1.5 h-1.5 rounded-full bg-gov-green" />
                    </div>
                    <p className="text-[9px] text-white/70 truncate mt-0.5">
                      {departmentConfig?.shortName || 'MoSPI'} · {employee?.designation || 'Officer'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setIsAIAssistantOpen(false)}
                    className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    title="Minimize Assistant"
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    onClick={() => setIsAIAssistantOpen(false)}
                    className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    title="Close Assistant"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Compact Competency Snapshot Strip */}
              <div className="bg-gov-off-white px-3 py-1.5 border-b border-gov-gray-200 flex items-center justify-between text-[10px] text-gov-gray-600 shrink-0">
                <span>Score: <strong className="text-gov-navy">{gapAnalysis?.overallScore || employee?.overallCompetency || 70}%</strong></span>
                <span className="truncate max-w-[170px]">Gap: <strong className="text-gov-red">{topGapDisplay}</strong></span>
              </div>

              {/* Scrollable Messages Feed */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs overscroll-contain">
                {assistantMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-bold ${
                        msg.sender === 'user' ? 'bg-gov-navy' : 'bg-gov-blue'
                      }`}
                    >
                      {msg.sender === 'user' ? <User size={11} /> : <Bot size={11} />}
                    </div>

                    <div
                      className={`max-w-[84%] rounded-gov-md p-2.5 space-y-1.5 ${
                        msg.sender === 'user'
                          ? 'bg-gov-blue text-white font-medium rounded-tr-none text-[11px]'
                          : 'bg-gov-off-white border border-gov-gray-200 text-gov-gray-800 rounded-tl-none shadow-xs text-[11px]'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                      {/* Action Links attached to AI responses */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="pt-1.5 border-t border-gov-gray-200/60 flex flex-wrap gap-1">
                          {msg.actions.map(act => (
                            <Link
                              key={act.label}
                              to={act.path}
                              onClick={() => setIsAIAssistantOpen(false)}
                              className="btn-gov-secondary text-[10px] py-0.5 px-2 bg-white hover:bg-gov-blue-light"
                            >
                              <span>{act.label}</span>
                              <ChevronRight size={10} />
                            </Link>
                          ))}
                        </div>
                      )}

                      <p className={`text-[8px] ${msg.sender === 'user' ? 'text-white/60 text-right' : 'text-gov-gray-400'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Compact Suggested Questions Chips */}
              <div className="p-2 bg-gov-off-white/80 border-t border-gov-gray-200 shrink-0">
                <p className="text-[9px] font-bold text-gov-gray-400 uppercase tracking-wider mb-1">
                  Suggested:
                </p>
                <div className="flex flex-wrap gap-1">
                  {suggestedQuestions.map(q => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[9px] bg-white border border-gov-gray-200 hover:border-gov-blue hover:text-gov-blue px-2 py-0.5 rounded-full text-gov-gray-600 transition-colors text-left truncate max-w-full"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Input Footer */}
              <div className="p-2 bg-white border-t border-gov-gray-200 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask competency assistant..."
                    className="gov-input text-[11px] flex-1 py-1.5 px-2.5 h-8"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="btn-gov-primary w-8 h-8 p-0 flex items-center justify-center shrink-0"
                    title="Send message"
                  >
                    <Send size={12} />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
