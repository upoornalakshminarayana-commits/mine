import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ExternalLink,
  ChevronRight,
  BookOpen,
  FlaskConical,
  Target,
  RefreshCw
} from 'lucide-react';
import { useStream } from '../context/StreamContext';

export default function AIAssistantDrawer() {
  const {
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    assistantMessages,
    sendAIMessage,
    employee,
    selectedStream,
    gapAnalysis,
  } = useStream();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    'Why is Python my biggest skill gap?',
    'Explain Survey Sampling',
    'What should I learn next?',
    'Help me prepare for my reassessment',
    'Explain my competency score',
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
      {/* ── Persistent Floating Trigger Button (Bottom-Right) ──────────────── */}
      {!isAIAssistantOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAIAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-gov-navy to-gov-blue text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border-2 border-white/20 flex items-center gap-2.5 hover:shadow-gov-dropdown transition-all group"
          aria-label="Open AI Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-gov-saffron flex items-center justify-center shrink-0">
            <Sparkles size={14} className="text-white animate-spin-slow" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">✨ AI Assistant</span>
          <span className="w-2 h-2 rounded-full bg-gov-green animate-ping hidden sm:inline" />
        </motion.button>
      )}

      {/* ── AI Assistant Slide-In Panel ────────────────────────────────────── */}
      <AnimatePresence>
        {isAIAssistantOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAIAssistantOpen(false)}
              className="fixed inset-0 bg-gov-navy/40 backdrop-blur-xs z-50 lg:bg-transparent lg:pointer-events-none"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white border-l border-gov-gray-200 shadow-2xl flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gov-saffron/20 border border-gov-saffron flex items-center justify-center text-gov-saffron">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold leading-none text-white">AI Learning Assistant</h3>
                    <p className="text-[10px] text-white/70 mt-0.5">Context: {selectedStream?.name} · {employee.designation}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsAIAssistantOpen(false)}
                  className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Competency Snapshot Pill */}
              <div className="bg-gov-off-white px-4 py-2 border-b border-gov-gray-200 flex items-center justify-between text-[11px] text-gov-gray-600">
                <span>Overall: <strong className="text-gov-navy">{gapAnalysis?.overallScore || employee.overallCompetency}%</strong></span>
                <span>Top Gap: <strong className="text-gov-red">Survey Sampling (33% gap)</strong></span>
                <span className="badge-gov-info text-[9px]">Active Mode</span>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {assistantMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold ${
                        msg.sender === 'user' ? 'bg-gov-navy' : 'bg-gov-blue'
                      }`}
                    >
                      {msg.sender === 'user' ? <User size={13} /> : <Bot size={13} />}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-gov-md p-3.5 space-y-2.5 ${
                        msg.sender === 'user'
                          ? 'bg-gov-blue text-white font-medium rounded-tr-none'
                          : 'bg-gov-off-white border border-gov-gray-200 text-gov-gray-800 rounded-tl-none shadow-xs'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                      {/* Action Links attached to AI responses */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="pt-2 border-t border-gov-gray-200 flex flex-wrap gap-1.5">
                          {msg.actions.map(act => (
                            <Link
                              key={act.label}
                              to={act.path}
                              onClick={() => setIsAIAssistantOpen(false)}
                              className="btn-gov-secondary text-[11px] py-1 px-2.5 bg-white hover:bg-gov-blue-light"
                            >
                              <span>{act.label}</span>
                              <ChevronRight size={11} />
                            </Link>
                          ))}
                        </div>
                      )}

                      <p className={`text-[9px] ${msg.sender === 'user' ? 'text-white/60 text-right' : 'text-gov-gray-400'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Chips */}
              <div className="p-3 bg-gov-off-white/80 border-t border-gov-gray-200">
                <p className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider mb-1.5">
                  Suggested Questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map(q => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[10px] bg-white border border-gov-gray-200 hover:border-gov-blue hover:text-gov-blue px-2.5 py-1 rounded-full text-gov-gray-600 transition-colors text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-white border-t border-gov-gray-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your competency question..."
                    className="gov-input text-xs flex-1 py-2"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="btn-gov-primary px-3 py-2 text-xs"
                  >
                    <Send size={14} />
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
