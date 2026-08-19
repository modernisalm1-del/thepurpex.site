import React, { useState } from 'react';
import { 
  X, 
  FolderCheck, 
  Download, 
  ExternalLink, 
  Search, 
  User, 
  Mail, 
  Phone, 
  Clock, 
  Briefcase, 
  Calendar, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Building2,
  Trash2,
  Filter
} from 'lucide-react';
import { JobApplication } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { uploadApplicationToGoogleDrive, getAccessToken, googleSignIn } from '../services/firebaseAuth';

interface AdminApplicantsModalProps {
  applications: JobApplication[];
  onClose: () => void;
  onUpdateApplication: (app: JobApplication) => void;
  onDeleteApplication: (id: string) => void;
  hasDriveToken: boolean;
  onGoogleSignIn: () => void;
}

export const AdminApplicantsModal: React.FC<AdminApplicantsModalProps> = ({
  applications,
  onClose,
  onUpdateApplication,
  onDeleteApplication,
  hasDriveToken,
  onGoogleSignIn,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const statuses = ['All', 'New', 'Reviewing', 'Interview Scheduled', 'Shortlisted', 'Offer Sent', 'Archived'];

  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleSyncToDrive = async (app: JobApplication) => {
    setSyncingId(app.id);
    setSyncMessage(null);

    try {
      let token = await getAccessToken();
      if (!token) {
        const authRes = await googleSignIn();
        token = authRes?.accessToken || null;
      }

      if (!token) {
        throw new Error('Google Drive access token unavailable. Please sign in.');
      }

      const driveRes = await uploadApplicationToGoogleDrive(
        token,
        {
          applicantName: app.applicantName,
          email: app.email,
          phone: app.phone,
          jobTitle: app.jobTitle,
          experienceYears: app.experienceYears,
          expectedSalary: app.expectedSalary,
          shiftPreference: app.shiftPreference,
          coverLetter: app.coverLetter,
          appliedAt: app.appliedAt,
        },
        app.resumeFileName && app.resumeBase64
          ? {
              fileName: app.resumeFileName,
              mimeType: 'application/pdf',
              base64Data: app.resumeBase64,
            }
          : null
      );

      const updatedApp: JobApplication = {
        ...app,
        googleDrive: {
          synced: true,
          folderId: driveRes.folderId,
          summaryFileId: driveRes.summaryFileId,
          resumeFileId: driveRes.resumeFileId,
          driveWebLink: driveRes.driveWebLink,
          syncedAt: new Date().toISOString(),
        },
      };

      onUpdateApplication(updatedApp);
      if (selectedApp?.id === app.id) {
        setSelectedApp(updatedApp);
      }
      setSyncMessage(`Successfully saved ${app.applicantName}'s application to Google Drive.`);
    } catch (err: any) {
      console.error('Drive sync error:', err);
      setSyncMessage(`Failed to sync to Drive: ${err.message || 'Error occurred'}`);
    } finally {
      setSyncingId(null);
    }
  };

  const handleStatusChange = (app: JobApplication, newStatus: any) => {
    const updated = { ...app, status: newStatus };
    onUpdateApplication(updated);
    if (selectedApp?.id === app.id) {
      setSelectedApp(updated);
    }
  };

  const handleNotesChange = (app: JobApplication, notes: string) => {
    const updated = { ...app, notes };
    onUpdateApplication(updated);
    if (selectedApp?.id === app.id) {
      setSelectedApp(updated);
    }
  };

  const exportApplicationsCSV = () => {
    const headers = ['ID', 'Job Title', 'Applicant Name', 'Email', 'Phone', 'Experience', 'Shift', 'Expected Salary', 'Date', 'Status', 'Drive Synced', 'Drive Link'];
    const rows = applications.map(a => [
      `"${a.id}"`,
      `"${a.jobTitle}"`,
      `"${a.applicantName}"`,
      `"${a.email}"`,
      `"${a.phone}"`,
      `"${a.experienceYears}"`,
      `"${a.shiftPreference}"`,
      `"${a.expectedSalary}"`,
      `"${a.appliedAt}"`,
      `"${a.status}"`,
      `"${a.googleDrive?.synced ? 'Yes' : 'No'}"`,
      `"${a.googleDrive?.driveWebLink || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ThePurpex_Applicants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-lg max-w-5xl w-full my-8 p-6 sm:p-8 shadow-2xl text-slate-900 relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-700 mb-1">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>The Purpex HR Operations Portal</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-950 font-serif">
              Candidate Records &amp; Google Drive Ledger
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-light">
              Review candidate files recorded directly in Google Drive without 3rd-party hosting
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportApplicationsCSV}
              className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sync message banner if any */}
        {syncMessage && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{syncMessage}</span>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-7 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, email, role, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="sm:col-span-5 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-sans"
            >
              {statuses.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Layout: Master-Detail */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[400px]">
          
          {/* Applications List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredApps.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-md text-slate-500 text-xs">
                No job applications recorded yet.
              </div>
            ) : (
              filteredApps.map((app) => {
                const isSelected = selectedApp?.id === app.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`p-3.5 rounded-md border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-500 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-950 font-serif truncate max-w-[180px]">
                        {app.applicantName}
                      </span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                        app.status === 'New' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                        app.status === 'Interview Scheduled' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                        app.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-indigo-700 font-medium truncate mb-1">
                      {app.jobTitle}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>{app.phone}</span>
                      {app.googleDrive?.synced ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1 text-[10px] uppercase">
                          <FolderCheck className="w-3 h-3 text-emerald-600" /> Drive Synced
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px] uppercase">Local Queue</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Application Detail View */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-md p-5 max-h-[500px] overflow-y-auto">
            {selectedApp ? (
              <div className="space-y-5 text-xs text-slate-700">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <h4 className="text-lg font-bold text-slate-950 font-serif">{selectedApp.applicantName}</h4>
                    <p className="text-indigo-700 font-bold">{selectedApp.jobTitle}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Applied: {selectedApp.appliedAt}</p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Status:</span>
                    <select
                      value={selectedApp.status}
                      onChange={(e) => handleStatusChange(selectedApp, e.target.value)}
                      className="bg-white border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                    >
                      {statuses.filter(s => s !== 'All').map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Google Drive Status Bar */}
                <div className="bg-white border border-slate-200 p-3.5 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <FolderCheck className={`w-5 h-5 ${selectedApp.googleDrive?.synced ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-bold text-slate-900">
                        {selectedApp.googleDrive?.synced ? 'Saved to Google Drive' : 'Not Yet Synced to Drive'}
                      </div>
                      <div className="text-[11px] text-slate-500 font-light">
                        {selectedApp.googleDrive?.synced
                          ? `Folder: The Purpex - Job Applications`
                          : 'Click below to push candidate file to Google Drive'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedApp.googleDrive?.driveWebLink && (
                      <a
                        href={selectedApp.googleDrive.driveWebLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-indigo-700 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-slate-200"
                      >
                        <span>Open Drive</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={() => handleSyncToDrive(selectedApp)}
                      disabled={syncingId === selectedApp.id}
                      className="px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${syncingId === selectedApp.id ? 'animate-spin' : ''}`} />
                      <span>{selectedApp.googleDrive?.synced ? 'Re-Sync' : 'Sync to Drive'}</span>
                    </button>
                  </div>
                </div>

                {/* Candidate Overview Grid */}
                <div className="grid grid-cols-2 gap-3 bg-white p-3.5 rounded-md border border-slate-200 shadow-2xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Email</span>
                    <a href={`mailto:${selectedApp.email}`} className="text-indigo-600 hover:underline font-medium">{selectedApp.email}</a>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Phone / WhatsApp</span>
                    <a href={`tel:${selectedApp.phone}`} className="text-slate-900 hover:underline font-medium">{selectedApp.phone}</a>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Experience</span>
                    <span className="text-slate-900 font-medium">{selectedApp.experienceYears}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Shift Availability</span>
                    <span className="text-slate-900 font-medium">{selectedApp.shiftPreference}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Expected Salary</span>
                    <span className="text-emerald-700 font-bold">{selectedApp.expectedSalary}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Notice Period</span>
                    <span className="text-slate-900 font-medium">{selectedApp.noticePeriod}</span>
                  </div>
                </div>

                {/* Cover Letter */}
                {selectedApp.coverLetter && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                      Candidate Statement:
                    </span>
                    <div className="p-3 bg-white rounded-md border border-slate-200 text-slate-700 leading-relaxed text-[11px] font-light">
                      {selectedApp.coverLetter}
                    </div>
                  </div>
                )}

                {/* Resume info */}
                {selectedApp.resumeFileName && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-md border border-slate-200 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-900 font-bold">{selectedApp.resumeFileName}</span>
                      <span className="text-[10px] text-slate-400">({selectedApp.resumeFileSize})</span>
                    </div>
                    {selectedApp.resumeBase64 && (
                      <a
                        href={selectedApp.resumeBase64}
                        download={selectedApp.resumeFileName}
                        className="text-indigo-600 hover:text-indigo-800 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download CV</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Internal Recruiter Notes */}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                    Internal Recruiter / Interview Notes:
                  </span>
                  <textarea
                    rows={3}
                    placeholder="Add interview scheduling dates, technical test score, or CEO interview feedback..."
                    value={selectedApp.notes || ''}
                    onChange={(e) => handleNotesChange(selectedApp, e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-md p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Delete / Archive */}
                <div className="pt-2 flex justify-between items-center border-t border-slate-200">
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to remove candidate record for ${selectedApp.applicantName}?`)) {
                        onDeleteApplication(selectedApp.id);
                        setSelectedApp(null);
                      }
                    }}
                    className="text-rose-600 hover:text-rose-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Candidate Record</span>
                  </button>
                  <span className="text-[10px] text-slate-400 uppercase tracking-tight">HQ: Queen Plaza, Lahore</span>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <User className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-xs">Select a candidate application on the left to review details, Google Drive link, and update interview status.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
