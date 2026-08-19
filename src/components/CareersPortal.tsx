import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Sparkles, 
  Building2, 
  Coffee, 
  HeartHandshake, 
  GraduationCap, 
  FolderCheck,
  Search,
  Filter
} from 'lucide-react';
import { JOB_OPENINGS, COMPANY_INFO } from '../data/companyData';
import { JobOpening } from '../types';

interface CareersPortalProps {
  onApplyForJob: (job: JobOpening | null) => void;
  onOpenAdmin: () => void;
  applicantCount: number;
}

export const CareersPortal: React.FC<CareersPortalProps> = ({
  onApplyForJob,
  onOpenAdmin,
  applicantCount,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const departments = ['All', 'Customer Support', 'IT & Software', 'BPO Operations', 'Data & AI Operations'];

  const filteredJobs = JOB_OPENINGS.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.requirements.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const perks = [
    {
      icon: <DollarSign className="w-5 h-5 text-indigo-600" />,
      title: 'Top-Tier Market Compensation',
      desc: 'Lucrative base pay, performance bonuses, night shift allowances, and annual appraisal increments.',
    },
    {
      icon: <Coffee className="w-5 h-5 text-indigo-600" />,
      title: 'Corporate Amenities & Dinners',
      desc: 'Subsidized evening dinners, premium coffee/tea lounge, and breakout zones at Queen Plaza Lahore.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-indigo-600" />,
      title: 'Health & OPD Coverage',
      desc: 'Medical outpatient and inpatient health insurance coverage for employees and direct family dependents.',
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      title: 'Continuous Certifications',
      desc: 'Company-sponsored cloud certifications (AWS/Azure), Scrum, and enterprise customer service credentials.',
    },
  ];

  return (
    <section id="careers" className="py-20 bg-[#fdfdfd] text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-12 h-1 bg-indigo-600 mx-auto mb-4" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-indigo-50 border border-indigo-200 text-indigo-800 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            Talent Acquisition &amp; Careers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 font-serif tracking-tight">
            Build Your Career at The Purpex
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-light">
            Join our dynamic team of BPO professionals, software engineers, and IT infrastructure specialists supporting enterprise clients across the United States.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-md text-xs text-slate-700 shadow-2xs">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>Corporate HQ: <strong className="text-slate-900">Office F-310, 3rd Floor, Queen Plaza, Durand Road, Lahore</strong></span>
          </div>
        </div>

        {/* Corporate Culture & Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {perks.map((perk, i) => (
            <div 
              key={i} 
              className="bg-white border border-slate-200 rounded-lg p-5 hover:border-indigo-400 transition-all shadow-2xs group"
            >
              <div className="w-10 h-10 rounded-sm bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                {perk.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-950 font-serif mb-1.5">{perk.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">{perk.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
          
          {/* Department Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-indigo-900 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-indigo-950 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search positions or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-sans"
            />
          </div>

        </div>

        {/* Job Openings Grid */}
        <div className="space-y-4 mb-12">
          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500">
              <p className="text-sm">No openings found matching your filter criteria.</p>
              <button
                onClick={() => onApplyForJob(null)}
                className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-bold uppercase tracking-wider underline"
              >
                Submit a General Application instead
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200 hover:border-indigo-400 rounded-lg p-6 sm:p-7 transition-all hover:shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-sm border border-indigo-200">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-sm">
                      {job.experienceLevel}
                    </span>
                    {job.featured && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        Urgent Hiring
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-950 font-serif">{job.title}</h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {job.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      {job.workType}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      {job.salaryRange}
                    </span>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="flex lg:flex-col items-center justify-end gap-2 shrink-0">
                  <button
                    onClick={() => onApplyForJob(job)}
                    className="w-full sm:w-auto lg:w-44 px-5 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest shadow-md shadow-indigo-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] text-slate-400 hidden lg:block text-center uppercase tracking-tight">
                    Recorded to Google Drive
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* General Application & HR Drive Sync Banner */}
        <div className="bg-indigo-950 text-white border border-indigo-900 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-1.5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">
              <FolderCheck className="w-4 h-4 text-emerald-400" />
              <span>Native Google Drive Application Architecture</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white font-serif">
              Don't see your specific role? Send a General Application
            </h4>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-xl font-light">
              We are constantly scouting top BPO leaders, developers, and QA engineers for upcoming US enterprise projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <button
              onClick={() => onApplyForJob(null)}
              className="px-6 py-3 rounded-full bg-white hover:bg-indigo-50 text-indigo-950 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shadow-md"
            >
              Submit General Resume
            </button>
            <button
              onClick={onOpenAdmin}
              className="px-5 py-3 rounded-full bg-indigo-900 hover:bg-indigo-800 text-indigo-200 border border-indigo-700 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
              title="HR & Hiring Manager portal to review applicant records in Google Drive"
            >
              <FolderCheck className="w-4 h-4 text-emerald-400" />
              <span>HR Drive Records ({applicantCount})</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
