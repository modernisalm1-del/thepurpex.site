import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  FolderCheck, 
  AlertCircle, 
  Loader2, 
  Send, 
  Building2, 
  User as UserIcon, 
  Mail, 
  Phone, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Sparkles,
  ExternalLink,
  Download
} from 'lucide-react';
import { JobOpening, JobApplication } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { googleSignIn, getAccessToken, uploadApplicationToGoogleDrive } from '../services/firebaseAuth';
import confetti from 'canvas-confetti';
import { User } from 'firebase/auth';

interface JobApplicationModalProps {
  job: JobOpening | null;
  onClose: () => void;
  onApplicationSubmitted: (app: JobApplication) => void;
  currentUser: User | null;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  onClose,
  onApplicationSubmitted,
  currentUser,
}) => {
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [positionTitle, setPositionTitle] = useState(job?.title || 'Customer Support Executive (US Night Shift)');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [experienceYears, setExperienceYears] = useState('1-2 Years');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('Immediate (within 1 week)');
  const [shiftPreference, setShiftPreference] = useState<'US Night Shift' | 'Day Shift' | 'Flexible Rotational'>(
    job?.workType.includes('Night') ? 'US Night Shift' : 'US Night Shift'
  );
  const [coverLetter, setCoverLetter] = useState('');

  // Resume File State
  const [resumeFile, setResumeFile] = useState<{
    fileName: string;
    fileSize: string;
    mimeType: string;
    base64Data: string;
  } | null>(null);

  // Status & Drive Sync State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgressStep, setUploadProgressStep] = useState<string>('');
  const [submissionSuccess, setSubmissionSuccess] = useState<JobApplication | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit. Please upload a smaller PDF or DOCX resume.');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setResumeFile({
        fileName: file.name,
        fileSize: sizeFormatted,
        mimeType: file.type || 'application/pdf',
        base64Data: base64,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please fill in all mandatory contact information.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setUploadProgressStep('Preparing candidate application payload...');

    const newAppId = 'app-' + Date.now();
    const appliedTimestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const applicationSummary = {
      applicantName,
      email,
      phone,
      jobTitle: positionTitle.trim() || (job ? job.title : 'General Application (BPO / IT Solutions)'),
      experienceYears,
      expectedSalary: expectedSalary || 'Negotiable (as per company standard)',
      shiftPreference,
      coverLetter,
      appliedAt: appliedTimestamp,
    };

    let driveRecord: {
      synced: boolean;
      folderId?: string;
      summaryFileId?: string;
      resumeFileId?: string;
      driveWebLink?: string;
      syncedAt?: string;
      error?: string;
    } = { synced: false };

    try {
      setUploadProgressStep('Verifying Google Drive authorization...');
      let token = await getAccessToken();

      // If no token cached, prompt Google Sign-in to sync to Google Drive
      if (!token) {
        setUploadProgressStep('Requesting Google Drive permission to save application...');
        const authRes = await googleSignIn();
        token = authRes?.accessToken || null;
      }

      if (token) {
        setUploadProgressStep('Creating candidate folder & uploading to Google Drive...');
        const driveResult = await uploadApplicationToGoogleDrive(
          token,
          applicationSummary,
          resumeFile
            ? {
                fileName: resumeFile.fileName,
                mimeType: resumeFile.mimeType,
                base64Data: resumeFile.base64Data,
              }
            : null
        );

        driveRecord = {
          synced: true,
          folderId: driveResult.folderId,
          summaryFileId: driveResult.summaryFileId,
          resumeFileId: driveResult.resumeFileId,
          driveWebLink: driveResult.driveWebLink,
          syncedAt: new Date().toISOString(),
        };
      }
    } catch (err: any) {
      console.warn('Google Drive direct upload warning:', err);
      driveRecord = {
        synced: false,
        error: err.message || 'Drive sync skipped; stored locally in Purpex HR queue',
      };
    }

    const completedApplication: JobApplication = {
      id: newAppId,
      jobId: job ? job.id : 'general',
      jobTitle: positionTitle.trim() || (job ? job.title : 'General Application (BPO / IT)'),
      applicantName,
      email,
      phone,
      linkedinUrl,
      portfolioUrl,
      experienceYears,
      expectedSalary: expectedSalary || 'Competitive',
      noticePeriod,
      shiftPreference,
      coverLetter,
      resumeFileName: resumeFile?.fileName,
      resumeFileSize: resumeFile?.fileSize,
      resumeBase64: resumeFile?.base64Data,
      appliedAt: appliedTimestamp,
      status: 'New',
      googleDrive: driveRecord,
    };

    onApplicationSubmitted(completedApplication);
    setSubmissionSuccess(completedApplication);
    setIsSubmitting(false);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (_) {}
  };

  const downloadApplicationReceipt = () => {
    if (!submissionSuccess) return;
    const content = `THE PURPEX - OFFICIAL JOB APPLICATION RECEIPT
=====================================================
Application ID: ${submissionSuccess.id}
Job Title:      ${submissionSuccess.jobTitle}
Candidate:      ${submissionSuccess.applicantName}
Email:          ${submissionSuccess.email}
Phone:          ${submissionSuccess.phone}
Experience:     ${submissionSuccess.experienceYears}
Shift:          ${submissionSuccess.shiftPreference}
Date Submitted: ${submissionSuccess.appliedAt}
Google Drive Synced: ${submissionSuccess.googleDrive?.synced ? 'YES (Recorded directly to Drive)' : 'Pending'}
${submissionSuccess.googleDrive?.driveWebLink ? `Drive Link: ${submissionSuccess.googleDrive.driveWebLink}` : ''}

Office Address: ${COMPANY_INFO.address}
Contact: ${COMPANY_INFO.phone} | CEO: ${COMPANY_INFO.ceo}
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ThePurpex_Application_${submissionSuccess.applicantName.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-lg max-w-4xl w-full my-8 shadow-2xl text-slate-900 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer z-20"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Confirmation View */}
        {submissionSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 font-serif">
                Application Successfully Submitted!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto font-light">
                Thank you, <strong className="text-slate-900 font-semibold">{submissionSuccess.applicantName}</strong>. Your candidate file for <strong className="text-indigo-600">{submissionSuccess.jobTitle}</strong> has been processed.
              </p>
            </div>

            {/* Google Drive Status Banner */}
            <div className="max-w-xl mx-auto bg-slate-50 border border-slate-200 rounded-md p-5 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-slate-900">Google Drive Storage Record</span>
                </div>
                {submissionSuccess.googleDrive?.synced ? (
                  <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-sm">
                    Recorded to Drive
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase bg-indigo-100 text-indigo-800 border border-indigo-300 px-2.5 py-0.5 rounded-sm">
                    Stored in HR Queue
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-light">
                {submissionSuccess.googleDrive?.synced
                  ? 'All application details and candidate records have been saved directly to the authorized Google Drive folder "The Purpex - Job Applications" with zero 3rd-party intermediaries.'
                  : 'Your submission is queued in the local applicant database. You can connect Google Drive anytime from the HR Portal to batch-sync.'}
              </p>

              {submissionSuccess.googleDrive?.driveWebLink && (
                <a
                  href={submissionSuccess.googleDrive.driveWebLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-bold uppercase tracking-wider pt-1"
                >
                  <span>Open Folder in Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Next Steps & Lahore Office Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-md p-4 max-w-xl mx-auto text-xs text-slate-600 text-left space-y-1.5 font-light">
              <div className="text-slate-900 font-bold uppercase text-[10px] tracking-wider mb-1">Recruitment Timeline &amp; Office:</div>
              <p>• Initial screening and candidate interview calls will be initiated within 48-72 hours.</p>
              <p>• In-person / technical interviews are conducted at <strong>Office F-310, Queen Plaza, Durand Road Lahore</strong>.</p>
              <p>• For urgent inquiries, contact HR via WhatsApp at <strong className="text-emerald-700 font-semibold">+92 325 0255076</strong>.</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={downloadApplicationReceipt}
                className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Receipt (.txt)</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest shadow-md transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Content with Geometric split */
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            
            {/* Left Branding Column */}
            <div className="lg:col-span-4 bg-indigo-950 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-20 pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center transform rotate-45">
                    <div className="w-3 h-3 bg-indigo-950 transform -rotate-45"></div>
                  </div>
                  <div>
                    <span className="text-lg font-black tracking-tight text-white font-sans">THE PURPEX</span>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-300">Talent Acquisition</p>
                  </div>
                </div>

                <div className="w-12 h-1 bg-indigo-400" />

                <div>
                  <h4 className="text-xl font-bold font-serif text-white mb-2">
                    {job ? job.title : 'General Application'}
                  </h4>
                  <div className="inline-block px-2.5 py-1 rounded-sm bg-indigo-900 border border-indigo-700 text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
                    {job ? job.department : 'Enterprise BPO & IT'}
                  </div>
                </div>

                {job && (
                  <div className="space-y-2 text-xs text-indigo-200 font-light">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{job.workType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{job.salaryRange}</span>
                    </div>
                  </div>
                )}

                {/* Google Drive Notice */}
                <div className="bg-indigo-900/60 border border-indigo-700/80 rounded-md p-3.5 text-xs text-indigo-200 space-y-1 font-light">
                  <div className="flex items-center gap-1.5 font-bold text-white text-[10px] uppercase tracking-wider">
                    <FolderCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Direct Google Drive Storage</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Your candidate profile is recorded directly to our central Google Drive directory without 3rd-party intermediaries.
                  </p>
                </div>
              </div>

              {/* CEO verified badge */}
              <div className="pt-6 border-t border-indigo-900 relative z-10 text-[11px] text-indigo-300">
                <span>Executive Oversight: </span>
                <strong className="text-white">{COMPANY_INFO.ceo}</strong>
              </div>
            </div>

            {/* Right Form Fields */}
            <div className="lg:col-span-8 p-6 sm:p-8 bg-[#fdfdfd] overflow-y-auto max-h-[80vh]">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                  <h3 className="text-xl font-bold text-slate-950 font-serif mb-1">
                    Candidate Profile &amp; Submission
                  </h3>
                  <p className="text-xs text-slate-500 font-light">
                    Please provide your contact information, shift availability, and resume file.
                  </p>
                </div>

                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-200 rounded-md p-3 flex items-center gap-2 text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Position Applied For - User Fillable */}
                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Position / Role Applied For <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Customer Support Executive (US Night Shift), Full Stack React/Node Engineer, IT Support..."
                      value={positionTitle}
                      onChange={(e) => setPositionTitle(e.target.value)}
                      className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  {/* Full Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zain Ali"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  {/* Experience */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Relevant Experience
                    </label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900"
                    >
                      <option value="Fresh / Entry-Level (< 1 year)">Fresh / Entry-Level (&lt; 1 year)</option>
                      <option value="1-2 Years">1 - 2 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5+ Years (Senior / Lead)">5+ Years (Senior / Lead)</option>
                    </select>
                  </div>

                  {/* Shift */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Shift Availability
                    </label>
                    <select
                      value={shiftPreference}
                      onChange={(e: any) => setShiftPreference(e.target.value)}
                      className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900"
                    >
                      <option value="US Night Shift">US Night Shift (8:00 PM - 5:00 AM)</option>
                      <option value="Day Shift">Day Shift (Lahore Standard)</option>
                      <option value="Flexible Rotational">Flexible Rotational Shift</option>
                    </select>
                  </div>

                  {/* Salary */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Expected Salary (PKR / Month)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 120,000 PKR"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  {/* LinkedIn / Portfolio */}
                  <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        LinkedIn Profile (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Notice Period
                      </label>
                      <select
                        value={noticePeriod}
                        onChange={(e) => setNoticePeriod(e.target.value)}
                        className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900"
                      >
                        <option value="Immediate (within 1 week)">Immediate (within 1 week)</option>
                        <option value="2 Weeks Notice">2 Weeks Notice</option>
                        <option value="1 Month Notice">1 Month Notice</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Resume File Upload */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Attach Resume / CV (PDF, DOCX, TXT)
                  </label>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                  />

                  {resumeFile ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-md p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-sm bg-indigo-100 text-indigo-900 flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 truncate max-w-xs">{resumeFile.fileName}</p>
                          <p className="text-[10px] text-slate-500">{resumeFile.fileSize}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-bold uppercase tracking-wider px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-md p-5 text-center cursor-pointer transition-colors bg-slate-50/50"
                    >
                      <Upload className="w-6 h-6 text-indigo-600 mx-auto mb-1.5" />
                      <p className="text-xs font-bold text-slate-800">
                        Click to select resume file or drag &amp; drop
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Max size: 10MB • PDF, DOCX, or TXT
                      </p>
                    </div>
                  )}
                </div>

                {/* Cover Letter */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Brief Introduction / Cover Note
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Share your strengths, relevant BPO or IT experience..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="bg-white border border-slate-200 p-3 rounded-md focus:outline-none focus:border-indigo-500 text-sm text-slate-900 placeholder-slate-400 resize-none"
                  />
                </div>

                {/* Submit Actions */}
                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[10px] text-slate-400 text-center sm:text-left">
                    <span>Interview scheduling at Queen Plaza, Lahore.</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-xs font-bold uppercase tracking-[0.15em] shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>{uploadProgressStep || 'Recording to Drive...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit &amp; Record to Drive</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
