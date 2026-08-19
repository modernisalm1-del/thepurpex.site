import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Globe, 
  Users, 
  CheckCircle2, 
  Briefcase,
  ChevronRight,
  Sparkles,
  Building2,
  FileCheck2
} from 'lucide-react';
import { COMPANY_INFO, CORPORATE_STATS } from '../data/companyData';

interface HeroProps {
  onExploreServices: () => void;
  onOpenCareers: () => void;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onOpenCareers,
  onOpenQuote,
}) => {
  return (
    <section id="home" className="relative bg-[#fdfdfd] text-slate-900 overflow-hidden border-b border-slate-200">
      
      {/* Main Split-Hero Geometric Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
          
          {/* Left Block: Deep Indigo-950 Geometric Anchor */}
          <div className="lg:col-span-6 bg-indigo-950 p-8 sm:p-12 text-white relative flex flex-col justify-between overflow-hidden">
            {/* Ambient geometric blur circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-900 rounded-full blur-3xl opacity-30 -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-800 rounded-full blur-3xl opacity-20 -ml-40 -mb-40 pointer-events-none" />

            <div className="relative z-10">
              {/* Accent horizontal indicator bar */}
              <div className="w-12 h-1 bg-indigo-400 mb-8" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-indigo-900/80 border border-indigo-700/60 text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Global BPO &amp; Enterprise IT
              </div>

              <h1 className="text-4xl sm:text-5xl font-light leading-tight mb-6 tracking-tight font-sans">
                Global BPO &amp;<br />
                <span className="font-bold italic text-indigo-300">IT Solutions</span>
              </h1>

              <p className="text-indigo-200 text-base sm:text-lg max-w-md font-light leading-relaxed mb-8">
                Scalable outsourcing and modern technology infrastructure for American and global enterprises. We bridge operational distance with 24/7 execution from Queen Plaza, Lahore.
              </p>

              {/* CEO Profile Highlight with Monogram */}
              <div className="flex items-center gap-4 bg-white/5 p-5 rounded-lg border border-white/10 backdrop-blur-sm mb-8">
                <div className="w-14 h-14 bg-indigo-800 rounded-full border-2 border-indigo-400 flex items-center justify-center text-xl font-serif italic text-white shadow-inner">
                  MA
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">Chief Executive Officer</p>
                  <p className="text-lg font-semibold text-white font-serif">{COMPANY_INFO.ceo}</p>
                  <p className="text-[11px] text-indigo-200">The Purpex Solutions Group</p>
                </div>
              </div>
            </div>

            {/* Geometric Grid Footer Metrics */}
            <div className="relative z-10 text-[10px] font-mono text-indigo-300 grid grid-cols-2 gap-4 uppercase pt-6 border-t border-indigo-900">
              <div className="border-l-2 border-indigo-600 pl-3">
                <p className="text-white font-bold mb-0.5">24/7 Operations</p>
                <p className="text-indigo-400">EST / CST / PST Sync</p>
              </div>
              <div className="border-l-2 border-indigo-600 pl-3">
                <p className="text-white font-bold mb-0.5">Google Drive Ledger</p>
                <p className="text-indigo-400">Direct Candidate Intake</p>
              </div>
            </div>
          </div>

          {/* Right Block: Crisp Slate-50 Geometric Command Area */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-slate-50">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Corporate Capabilities</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 uppercase tracking-wider">Engineered for US Business Hours</p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-sm border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified SLA</span>
                </div>
              </div>

              {/* 4 Geometric Metric Tiles */}
              <div className="grid grid-cols-2 gap-3.5 mb-6">
                {CORPORATE_STATS.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-slate-200 p-4 rounded-md shadow-2xs hover:border-indigo-300 transition-colors"
                  >
                    <div className="text-2xl font-black text-indigo-950 font-serif mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1">
                      {stat.label}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Service scope checklist */}
              <div className="space-y-2 mb-8 bg-white p-4 rounded-md border border-slate-200 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">Customer Experience &amp; Inbound Voice BPO</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">Dedicated Software Development &amp; QA Pods</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">Back-Office, Data Annotation &amp; IT Helpdesk</span>
                </div>
              </div>
            </div>

            {/* Geometric Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-md uppercase tracking-[0.15em] text-xs transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Custom Team Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onOpenCareers}
                  className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold py-3 px-4 rounded-md uppercase tracking-wider text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Careers Portal</span>
                </button>

                <button
                  onClick={onExploreServices}
                  className="bg-slate-200/80 hover:bg-slate-300/80 text-slate-800 font-bold py-3 px-4 rounded-md uppercase tracking-wider text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>All Solutions</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>

              <p className="text-center text-[10px] text-slate-400 uppercase tracking-tight">
                * All job submissions recorded directly to Google Drive without 3rd party integration
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
