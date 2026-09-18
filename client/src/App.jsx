import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout components
import GovernmentTopNav from './components/layout/GovernmentTopNav';
import EmployeeSidebar from './components/layout/EmployeeSidebar';
import AIAssistantDrawer from './components/AIAssistantDrawer';
import GovernmentFooter from './components/GovernmentFooter';

// Pages
import LoginPage from './pages/LoginPage';
import StreamSelectionPage from './pages/StreamSelectionPage';
import StreamAssessmentPage from './pages/StreamAssessmentPage';
import GapAnalysisPage from './pages/GapAnalysisPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import CompetenciesPage from './pages/CompetenciesPage';
import SkillGapsPage from './pages/SkillGapsPage';
import LearningPathPage from './pages/LearningPathPage';
import ExploreLearningPage from './pages/ExploreLearningPage';
import VirtualLabsPage from './pages/VirtualLabsPage';
import AssessmentsPage from './pages/AssessmentsPage';
import DiscussionsPage from './pages/DiscussionsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import FutureRolePage from './pages/FutureRolePage';
import ProgressHistoryPage from './pages/ProgressHistoryPage';
import CertificatesPage from './pages/CertificatesPage';

// Context
import { StreamProvider, useStream } from './context/StreamContext';

// App shell for authenticated users who have completed stream onboarding
function AppShell({ onLogout }) {
  const { setOnboardingStep } = useStream();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gov-off-white text-gov-gray-800">
      {/* Top Navbar */}
      <GovernmentTopNav
        onLogout={onLogout}
        onMobileMenuToggle={() => setMobileSidebarOpen(true)}
      />

      {/* Main App Layout: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden max-w-screen-2xl mx-auto w-full">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex shrink-0">
          <EmployeeSidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <div
                className="fixed inset-0 bg-gov-navy/50 z-40 lg:hidden backdrop-blur-xs"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <EmployeeSidebar
                mobile
                onClose={() => setMobileSidebarOpen(false)}
              />
            </>
          )}
        </AnimatePresence>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/competencies" element={<CompetenciesPage />} />
              <Route path="/skill-gaps" element={<SkillGapsPage />} />
              <Route path="/learning-path" element={<LearningPathPage />} />
              <Route path="/explore-learning" element={<ExploreLearningPage />} />
              <Route path="/virtual-labs" element={<VirtualLabsPage />} />
              <Route path="/assessments" element={<AssessmentsPage />} />
              <Route path="/discussions" element={<DiscussionsPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/future-role" element={<FutureRolePage />} />
              <Route path="/progress" element={<ProgressHistoryPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />

              {/* Legacy and helper redirects */}
              <Route path="/learning" element={<ExploreLearningPage />} />
              <Route
                path="/assessment"
                element={
                  <StreamAssessmentPage
                    onBackToStreams={() => setOnboardingStep('stream_selection')}
                    onComplete={() => setOnboardingStep('gap_analysis')}
                  />
                }
              />
              <Route
                path="/diagnostic"
                element={
                  <GapAnalysisPage
                    onEnterDashboard={() => setOnboardingStep('completed')}
                    onRetake={() => setOnboardingStep('assessment')}
                  />
                }
              />
              <Route
                path="/stream-select"
                element={
                  <StreamSelectionPage
                    onSelect={() => setOnboardingStep('assessment')}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* Persistent Floating AI Virtual Assistant */}
      <AIAssistantDrawer />

      {/* Government Footer */}
      <GovernmentFooter />
    </div>
  );
}

// Main Flow Manager inside Stream Context
function MainContent({ isLoggedIn, setIsLoggedIn }) {
  const {
    onboardingStep,
    selectStream,
    setOnboardingStep,
    finishOnboarding,
    retakeAssessment,
    resetAll,
  } = useStream();

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  // 1. Step 1: Select Professional Stream
  if (onboardingStep === 'stream_selection') {
    return (
      <StreamSelectionPage
        onSelect={(stream) => {
          selectStream(stream);
        }}
      />
    );
  }

  // 2. Step 2: Stream-Specific Competency Assessment
  if (onboardingStep === 'assessment') {
    return (
      <StreamAssessmentPage
        onBackToStreams={() => setOnboardingStep('stream_selection')}
        onComplete={() => setOnboardingStep('gap_analysis')}
      />
    );
  }

  // 3. Step 3: AI Gap Analysis & Diagnostic Report
  if (onboardingStep === 'gap_analysis') {
    return (
      <GapAnalysisPage
        onEnterDashboard={() => finishOnboarding()}
        onRetake={() => retakeAssessment()}
      />
    );
  }

  // 4. Step 4: Full Unlocked Employee Portal Shell
  return (
    <AppShell
      onLogout={() => {
        setIsLoggedIn(false);
        resetAll();
      }}
    />
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('ks_is_logged_in') === 'true';
  });

  const handleLogin = (val) => {
    setIsLoggedIn(val);
    localStorage.setItem('ks_is_logged_in', val ? 'true' : 'false');
  };

  return (
    <BrowserRouter>
      <StreamProvider>
        <MainContent
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={handleLogin}
        />
      </StreamProvider>
    </BrowserRouter>
  );
}
