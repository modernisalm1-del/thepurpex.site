import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Building2, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO, FAQS } from '../data/companyData';
import { ContactInquiry } from '../types';

export const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [positionOrSubject, setPositionOrSubject] = useState('');
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'whatsapp'>('whatsapp');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello The Purpex & CEO Muhammad Abubakar,\nI would like to speak regarding BPO / IT services.\nName: ${fullName || 'Client'}\nEmail: ${email || 'Not provided'}\nPosition / Subject Required: ${positionOrSubject || 'General inquiry'}\nQuery: ${message || 'Project inquiry'}`
    );
    window.open(`https://wa.me/923250255076?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-[#fdfdfd] text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-12 h-1 bg-indigo-600 mx-auto mb-4" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-indigo-50 border border-indigo-200 text-indigo-800 text-[10px] font-bold uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
            Global Communications Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 font-serif tracking-tight">
            Connect With The Purpex
          </h2>
          <p className="mt-3 text-base text-slate-600 font-light">
            Direct inquiry to CEO Muhammad Abubakar (<a href={`mailto:${COMPANY_INFO.email}`} className="text-indigo-600 font-semibold hover:underline">{COMPANY_INFO.email}</a>), schedule a consultation, or start an instant conversation via WhatsApp.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Direct Info & HQ Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-md">
              <div>
                <h3 className="text-xl font-bold text-slate-950 font-serif mb-1">
                  Headquarters &amp; Direct Reach
                </h3>
                <p className="text-xs text-slate-500">
                  Leadership: <strong className="text-slate-900">{COMPANY_INFO.ceo}</strong> (Chief Executive Officer)
                </p>
              </div>

              {/* Verified Contact Details */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                
                {/* Direct Email - Prominently Displayed */}
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Direct%20Inquiry%20to%20The%20Purpex`}
                  className="flex items-start gap-3 p-3.5 bg-indigo-50/80 hover:bg-indigo-100/90 rounded-md border border-indigo-200 transition-colors group"
                >
                  <div className="p-2 rounded-sm bg-indigo-600 text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-indigo-900 block text-[10px] uppercase tracking-wider mb-0.5">
                      Direct Inquiry Email
                    </span>
                    <p className="text-indigo-950 font-bold text-xs">
                      {COMPANY_INFO.email}
                    </p>
                    <span className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1 mt-0.5">
                      <span>Click to email directly</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-md border border-slate-200">
                  <div className="p-2 rounded-sm bg-slate-200 text-slate-800 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-[10px] uppercase tracking-wider mb-0.5">Corporate HQ Address</span>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3.5 bg-emerald-50 hover:bg-emerald-100/80 rounded-md border border-emerald-200 transition-colors group"
                >
                  <div className="p-2 rounded-sm bg-emerald-600 text-white shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-emerald-900 block text-[10px] uppercase tracking-wider mb-0.5">WhatsApp Instant Support</span>
                    <p className="text-emerald-950 font-bold text-xs">
                      {COMPANY_INFO.phoneDisplay}
                    </p>
                    <span className="text-[11px] text-emerald-700 font-semibold">Click to chat directly &rarr;</span>
                  </div>
                </a>

                {/* Direct Call */}
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-start gap-3 p-3.5 bg-slate-50 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors group"
                >
                  <div className="p-2 rounded-sm bg-indigo-950 text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-[10px] uppercase tracking-wider mb-0.5">Direct Voice Line</span>
                    <p className="text-slate-900 font-bold text-xs">
                      {COMPANY_INFO.phoneDisplay}
                    </p>
                    <span className="text-[11px] text-slate-500">Available 24/7 during US &amp; PK hours</span>
                  </div>
                </a>

                {/* Operating Hours */}
                <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-md border border-slate-200">
                  <div className="p-2 rounded-sm bg-amber-100 text-amber-900 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-[10px] uppercase tracking-wider mb-0.5">Operating Model</span>
                    <p className="text-slate-600 text-xs">
                      {COMPANY_INFO.businessHours}
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-md">
              
              {submitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-14 h-14 bg-emerald-50 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 font-serif">Message Dispatched!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-light">
                    Thank you, <strong className="text-slate-900 font-semibold">{fullName}</strong>. Our enterprise team and CEO Muhammad Abubakar (<span className="text-indigo-600 font-medium">{COMPANY_INFO.email}</span>) will reach out via <strong className="text-indigo-600">{preferredContact}</strong> shortly.
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Continue on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950 font-serif mb-1">
                      Send an Enterprise Inquiry
                    </h3>
                    <p className="text-xs text-slate-500 font-light">
                      Submit your operational requirements or email directly to <a href={`mailto:${COMPANY_INFO.email}`} className="text-indigo-600 font-bold hover:underline">{COMPANY_INFO.email}</a>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
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
                        placeholder="+92 325 0255076"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Global Enterprises LLC"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Position Required / Inquiry Subject - User-fillable text input without dropdown */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Position Required / Inquiry Topic <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Customer Support Executive (US Night Shift), Senior Software Engineer, IT Systems Admin, Back-Office Operations..."
                      value={positionOrSubject}
                      onChange={(e) => setPositionOrSubject(e.target.value)}
                      className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Message / Project Scope <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Outline your team size requirements, preferred timeline, technical stack, or questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400 resize-none"
                    />
                  </div>

                  {/* Preferred contact mode */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Preferred Communication Mode
                    </label>
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="preferred"
                          checked={preferredContact === 'whatsapp'}
                          onChange={() => setPreferredContact('whatsapp')}
                          className="accent-indigo-600"
                        />
                        <span>WhatsApp (+92 325 0255076)</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="preferred"
                          checked={preferredContact === 'email'}
                          onChange={() => setPreferredContact('email')}
                          className="accent-indigo-600"
                        />
                        <span>Email ({COMPANY_INFO.email})</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="preferred"
                          checked={preferredContact === 'phone'}
                          onChange={() => setPreferredContact('phone')}
                          className="accent-indigo-600"
                        />
                        <span>Direct Voice Call</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto px-5 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chat on WhatsApp Instantly</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-[0.15em] shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Corporate Inquiry</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Corporate FAQ Accordion */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-950 font-serif text-center mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-white border border-slate-200 rounded-md overflow-hidden transition-colors shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50 font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
