import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { UsDeliveryModel } from './components/UsDeliveryModel';
import { CeoMessage } from './components/CeoMessage';
import { CareersPortal } from './components/CareersPortal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { JobApplicationModal } from './components/JobApplicationModal';
import { AdminApplicantsModal } from './components/AdminApplicantsModal';
import { QuoteModal } from './components/QuoteModal';
import { JobOpening, JobApplication, QuoteRequest } from './types';
import { initAuth, googleSignIn, logoutGoogle, getAccessToken } from './services/firebaseAuth';
import { User } from 'firebase/auth';

const STORAGE_KEY_APPLICATIONS = 'thepurpex_job_applications_v1';
const STORAGE_KEY_QUOTES = 'thepurpex_quotes_v1';

export default function App() {
  // Always start from homepage
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Auth and Google Drive state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasDriveToken, setHasDriveToken] = useState<boolean>(false);

  // Modals state
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<JobOpening | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState<string | undefined>(undefined);

  // Data persistence
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 'app-seed-01',
        jobId: 'purpex-job-01',
        jobTitle: 'Customer Support Executive (US Night Shift)',
        applicantName: 'Hamza Tariq',
        email: 'hamza.tariq@example.com',
        phone: '+923001234567',
        experienceYears: '2 Years (Inbound Voice Support)',
        expectedSalary: '100,000 PKR / month',
        noticePeriod: 'Immediate',
        shiftPreference: 'US Night Shift',
        coverLetter: 'Experienced international customer service representative with 2 years of handling US customer queues on Zendesk.',
        appliedAt: 'August 18, 2026 at 9:30 PM',
        status: 'Interview Scheduled',
        googleDrive: {
          synced: true,
          folderId: 'purpex-drive-folder',
          summaryFileId: 'drive-file-01',
          driveWebLink: 'https://drive.google.com',
        },
        notes: 'Strong neutral accent, shortlisted for round 2 with CEO Muhammad Abubakar.',
      },
    ];
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUOTES);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(applications));
    } catch (_) {}
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUOTES, JSON.stringify(quotes));
    } catch (_) {}
  }, [quotes]);

  // Initialize Auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setHasDriveToken(Boolean(token));
      },
      () => {
        setCurrentUser(null);
        setHasDriveToken(false);
      }
    );

    // Initial check for token
    getAccessToken().then(token => {
      if (token) setHasDriveToken(true);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setHasDriveToken(true);
      }
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await logoutGoogle();
      setCurrentUser(null);
      setHasDriveToken(false);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const handleApplyForJob = (job: JobOpening | null) => {
    setSelectedJobForApplication(job);
    setIsApplicationModalOpen(true);
  };

  const handleApplicationSubmitted = (newApp: JobApplication) => {
    setApplications(prev => [newApp, ...prev.filter(a => a.id !== newApp.id)]);
  };

  const handleUpdateApplication = (updatedApp: JobApplication) => {
    setApplications(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  const handleQuoteSubmitted = (newQuote: QuoteRequest) => {
    setQuotes(prev => [newQuote, ...prev]);
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setQuoteInitialService(serviceTitle);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-slate-900 flex flex-col selection:bg-indigo-600 selection:text-white font-sans antialiased">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuote={() => {
          setQuoteInitialService(undefined);
          setIsQuoteModalOpen(true);
        }}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        currentUser={currentUser}
        hasDriveToken={hasDriveToken}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
        applicantCount={applications.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreServices={() => {
            setActiveTab('services');
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCareers={() => {
            setActiveTab('careers');
            document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQuote={() => {
            setQuoteInitialService(undefined);
            setIsQuoteModalOpen(true);
          }}
        />

        {/* Services & Solutions Section */}
        <ServicesSection
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* US Delivery Model & Cost Comparison */}
        <UsDeliveryModel
          onOpenQuote={() => {
            setQuoteInitialService(undefined);
            setIsQuoteModalOpen(true);
          }}
        />

        {/* CEO Leadership & Vision */}
        <CeoMessage
          onContactClick={() => {
            setActiveTab('contact');
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Careers & Job Openings Portal */}
        <CareersPortal
          onApplyForJob={handleApplyForJob}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
          applicantCount={applications.length}
        />

        {/* Contact Us & Queen Plaza Lahore HQ */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tabId) => {
          setActiveTab(tabId);
          document.getElementById(tabId)?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCareers={() => {
          setActiveTab('careers');
          document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenQuote={() => {
          setQuoteInitialService(undefined);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* Job Application Modal with Google Drive Integration */}
      {isApplicationModalOpen && (
        <JobApplicationModal
          job={selectedJobForApplication}
          onClose={() => setIsApplicationModalOpen(false)}
          onApplicationSubmitted={handleApplicationSubmitted}
          currentUser={currentUser}
        />
      )}

      {/* Admin / HR Applicants Workspace */}
      {isAdminModalOpen && (
        <AdminApplicantsModal
          applications={applications}
          onClose={() => setIsAdminModalOpen(false)}
          onUpdateApplication={handleUpdateApplication}
          onDeleteApplication={handleDeleteApplication}
          hasDriveToken={hasDriveToken}
          onGoogleSignIn={handleGoogleSignIn}
        />
      )}

      {/* Quote / Custom Team Calculator Modal */}
      {isQuoteModalOpen && (
        <QuoteModal
          initialService={quoteInitialService}
          onClose={() => setIsQuoteModalOpen(false)}
          onQuoteSubmitted={handleQuoteSubmitted}
        />
      )}

    </div>
  );
}
