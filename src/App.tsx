import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { MentorsPage } from './pages/MentorsPage';
import { MentorProfilePage } from './pages/MentorProfilePage';
import { ClassesPage } from './pages/ClassesPage';
import { ClassDetailPage } from './pages/ClassDetailPage';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { EducatorDashboardPage } from './pages/EducatorDashboardPage';
import { VideoClassroomPage } from './pages/VideoClassroomPage';
import { HowItWorksPage, AboutPage, FAQPage } from './pages/StaticPages';
import { AdminPage } from './pages/AdminPage';

const MainRouter: React.FC = () => {
  const { currentPath, navigate } = useApp();

  // Normalize path without query params, fallback safely to '/'
  const path = (currentPath || '/').split('?')[0];

  // Determine which page to render
  const renderPage = () => {
    if (path === '/admin' || path.startsWith('/admin')) {
      return <AdminPage />;
    }

    if (path === '/' || path === '') {
      return <HomePage />;
    }

    if (path === '/mentors') {
      return <MentorsPage />;
    }

    if (path.startsWith('/mentors/')) {
      const id = path.replace('/mentors/', '');
      return <MentorProfilePage educatorId={id} />;
    }

    if (path === '/classes') {
      return <ClassesPage />;
    }

    if (path.startsWith('/classes/')) {
      const id = path.replace('/classes/', '');
      return <ClassDetailPage classId={id} />;
    }

    if (path === '/signup') {
      return <SignUpPage />;
    }

    if (path === '/login') {
      return <LoginPage />;
    }

    if (path === '/dashboard/student') {
      return <StudentDashboardPage />;
    }

    if (path === '/dashboard/educator') {
      return <EducatorDashboardPage />;
    }

    if (path.startsWith('/classroom/')) {
      const sessionId = path.replace('/classroom/', '');
      return <VideoClassroomPage sessionId={sessionId} />;
    }

    if (path === '/how-it-works') {
      return <HowItWorksPage />;
    }

    if (path === '/about') {
      return <AboutPage />;
    }

    if (path === '/faq') {
      return <FAQPage />;
    }

    // 404 Fallback
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-2">404</h2>
        <p className="text-sm text-slate-500 max-w-sm mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="py-2 px-5 rounded-md bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition cursor-pointer shadow-xs"
        >
          Return Home
        </button>
      </div>
    );
  };

  const isClassroom = path.startsWith('/classroom/');
  const isAdmin = path === '/admin' || path.startsWith('/admin');
  const isDedicatedLayout = isClassroom || isAdmin;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-indigo-500/20 selection:text-indigo-900">
      {!isDedicatedLayout && <Navbar />}
      <main className="flex-1">{renderPage()}</main>
      {!isDedicatedLayout && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
