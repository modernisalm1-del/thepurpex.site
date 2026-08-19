import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  Send, 
  DollarSign, 
  Clock, 
  Users, 
  Layers, 
  MessageSquare, 
  ArrowRight, 
  TrendingDown,
  Mail
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { QuoteRequest } from '../types';

interface QuoteModalProps {
  initialService?: string;
  onClose: () => void;
  onQuoteSubmitted: (quote: QuoteRequest) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  initialService,
  onClose,
  onQuoteSubmitted,
}) => {
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [positionOrServiceRequired, setPositionOrServiceRequired] = useState(initialService || '');
  const [teamSizeNeeded, setTeamSizeNeeded] = useState('3-5 Dedicated Specialists');
  const [usTimeZonePreference, setUsTimeZonePreference] = useState('US Eastern Time (EST)');
  const [timeline, setTimeline] = useState('Within 1-2 Weeks (Immediate Ramp-up)');
  const [requirements, setRequirements] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Estimation calculation
  const getApproxSeats = () => {
    if (teamSizeNeeded.includes('1-2')) return 2;
    if (teamSizeNeeded.includes('3-5')) return 4;
    if (teamSizeNeeded.includes('6-10')) return 8;
    return 15;
  };

  const seats = getApproxSeats();
  const estimatedUsCost = seats * 7500; // $7,500/mo US domestic per seat
  const estimatedPurpexCost = seats * 2600; // $2,600/mo Purpex all-inclusive
  const estimatedMonthlySavings = estimatedUsCost - estimatedPurpexCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuote: QuoteRequest = {
      id: 'quote-' + Date.now(),
      clientName,
      companyName,
      email,
      phone,
      serviceCategory: positionOrServiceRequired || 'Custom Enterprise Pod',
      teamSizeNeeded,
      usTimeZonePreference,
      projectBudget: `$${estimatedPurpexCost}/month (estimated)`,
      timeline,
      requirements,
      createdAt: new Date().toISOString(),
    };

    onQuoteSubmitted(newQuote);
    setSubmitted(true);
  };

  const openWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello CEO Muhammad Abubakar & The Purpex Team,\n\nI am requesting a BPO / IT solutions proposal for ${companyName || 'our company'}.\n- Position / Solution: ${positionOrServiceRequired || 'General Pod'}\n- Team Size: ${teamSizeNeeded}\n- Time Zone: ${usTimeZonePreference}\n- Contact: ${clientName} (${email}, ${phone})\n\nPlease provide full SLA and pricing sheet.`
    );
    window.open(`https://wa.me/923250255076?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-lg max-w-2xl w-full my-8 p-6 sm:p-8 shadow-2xl text-slate-900 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-950 font-serif">
                Proposal Request Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-light">
                Thank you, <strong className="text-slate-900 font-semibold">{clientName}</strong>. Our enterprise solutions director and CEO Muhammad Abubakar (<span className="text-indigo-600 font-semibold">{COMPANY_INFO.email}</span>) will prepare a tailored SLA breakdown for <strong className="text-indigo-600 font-semibold">{companyName || 'your enterprise'}</strong> within 4 business hours.
              </p>
            </div>

            {/* Quick summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-md p-5 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Position / Solution:</span>
                <span className="text-slate-900 font-bold">{positionOrServiceRequired || 'Custom Pod'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Team Size:</span>
                <span className="text-slate-900 font-bold">{teamSizeNeeded}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Time-Zone Coverage:</span>
                <span className="text-slate-900 font-bold">{usTimeZonePreference}</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-bold pt-1">
                <span>Estimated Monthly Savings:</span>
                <span>~${estimatedMonthlySavings.toLocaleString()} / mo</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={openWhatsAppInquiry}
                className="px-5 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Instant WhatsApp Connect (+92 325 0255076)</span>
              </button>
              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Enterprise%20Proposal%20Inquiry%20-%20${encodeURIComponent(companyName || 'Our Company')}`}
                className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>Email {COMPANY_INFO.email}</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Title */}
            <div>
              <div className="w-10 h-1 bg-indigo-600 mb-3" />
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-700 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Team &amp; Service Calculator</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-950 font-serif">
                Request a Tailored Enterprise Quote
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-light">
                Design your dedicated offshore operations pod. Direct inquiries can also be sent to <a href={`mailto:${COMPANY_INFO.email}`} className="text-indigo-600 font-bold hover:underline">{COMPANY_INFO.email}</a>.
              </p>
            </div>

            {/* Savings Estimate Box */}
            <div className="bg-indigo-950 text-white border border-indigo-900 rounded-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[9px] text-indigo-300 uppercase font-bold tracking-widest block">
                  Estimated Operational Cost Reduction
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white font-serif">
                  ~${estimatedMonthlySavings.toLocaleString()} <span className="text-xs font-light text-indigo-200">/ month saved</span>
                </span>
              </div>
              <div className="text-right text-[10px] font-bold uppercase tracking-wider text-indigo-200 bg-indigo-900/90 px-3 py-1.5 rounded-sm border border-indigo-700">
                <span>Based on {teamSizeNeeded}</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Miller"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Company / Organization <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Health Systems Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Work Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="david@apexhealth.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Phone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                />
              </div>

              {/* Position / Role Required - Open text input without dropdown */}
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Position / Role Required <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BPO Customer Support Executive, Senior React/Node Developer, Tier-2 IT NOC Specialist, Data Processing Analyst..."
                  value={positionOrServiceRequired}
                  onChange={(e) => setPositionOrServiceRequired(e.target.value)}
                  className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                />
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Quick Fill:</span>
                  {[
                    'Customer Experience BPO (24/7)',
                    'Full-Stack Software Pod',
                    'IT Helpdesk & NOC',
                    'Back-Office Data Operations'
                  ].map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPositionOrServiceRequired(sug)}
                      className="text-[10px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 px-2 py-0.5 rounded-sm border border-slate-200 transition-colors"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Dedicated Pod Capacity
                </label>
                <select
                  value={teamSizeNeeded}
                  onChange={(e) => setTeamSizeNeeded(e.target.value)}
                  className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900"
                >
                  <option value="1-2 Dedicated Specialists">1 - 2 Dedicated Specialists</option>
                  <option value="3-5 Dedicated Specialists">3 - 5 Dedicated Specialists</option>
                  <option value="6-10 Enterprise Pod">6 - 10 Enterprise Pod</option>
                  <option value="10+ Scaled Division">10+ Scaled Operational Division</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  US Time-Zone Schedule
                </label>
                <select
                  value={usTimeZonePreference}
                  onChange={(e) => setUsTimeZonePreference(e.target.value)}
                  className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900"
                >
                  <option value="US Eastern Time (EST)">US Eastern Time (EST)</option>
                  <option value="US Central Time (CST)">US Central Time (CST)</option>
                  <option value="US Pacific Time (PST)">US Pacific Time (PST)</option>
                  <option value="24/7/365 Continuous Coverage">24/7/365 Continuous Coverage</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Specific Project Requirements / Tooling
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Inbound voice support on Zendesk, tier-1 software QA for mobile app, or data entry into custom ERP..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400 resize-none"
                />
              </div>

            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[10px] text-slate-400">
                <span>Direct inquiries: <strong className="text-indigo-700 font-semibold">{COMPANY_INFO.email}</strong></span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-[0.15em] shadow-md shadow-indigo-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Quote Request</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
