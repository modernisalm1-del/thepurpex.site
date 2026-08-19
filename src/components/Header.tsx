import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  FolderCheck, 
  Menu, 
  X, 
  Sparkles, 
  FileText,
  Briefcase,
  Mail
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { User } from 'firebase/auth';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuote: () => void;
  onOpenAdmin: () => void;
  currentUser: User | null;
  hasDriveToken: boolean;
  onGoogleSignIn: () => void;
  onGoogleSignOut: () => void;
  applicantCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuote,
  onOpenAdmin,
  currentUser,
  hasDriveToken,
  onGoogleSignIn,
  onGoogleSignOut,
  applicantCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Solutions' },
    { id: 'us-delivery', label: 'US Model' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 transition-all shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-indigo-950 border-b border-indigo-900 px-4 sm:px-10 py-1.5 text-xs text-indigo-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center text-emerald-400 font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
              24/7 Operations • US Time Zones (EST / CST / PST)
            </span>
            <span className="hidden lg:inline text-indigo-700">|</span>
            <span className="hidden lg:inline text-indigo-300 font-mono text-[11px]">
              HQ: Office F-310, Queen Plaza, Lahore
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-[11px] font-medium tracking-wider uppercase">
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="hover:text-white transition-colors flex items-center gap-1.5 text-indigo-200"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Inquiry: {COMPANY_INFO.email}</span>
            </a>
            <span className="text-indigo-800">|</span>
            <a 
              href={COMPANY_INFO.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-indigo-200"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +92 325 0255076</span>
            </a>
            <span className="text-indigo-800 hidden sm:inline">|</span>
            <a 
              href="tel:+923250255076" 
              className="hover:text-white transition-colors hidden sm:flex items-center gap-1.5 text-indigo-200"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <span>Call: +92 325 0255076</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Geometric Balance Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-900 rounded-sm flex items-center justify-center transform rotate-45 transition-transform group-hover:rotate-90 duration-300 shadow-md shadow-indigo-950/20">
              <div className="w-4 h-4 bg-white transform -rotate-45 group-hover:-rotate-90 transition-transform duration-300"></div>
            </div>
            <div className="ml-1">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tighter text-indigo-950 font-sans">THE PURPEX</span>
                <span className="text-[9px] uppercase font-bold tracking-widest bg-indigo-100 text-indigo-900 px-1.5 py-0.5 rounded-sm">
                  Global
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 -mt-0.5">BPO &amp; IT Solutions</p>
            </div>
          </button>

          {/* Desktop Geometric Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`py-2 transition-all cursor-pointer ${
                    isActive 
                      ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                      : 'hover:text-indigo-600'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Google Drive Status */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Google Drive Status / HR Portal sync */}
            {currentUser && hasDriveToken ? (
              <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-700">
                <FolderCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden xl:inline text-emerald-700 font-bold text-[11px] uppercase tracking-wider">Drive Active</span>
                <button
                  onClick={onOpenAdmin}
                  className="bg-indigo-950 hover:bg-indigo-900 text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors"
                  title="View recorded applications in Google Drive"
                >
                  HR ({applicantCount})
                </button>
                <button
                  onClick={onGoogleSignOut}
                  className="text-slate-400 hover:text-rose-600 text-[10px] uppercase tracking-wider font-semibold transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors"
                title="Connect Google Drive to save job applicant files directly"
              >
                <FolderCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Drive Sync</span>
              </button>
            )}

            {/* Quote / Client Proposal Button */}
            <button
              onClick={onOpenQuote}
              className="px-6 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold uppercase tracking-widest rounded-full cursor-pointer transition-colors shadow-md shadow-indigo-950/15 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Client Portal</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenQuote}
              className="bg-indigo-900 text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-indigo-950 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 pt-4 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-bold uppercase tracking-widest ${
                  activeTab === link.id
                    ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600 font-black'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            {currentUser && hasDriveToken ? (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border border-slate-200 text-xs">
                <span className="text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                  <FolderCheck className="w-4 h-4 text-emerald-600" /> Drive Synced
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="bg-indigo-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Applications ({applicantCount})
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoogleSignIn();
                }}
                className="w-full bg-slate-100 text-slate-800 border border-slate-200 p-2.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <FolderCheck className="w-4 h-4 text-indigo-600" />
                Connect Google Drive
              </button>
            )}

            <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
              <span>CEO: <strong className="text-slate-800">{COMPANY_INFO.ceo}</strong></span>
              <a href={COMPANY_INFO.whatsappUrl} className="text-indigo-600 font-bold uppercase tracking-wider text-[11px]">WhatsApp Us</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
