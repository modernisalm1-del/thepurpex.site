import React from 'react';
import { 
  Building2, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Shield, 
  Sparkles, 
  Quote
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface CeoMessageProps {
  onContactClick: () => void;
}

export const CeoMessage: React.FC<CeoMessageProps> = ({ onContactClick }) => {
  return (
    <section id="leadership" className="py-20 bg-[#fdfdfd] text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-12 h-1 bg-indigo-600 mx-auto mb-4" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-indigo-50 border border-indigo-200 text-indigo-800 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            Executive Leadership &amp; Corporate Vision
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 font-serif tracking-tight">
            Message from the Chief Executive Officer
          </h2>
          <p className="mt-3 text-base text-slate-600 font-light">
            Fostering global operational excellence, client security, and dedicated engineering discipline from our Lahore headquarters.
          </p>
        </div>

        {/* CEO Profile & Corporate Message Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-12 shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: CEO Spotlight Profile Block */}
            <div className="lg:col-span-5 flex flex-col items-center text-center lg:text-left lg:items-start space-y-6">
              
              {/* Geometric Monogram Avatar */}
              <div className="relative">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-indigo-950 border-4 border-indigo-400 flex flex-col items-center justify-center shadow-lg text-white">
                  <span className="text-4xl font-serif italic text-white font-bold">MA</span>
                  <span className="text-[9px] uppercase tracking-widest text-indigo-300 mt-1 font-mono">CEO</span>
                </div>
                <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 font-serif">
                  {COMPANY_INFO.ceo}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mt-1">
                  Chief Executive Officer &amp; Founder
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  The Purpex — BPO &amp; Enterprise IT Solutions
                </p>
              </div>

              {/* Verified Contact Details card */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-md p-4 space-y-2.5 text-xs text-slate-700 text-left">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="leading-snug text-slate-600 font-medium">{COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-indigo-950 font-semibold transition-colors">
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 font-semibold text-emerald-800 transition-colors">
                    WhatsApp Direct: {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}?subject=Direct%20Inquiry%20to%20CEO%20Muhammad%20Abubakar`} className="hover:text-indigo-600 font-semibold text-slate-900 transition-colors">
                    Direct Inquiry: {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Message Content */}
            <div className="lg:col-span-7 space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              <div className="text-indigo-600 opacity-60">
                <Quote className="w-10 h-10 -mb-2" />
              </div>

              <p className="text-slate-900 font-medium italic text-base sm:text-lg font-serif">
                "At The Purpex, our commitment is straightforward: we bridge global enterprises with world-class operational capability, technical excellence, and unmatched integrity."
              </p>

              <p>
                "When US businesses partner with us, they are not simply outsourcing tasks—they are embedding an agile, highly disciplined extension of their core team. Operating from our central facility at Queen Plaza, Durand Road, Lahore, our staff work synchronized shifts under strict quality protocols, rigorous data security guidelines, and transparent communication frameworks."
              </p>

              <p>
                "Whether you require high-touch customer experience specialists, dedicated cloud and software engineering pods, or accurate back-office workflow processing, The Purpex is built to scale with your strategic vision."
              </p>

              {/* Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-md border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">Zero Compromise on SLA</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-md border border-slate-200">
                  <Shield className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">Strict IP &amp; Non-Disclosure Protocols</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-md border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">24/7/365 US Time Zone Synchrony</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-md border border-slate-200">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">Direct Executive Oversight</span>
                </div>
              </div>

              {/* Direct CEO Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onContactClick}
                  className="px-6 py-3.5 rounded-full bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold uppercase tracking-widest shadow-md transition-colors cursor-pointer"
                >
                  Schedule Discussion with CEO
                </button>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
