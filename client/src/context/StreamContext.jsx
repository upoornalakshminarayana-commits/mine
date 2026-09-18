import { createContext, useContext, useState, useEffect } from 'react';
import { STREAMS, STREAM_ROLES, generateGapAnalysis } from '../data/streamData';
import {
  defaultEmployee,
  VIRTUAL_LABS,
  DISCUSSIONS,
  LEADERBOARD_USERS,
  FUTURE_ROLE_DATA,
  ALL_COURSES_CATALOG,
  DEFAULT_PROGRESS_TIMELINE,
  DEFAULT_NOTIFICATIONS
} from '../data/portalData';

const StreamContext = createContext(null);

export function StreamProvider({ children }) {
  // ── 1. Active Stream State ──────────────────────────────────────────────────
  const [selectedStream, setSelectedStream] = useState(() => {
    const saved = localStorage.getItem('ks_selected_stream');
    return saved ? JSON.parse(saved) : STREAMS[0]; // Default: Statistics
  });

  const [assessmentAnswers, setAssessmentAnswers] = useState(() => {
    const saved = localStorage.getItem('ks_stream_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [assessmentCompleted, setAssessmentCompleted] = useState(() => {
    return localStorage.getItem('ks_assessment_completed') === 'true';
  });

  const [onboardingStep, setOnboardingStep] = useState(() => {
    return localStorage.getItem('ks_onboarding_step') || 'stream_selection'; // stream_selection | assessment | gap_analysis | completed
  });

  // ── 2. Employee Profile Metadata ────────────────────────────────────────────
  const [employee, setEmployee] = useState(() => {
    const saved = localStorage.getItem('ks_employee_profile');
    return saved ? JSON.parse(saved) : defaultEmployee;
  });

  // ── 3. Dynamic Gap Analysis ─────────────────────────────────────────────────
  const [gapAnalysis, setGapAnalysis] = useState(() => {
    const streamId = selectedStream?.id || 'stats';
    return generateGapAnalysis(streamId, assessmentAnswers);
  });

  // Re-run gap analysis whenever stream or answers change
  useEffect(() => {
    if (selectedStream) {
      const data = generateGapAnalysis(selectedStream.id, assessmentAnswers);
      setGapAnalysis(data);
    }
  }, [selectedStream, assessmentAnswers]);

  // ── 4. Virtual Labs State & Submissions ──────────────────────────────────────
  const [virtualLabs, setVirtualLabs] = useState(() => {
    const saved = localStorage.getItem('ks_virtual_labs');
    return saved ? JSON.parse(saved) : VIRTUAL_LABS;
  });

  const [labSubmissions, setLabSubmissions] = useState(() => {
    const saved = localStorage.getItem('ks_lab_submissions');
    return saved ? JSON.parse(saved) : {};
  });

  // ── 5. Discussions State ────────────────────────────────────────────────────
  const [discussions, setDiscussions] = useState(() => {
    const saved = localStorage.getItem('ks_discussions');
    return saved ? JSON.parse(saved) : DISCUSSIONS;
  });

  // ── 6. Course Catalog & Enrollments ─────────────────────────────────────────
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('ks_courses');
    return saved ? JSON.parse(saved) : ALL_COURSES_CATALOG;
  });

  // ── 7. Progress History Timeline ────────────────────────────────────────────
  const [progressTimeline, setProgressTimeline] = useState(() => {
    const saved = localStorage.getItem('ks_progress_timeline');
    return saved ? JSON.parse(saved) : DEFAULT_PROGRESS_TIMELINE;
  });

  // ── 8. Notifications ────────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ks_notifications');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  // ── 9. AI Assistant State ───────────────────────────────────────────────────
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState([
    {
      id: 'msg-init',
      sender: 'ai',
      text: 'Hello Arjun. I am your AI Competency & Learning Assistant. I have analyzed your diagnostic assessment in Statistics & Data Analytics. How can I help guide your professional development today?',
      timestamp: 'Just now',
    },
  ]);

  // ── Actions ─────────────────────────────────────────────────────────────────
  const selectStream = (stream) => {
    setSelectedStream(stream);
    localStorage.setItem('ks_selected_stream', JSON.stringify(stream));
    setOnboardingStep('assessment');
    localStorage.setItem('ks_onboarding_step', 'assessment');
  };

  const submitAssessment = (answers) => {
    setAssessmentAnswers(answers);
    setAssessmentCompleted(true);
    localStorage.setItem('ks_stream_answers', JSON.stringify(answers));
    localStorage.setItem('ks_assessment_completed', 'true');
    setOnboardingStep('gap_analysis');
    localStorage.setItem('ks_onboarding_step', 'gap_analysis');
  };

  const finishOnboarding = () => {
    setOnboardingStep('completed');
    localStorage.setItem('ks_onboarding_step', 'completed');
  };

  const retakeAssessment = () => {
    setAssessmentAnswers({});
    setAssessmentCompleted(false);
    setOnboardingStep('assessment');
    localStorage.removeItem('ks_stream_answers');
    localStorage.setItem('ks_assessment_completed', 'false');
    localStorage.setItem('ks_onboarding_step', 'assessment');
  };

  const switchStream = (streamId) => {
    const stream = STREAMS.find(s => s.id === streamId) || STREAMS[0];
    setSelectedStream(stream);
    setAssessmentAnswers({});
    setAssessmentCompleted(false);
    setOnboardingStep('assessment');
    localStorage.setItem('ks_selected_stream', JSON.stringify(stream));
    localStorage.removeItem('ks_stream_answers');
    localStorage.setItem('ks_assessment_completed', 'false');
    localStorage.setItem('ks_onboarding_step', 'assessment');
  };

  const resetAll = () => {
    setSelectedStream(null);
    setAssessmentAnswers({});
    setAssessmentCompleted(false);
    setOnboardingStep('stream_selection');
    localStorage.removeItem('ks_selected_stream');
    localStorage.removeItem('ks_stream_answers');
    localStorage.removeItem('ks_assessment_completed');
    localStorage.removeItem('ks_onboarding_step');
    localStorage.removeItem('ks_lab_submissions');
  };

  // Submit a Virtual Lab evaluation
  const submitVirtualLabAnalysis = (labId, evaluationResults) => {
    const updatedSubmissions = {
      ...labSubmissions,
      [labId]: {
        evaluatedAt: new Date().toISOString(),
        results: evaluationResults,
      },
    };
    setLabSubmissions(updatedSubmissions);
    localStorage.setItem('ks_lab_submissions', JSON.stringify(updatedSubmissions));

    // Add progress timeline entry
    const lab = virtualLabs.find(l => l.id === labId) || virtualLabs[0];
    const newTimelineItem = {
      id: `evt-lab-${Date.now()}`,
      date: 'Today',
      title: `Virtual Lab: ${lab.title}`,
      category: 'Virtual Lab',
      score: `${evaluationResults.overallPracticalScore}%`,
      badge: 'Evaluated',
      statusColor: 'text-gov-green',
      desc: `Completed practical analysis. ${evaluationResults.keyGapTakeaway}`,
    };
    const updatedTimeline = [newTimelineItem, ...progressTimeline];
    setProgressTimeline(updatedTimeline);
    localStorage.setItem('ks_progress_timeline', JSON.stringify(updatedTimeline));

    // Push notification
    const newNotification = {
      id: `n-${Date.now()}`,
      title: `Virtual Lab Evaluated: ${lab.title}`,
      message: `Score: ${evaluationResults.overallPracticalScore}%. Practical takeaway: ${evaluationResults.keyGapTakeaway}`,
      type: 'success',
      read: false,
      time: 'Just now',
      link: '/virtual-labs',
    };
    const updatedNotifs = [newNotification, ...notifications];
    setNotifications(updatedNotifs);
    localStorage.setItem('ks_notifications', JSON.stringify(updatedNotifs));
  };

  // Add Discussion Thread
  const addDiscussion = (newDiscussion) => {
    const updated = [newDiscussion, ...discussions];
    setDiscussions(updated);
    localStorage.setItem('ks_discussions', JSON.stringify(updated));
  };

  // Reply to Discussion
  const addDiscussionReply = (discussionId, replyText) => {
    const updated = discussions.map(d => {
      if (d.id === discussionId) {
        const newReply = {
          id: `rep-${Date.now()}`,
          author: { name: employee.name, role: employee.designation, dept: employee.department, initials: employee.avatarInitials },
          date: 'Just now',
          content: replyText,
          useful: 0,
        };
        return {
          ...d,
          repliesCount: d.repliesCount + 1,
          replies: [...(d.replies || []), newReply],
        };
      }
      return d;
    });
    setDiscussions(updated);
    localStorage.setItem('ks_discussions', JSON.stringify(updated));
  };

  // Upvote / Like Discussion
  const upvoteDiscussion = (discussionId) => {
    const updated = discussions.map(d => {
      if (d.id === discussionId) {
        return { ...d, usefulCount: d.usefulCount + 1 };
      }
      return d;
    });
    setDiscussions(updated);
    localStorage.setItem('ks_discussions', JSON.stringify(updated));
  };

  // Enroll in Course
  const toggleCourseEnrollment = (courseId) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        return { ...c, isEnrolled: !c.isEnrolled, progress: !c.isEnrolled ? 10 : 0 };
      }
      return c;
    });
    setCourses(updated);
    localStorage.setItem('ks_courses', JSON.stringify(updated));
  };

  // AI Assistant Chat Message
  const sendAIMessage = (userText) => {
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
    };
    setAssistantMessages(prev => [...prev, userMsg]);

    // Generate smart context-aware AI reply
    setTimeout(() => {
      let botResponse = '';
      let actions = [];

      const query = userText.toLowerCase();

      if (query.includes('python') || query.includes('skill gap')) {
        botResponse = `Your latest assessment indicates a 33 percentage point gap in Survey Sampling (42% vs required 75%) and a developing gap in Python for Data Analysis (61% vs required 75%). I recommend starting with "Fundamentals of Survey Sampling" on iGOT and practicing in the District Survey Analysis Virtual Lab.`;
        actions = [
          { label: 'Start Learning (iGOT)', path: '/explore-learning' },
          { label: 'Practice in Virtual Lab', path: '/virtual-labs' },
          { label: 'View Skill Gaps', path: '/skill-gaps' },
        ];
      } else if (query.includes('survey sampling') || query.includes('sampling')) {
        botResponse = `Survey Sampling is the foundational competency for a ${employee.designation}. Your current score is 42%, while your mapped SSO promotion benchmark requires 75%. You performed well on basic definitions, but practical stratified weight allocation in NSS datasets needs strengthening.`;
        actions = [
          { label: 'Launch District Survey Lab', path: '/virtual-labs' },
          { label: 'Discuss with Peers', path: '/discussions' },
        ];
      } else if (query.includes('reassessment') || query.includes('prepare')) {
        botResponse = `Your Competency Re-Assessment for Survey Sampling requires completing 2 more coursework modules in "Fundamentals of Survey Sampling" and scoring ≥65% in the District Survey Virtual Lab. You are currently 72% ready!`;
        actions = [
          { label: 'View Assessments', path: '/assessments' },
          { label: 'Open Learning Path', path: '/learning-path' },
        ];
      } else if (query.includes('competency score') || query.includes('score') || query.includes('how')) {
        botResponse = `Your overall competency score of 63% is calculated from your Diagnostic Assessment (50%), verified iGOT learning milestones (25%), and Virtual Lab practical submissions (25%). Reassessing closed gaps will boost this to 78%+.`;
        actions = [
          { label: 'View Competency Radar', path: '/competencies' },
          { label: 'Check Leaderboard Rank', path: '/leaderboard' },
        ];
      } else {
        botResponse = `I have logged your request regarding "${userText}". Based on your active Statistics & Data Analytics stream, I suggest focusing on closing your critical Survey Sampling gap through our interactive Virtual Labs and taking the upcoming re-assessment.`;
        actions = [
          { label: 'Explore Learning', path: '/explore-learning' },
          { label: 'Virtual Labs', path: '/virtual-labs' },
        ];
      }

      const botMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: botResponse,
        actions,
        timestamp: 'Just now',
      };
      setAssistantMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const currentRole = STREAM_ROLES[selectedStream?.id || 'stats'] || STREAM_ROLES.stats;

  return (
    <StreamContext.Provider value={{
      selectedStream,
      assessmentAnswers,
      assessmentCompleted,
      onboardingStep,
      gapAnalysis,
      currentRole,
      employee,
      setEmployee,
      virtualLabs,
      labSubmissions,
      submitVirtualLabAnalysis,
      discussions,
      addDiscussion,
      addDiscussionReply,
      upvoteDiscussion,
      courses,
      toggleCourseEnrollment,
      progressTimeline,
      notifications,
      setNotifications,
      isAIAssistantOpen,
      setIsAIAssistantOpen,
      assistantMessages,
      sendAIMessage,
      selectStream,
      submitAssessment,
      finishOnboarding,
      retakeAssessment,
      switchStream,
      resetAll,
      setOnboardingStep,
    }}>
      {children}
    </StreamContext.Provider>
  );
}

export const useStream = () => {
  const ctx = useContext(StreamContext);
  if (!ctx) throw new Error('useStream must be used within StreamProvider');
  return ctx;
};
