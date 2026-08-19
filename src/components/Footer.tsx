import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  ArrowUp,
  FolderCheck,
  Briefcase
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface FooterProps {
  onNavigate: (tabId: string) => void;
  onOpenCareers: () => void;
  onOpenAdmin: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenCareers,
  onOpenAdmin,
  onOpenQuote,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Corporate Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-900 rounded-sm flex items-center justify-center transform rotate-45 shadow-sm">
                <div className="w-4 h-4 bg-white transform -rotate-45"></div>
              </div>
              <div className="ml-1">
                <span className="text-xl font-black tracking-tighter text-indigo-950 font-sans">THE PURPEX</span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Enterprise BPO &amp; IT Solutions</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-xs max-w-sm font-light">
              Delivering high-performance customer support teams, custom software engineering pods, and IT infrastructure services synchronized with US business hours.
            </p>

            <div className="p-3.5 bg-slate-50 rounded-md border border-slate-200 space-y-1.5 text-[11px] text-slate-700">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Executive Leadership:</span>
                <span className="text-slate-900 font-bold">{COMPANY_INFO.ceo} (CEO)</span>
              </div>
            </div>
          </div>

          {/* Quick Solutions Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest font-sans">Solutions</h4>
            <ul className="space-y-2 text-slate-500 font-medium">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Customer Support BPO
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  IT Helpdesk &amp; NOC
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Software Engineering Pods
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Back-Office Data Operations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  AI Data Annotation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  QA &amp; Automated Testing
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation & Portals */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest font-sans">Navigation</h4>
            <ul className="space-y-2 text-slate-500 font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('us-delivery')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  US Enterprise Model
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('leadership')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Leadership &amp; CEO
                </button>
              </li>
              <li>
                <button onClick={onOpenCareers} className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-700 font-bold">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Careers &amp; Jobs</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <FolderCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>HR Drive Records</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenQuote} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Client Quote Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Reach */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest font-sans">Direct Inquiries</h4>
            <div className="space-y-2.5 text-slate-700">
              <a 
                href={COMPANY_INFO.whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-emerald-700 transition-colors font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>WhatsApp: {COMPANY_INFO.phoneDisplay}</span>
              </a>
              <a 
                href={`tel:${COMPANY_INFO.phone}`} 
                className="flex items-center gap-2 hover:text-indigo-600 transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Voice: {COMPANY_INFO.phoneDisplay}</span>
              </a>
              <a 
                href={`mailto:${COMPANY_INFO.email}`} 
                className="flex items-center gap-2 hover:text-indigo-600 transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>SOC2 / ISO Aligned</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar matching design reference */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-slate-700">THE PURPEX SOLUTIONS GROUP</strong>. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center space-x-6">
            <span>Queen Plaza, Durand Road Lahore</span>
            <span>•</span>
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-1 text-slate-600 hover:text-indigo-900 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
