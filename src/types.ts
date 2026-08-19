export interface ServiceItem {
  id: string;
  title: string;
  category: 'bpo' | 'it-solutions' | 'cloud-infra' | 'back-office';
  summary: string;
  description: string;
  highlights: string[];
  iconName: string;
  deliverables: string[];
  sla: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: 'BPO Operations' | 'IT & Software' | 'Customer Support' | 'Data & AI Operations' | 'Quality Assurance' | 'Management';
  location: string;
  workType: 'On-site (Queen Plaza, Lahore)' | 'Hybrid' | 'US Shift (Night)' | 'Rotational';
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Lead';
  salaryRange: string;
  openingsCount: number;
  featured?: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  experienceYears: string;
  expectedSalary: string;
  noticePeriod: string;
  shiftPreference: 'US Night Shift' | 'Day Shift' | 'Flexible Rotational';
  coverLetter: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  resumeBase64?: string;
  appliedAt: string;
  status: 'New' | 'Reviewing' | 'Interview Scheduled' | 'Shortlisted' | 'Offer Sent' | 'Archived';
  googleDrive?: {
    synced: boolean;
    folderId?: string;
    summaryFileId?: string;
    resumeFileId?: string;
    driveWebLink?: string;
    syncedAt?: string;
    error?: string;
  };
  notes?: string;
}

export interface QuoteRequest {
  id: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceCategory: string;
  teamSizeNeeded: string;
  usTimeZonePreference: string;
  projectBudget: string;
  timeline: string;
  requirements: string;
  createdAt: string;
}

export interface ContactInquiry {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
}
