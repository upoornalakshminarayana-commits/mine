import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Search,
  Plus,
  ThumbsUp,
  Eye,
  Pin,
  CheckCircle,
  Tag,
  Target,
  BookOpen,
  FlaskConical,
  X,
  Send,
  Filter,
  User,
  ShieldCheck
} from 'lucide-react';
import { useStream } from '../context/StreamContext';

export default function DiscussionsPage() {
  const {
    discussions,
    addDiscussion,
    addDiscussionReply,
    upvoteDiscussion,
    selectedStream,
    employee,
  } = useStream();

  const [searchQuery, setSearchQuery] = useState('');
  const [streamFilter, setStreamFilter] = useState('all');
  const [selectedThread, setSelectedThread] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [replyInput, setReplyInput] = useState('');

  // New Discussion Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCompetency, setNewCompetency] = useState('Survey Sampling & Data Analysis');
  const [newContent, setNewContent] = useState('');

  // Filter discussions
  const filteredDiscussions = discussions.filter(d => {
    const matchesStream = streamFilter === 'all' || d.streamId === streamFilter;
    const matchesQuery = searchQuery.trim() === ''
      || d.title.toLowerCase().includes(searchQuery.toLowerCase())
      || d.relatedCompetency.toLowerCase().includes(searchQuery.toLowerCase())
      || d.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStream && matchesQuery;
  });

  const handleCreateDiscussion = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const thread = {
      id: `disc-${Date.now()}`,
      streamId: selectedStream?.id || 'stats',
      title: newTitle,
      author: {
        name: employee.name,
        role: employee.designation,
        dept: employee.department,
        initials: employee.avatarInitials,
      },
      date: 'Just now',
      views: 1,
      repliesCount: 0,
      usefulCount: 0,
      pinned: false,
      tags: ['Civil Services', 'Peer Learning'],
      relatedCompetency: newCompetency,
      relatedLearning: 'Fundamentals of Survey Sampling',
      relatedVirtualLab: 'District Survey Analysis',
      content: newContent,
      replies: [],
    };

    addDiscussion(thread);
    setNewTitle('');
    setNewContent('');
    setCreateModalOpen(false);
  };

  const handleSendReply = (threadId) => {
    if (!replyInput.trim()) return;
    addDiscussionReply(threadId, replyInput);
    setReplyInput('');

    // Update local modal state
    if (selectedThread && selectedThread.id === threadId) {
      setSelectedThread(prev => ({
        ...prev,
        repliesCount: prev.repliesCount + 1,
        replies: [
          ...(prev.replies || []),
          {
            id: `rep-${Date.now()}`,
            author: { name: employee.name, role: employee.designation, dept: employee.department, initials: employee.avatarInitials },
            date: 'Just now',
            content: replyInput,
            useful: 0,
          },
        ],
      }));
    }
  };

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      {/* ── Header Strip ────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <MessageSquare size={12} />
              <span>Peer Learning & Competency Forums</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Civil Services Competency Community
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Connect with fellow government officers across departments. Discuss challenging competency topics, share field best practices, and collaborate on Virtual Lab findings.
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="btn-gov-saffron text-xs font-bold px-4 py-2.5 flex items-center gap-1.5 shadow-md shrink-0"
          >
            <Plus size={15} />
            <span>Start Discussion</span>
          </button>
        </div>
      </div>

      {/* ── Search & Filter Controls ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        {/* Stream Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Discussions' },
            { id: 'stats', label: 'Statistics & Surveys' },
            { id: 'it', label: 'IT & e-Governance' },
            { id: 'finance', label: 'Finance & Audit' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStreamFilter(tab.id)}
              className={`px-3 py-1.5 rounded-gov font-semibold whitespace-nowrap transition-all ${
                streamFilter === tab.id
                  ? 'bg-gov-blue text-white shadow-xs'
                  : 'bg-white border border-gov-gray-200 text-gov-gray-600 hover:bg-gov-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gov-gray-400" />
          <input
            type="text"
            placeholder="Search discussions & competencies..."
            className="gov-input pl-8 py-1.5 text-xs bg-white"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ── Discussions List ────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {filteredDiscussions.map(disc => (
          <motion.div
            key={disc.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`gov-card p-5 hover:shadow-gov-card-hover transition-all border-l-4 ${
              disc.pinned ? 'border-l-gov-saffron bg-gov-saffron-light/20' : 'border-l-gov-blue'
            }`}
          >
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="space-y-2.5 flex-1">
                {/* Author & Date Header */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-gov-navy text-white text-[10px] font-bold flex items-center justify-center">
                    {disc.author.initials || 'GO'}
                  </div>
                  <span className="font-bold text-gov-navy">{disc.author.name}</span>
                  <span className="text-gov-gray-400">·</span>
                  <span className="text-[11px] text-gov-gray-500">{disc.author.role} ({disc.author.dept})</span>
                  <span className="text-gov-gray-400">·</span>
                  <span className="text-[11px] text-gov-gray-400">{disc.date}</span>
                  {disc.pinned && (
                    <span className="badge-gov-warning text-[9px] flex items-center gap-1 font-bold">
                      <Pin size={10} /> Pinned
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  onClick={() => setSelectedThread(disc)}
                  className="text-base font-bold text-gov-navy hover:text-gov-blue cursor-pointer transition-colors leading-snug"
                >
                  {disc.title}
                </h3>

                {/* Snippet */}
                <p className="text-xs text-gov-gray-600 leading-relaxed line-clamp-2">
                  {disc.content}
                </p>

                {/* ── Connected Competency Ecosystem Badges (Crucial Prompt Requirement!) ── */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="bg-gov-blue-light text-gov-blue font-semibold px-2 py-0.5 rounded flex items-center gap-1 border border-blue-200">
                    <Target size={11} />
                    <span>Competency: {disc.relatedCompetency}</span>
                  </span>

                  {disc.relatedLearning && (
                    <Link
                      to="/explore-learning"
                      className="bg-gov-saffron-light text-gov-saffron font-semibold px-2 py-0.5 rounded flex items-center gap-1 border border-saffron-200 hover:bg-gov-saffron hover:text-white transition-colors"
                    >
                      <BookOpen size={11} />
                      <span>Course: {disc.relatedLearning}</span>
                    </Link>
                  )}

                  {disc.relatedVirtualLab && (
                    <Link
                      to="/virtual-labs"
                      className="bg-gov-green-light text-gov-green font-semibold px-2 py-0.5 rounded flex items-center gap-1 border border-green-200 hover:bg-gov-green hover:text-white transition-colors"
                    >
                      <FlaskConical size={11} />
                      <span>Virtual Lab: {disc.relatedVirtualLab}</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Right Stats & CTA */}
              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gov-gray-100">
                <div className="flex items-center gap-4 text-xs text-gov-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye size={13} /> {disc.views} views
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-gov-navy">
                    <MessageSquare size={13} /> {disc.repliesCount} replies
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => upvoteDiscussion(disc.id)}
                    className="btn-gov-secondary text-xs py-1.5 px-3 flex items-center gap-1"
                  >
                    <ThumbsUp size={12} />
                    <span>Useful ({disc.usefulCount})</span>
                  </button>

                  <button
                    onClick={() => setSelectedThread(disc)}
                    className="btn-gov-primary text-xs py-1.5 px-3"
                  >
                    Join Discussion
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Thread Detail & Reply Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {selectedThread && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gov-navy/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-gov-lg shadow-2xl border border-gov-gray-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-4 bg-gov-navy text-white flex items-center justify-between">
                <div>
                  <span className="badge-gov-info text-[9px] uppercase font-bold">Discussion Thread</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{selectedThread.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedThread(null)}
                  className="p-1 rounded text-white/70 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                {/* Original Post */}
                <div className="p-4 bg-gov-off-white border border-gov-gray-200 rounded-gov space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gov-blue text-white text-[10px] font-bold flex items-center justify-center">
                      {selectedThread.author.initials || 'GO'}
                    </div>
                    <div>
                      <p className="font-bold text-gov-navy">{selectedThread.author.name}</p>
                      <p className="text-[10px] text-gov-gray-400">{selectedThread.author.role} · {selectedThread.date}</p>
                    </div>
                  </div>
                  <p className="text-gov-gray-800 leading-relaxed mt-2 whitespace-pre-wrap">
                    {selectedThread.content}
                  </p>
                </div>

                {/* Linked Ecosystem Connections */}
                <div className="p-3 bg-gov-blue-light/40 border border-blue-200 rounded-gov flex flex-wrap gap-3 text-[11px]">
                  <div>
                    <span className="text-gov-gray-500 block text-[10px]">Connected Competency</span>
                    <strong className="text-gov-navy">{selectedThread.relatedCompetency}</strong>
                  </div>
                  <div>
                    <span className="text-gov-gray-500 block text-[10px]">Connected Course</span>
                    <strong className="text-gov-blue">{selectedThread.relatedLearning}</strong>
                  </div>
                  <div>
                    <span className="text-gov-gray-500 block text-[10px]">Connected Virtual Lab</span>
                    <strong className="text-gov-green">{selectedThread.relatedVirtualLab}</strong>
                  </div>
                </div>

                {/* Replies Section */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-gov-navy uppercase tracking-wider text-[10px]">
                    Responses ({selectedThread.replies?.length || 0})
                  </h4>

                  {selectedThread.replies && selectedThread.replies.length > 0 ? (
                    selectedThread.replies.map(rep => (
                      <div key={rep.id} className="p-3 bg-white border border-gov-gray-200 rounded-gov space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-gov-navy">{rep.author.name}</span>
                            {rep.author.isOfficial && (
                              <span className="badge-gov-success text-[9px] flex items-center gap-0.5">
                                <ShieldCheck size={10} /> Official Expert
                              </span>
                            )}
                            <span className="text-[10px] text-gov-gray-400">· {rep.date}</span>
                          </div>
                          <span className="text-[10px] text-gov-gray-400">👍 {rep.useful || 0}</span>
                        </div>
                        <p className="text-gov-gray-700 leading-relaxed">{rep.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gov-gray-400 italic">No replies yet. Be the first to share your departmental insights.</p>
                  )}
                </div>
              </div>

              {/* Modal Reply Footer */}
              <div className="p-3 bg-gov-off-white border-t border-gov-gray-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendReply(selectedThread.id);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder="Write an official response or share practical experience..."
                    className="gov-input text-xs flex-1 py-2"
                    value={replyInput}
                    onChange={e => setReplyInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={!replyInput.trim()}
                    className="btn-gov-primary px-4 py-2 text-xs flex items-center gap-1"
                  >
                    <Send size={13} />
                    <span>Reply</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Start Discussion Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gov-navy/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-gov-lg shadow-2xl border border-gov-gray-200 max-w-lg w-full overflow-hidden"
            >
              <div className="p-4 bg-gov-navy text-white flex items-center justify-between">
                <h3 className="text-sm font-bold">Start a New Competency Discussion</h3>
                <button onClick={() => setCreateModalOpen(false)} className="p-1 text-white/70 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateDiscussion} className="p-5 space-y-4 text-xs">
                <div>
                  <label className="gov-label">Discussion Title / Question</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Best practices for handling non-sampling errors in district surveys"
                    className="gov-input"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="gov-label">Related Competency Area</label>
                  <select
                    className="gov-input"
                    value={newCompetency}
                    onChange={e => setNewCompetency(e.target.value)}
                  >
                    <option value="Survey Sampling & Data Analysis">Survey Sampling & Data Analysis</option>
                    <option value="Statistical Analysis">Statistical Analysis</option>
                    <option value="Python / Tools">Python / Tools</option>
                    <option value="Data Visualization">Data Visualization</option>
                    <option value="Cybersecurity & Systems">Cybersecurity & Systems</option>
                    <option value="Budget Management & Audit">Budget Management & Audit</option>
                  </select>
                </div>

                <div>
                  <label className="gov-label">Details / Question Description</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide context, problem statement, or official guidance question..."
                    className="gov-input font-sans"
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                  />
                </div>

                <div className="pt-2 border-t border-gov-gray-200 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="btn-gov-secondary text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gov-primary text-xs"
                  >
                    Post Discussion
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
