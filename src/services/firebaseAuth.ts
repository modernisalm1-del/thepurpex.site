import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const SCOPES = [
  'https://www.googleapis.com/auth/drive.file'
];

const provider = new GoogleAuthProvider();
SCOPES.forEach(scope => provider.addScope(scope));
provider.setCustomParameters({
  prompt: 'select_account'
});

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google Drive access token.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Google Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Creates or gets the "The Purpex - Job Applications" folder in user's Google Drive
 */
export async function getOrCreatePurpexDriveFolder(accessToken: string): Promise<string> {
  const folderName = 'The Purpex - Job Applications';
  
  // Check if folder exists
  const query = encodeURIComponent(`name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`);
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (searchRes.ok) {
    const searchData = await searchRes.json();
    if (searchData.files && searchData.files.length > 0) {
      return searchData.files[0].id;
    }
  }

  // Create folder if not found
  const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Job applications and candidate resumes submitted to The Purpex',
    }),
  });

  if (!createRes.ok) {
    throw new Error('Failed to create destination folder in Google Drive');
  }

  const folderData = await createRes.json();
  return folderData.id;
}

/**
 * Uploads a candidate application summary and optional resume file to Google Drive
 */
export async function uploadApplicationToGoogleDrive(
  accessToken: string,
  applicationData: {
    applicantName: string;
    email: string;
    phone: string;
    jobTitle: string;
    experienceYears: string;
    expectedSalary: string;
    shiftPreference: string;
    coverLetter: string;
    appliedAt: string;
  },
  resumeFile?: {
    fileName: string;
    mimeType: string;
    base64Data: string;
  } | null
): Promise<{ summaryFileId: string; resumeFileId?: string; folderId: string; driveWebLink?: string }> {
  const folderId = await getOrCreatePurpexDriveFolder(accessToken);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeName = applicationData.applicantName.replace(/[^a-zA-Z0-9_-]/g, '_');

  // 1. Create Application Summary Document (.txt)
  const summaryContent = `=====================================================
THE PURPEX - CANDIDATE JOB APPLICATION RECORD
=====================================================
Position Applied: ${applicationData.jobTitle}
Candidate Name:   ${applicationData.applicantName}
Email:            ${applicationData.email}
Phone/WhatsApp:   ${applicationData.phone}
Experience:       ${applicationData.experienceYears}
Shift Preference: ${applicationData.shiftPreference}
Expected Salary:  ${applicationData.expectedSalary}
Submission Date:  ${applicationData.appliedAt}

-----------------------------------------------------
COVER LETTER / CANDIDATE STATEMENT
-----------------------------------------------------
${applicationData.coverLetter || 'No cover letter provided.'}

=====================================================
Company: The Purpex (BPO & IT Solutions)
Lahore Office: Office no F-310, 3rd Floor, Queen Plaza, Durand Road, Garhi Shahu Lahore
Contact: +923250255076 | CEO: Muhammad Abubakar
=====================================================`;

  // Upload summary file
  const summaryMetadata = {
    name: `Application_${safeName}_${applicationData.jobTitle.replace(/\s+/g, '_')}_${timestamp}.txt`,
    mimeType: 'text/plain',
    parents: [folderId],
    description: `Job application for ${applicationData.applicantName} - ${applicationData.jobTitle}`,
  };

  const summaryBoundary = '-------314159265358979323846';
  const summaryDelimiter = `\r\n--${summaryBoundary}\r\n`;
  const summaryCloseDelim = `\r\n--${summaryBoundary}--`;

  const summaryRequestBody =
    summaryDelimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(summaryMetadata) +
    summaryDelimiter +
    'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
    summaryContent +
    summaryCloseDelim;

  const summaryRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${summaryBoundary}`,
    },
    body: summaryRequestBody,
  });

  if (!summaryRes.ok) {
    const errorText = await summaryRes.text();
    throw new Error(`Google Drive summary upload failed: ${errorText}`);
  }

  const summaryResult = await summaryRes.json();
  let resumeFileId: string | undefined = undefined;

  // 2. Upload Resume if present
  if (resumeFile && resumeFile.base64Data) {
    try {
      const resumeMetadata = {
        name: `Resume_${safeName}_${resumeFile.fileName}`,
        mimeType: resumeFile.mimeType || 'application/octet-stream',
        parents: [folderId],
      };

      // Convert base64 to binary ArrayBuffer
      const base64Clean = resumeFile.base64Data.split(',')[1] || resumeFile.base64Data;
      const byteCharacters = atob(base64Clean);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Create multipart body
      const resumeBoundary = '-------resume314159265358979323846';
      const metaPart = `--${resumeBoundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(resumeMetadata)}\r\n--${resumeBoundary}\r\nContent-Type: ${resumeMetadata.mimeType}\r\nContent-Transfer-Encoding: base64\r\n\r\n${base64Clean}\r\n--${resumeBoundary}--`;

      const resumeRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/related; boundary=${resumeBoundary}`,
        },
        body: metaPart,
      });

      if (resumeRes.ok) {
        const resumeResult = await resumeRes.json();
        resumeFileId = resumeResult.id;
      }
    } catch (err) {
      console.warn('Resume attachment upload warning:', err);
    }
  }

  return {
    summaryFileId: summaryResult.id,
    resumeFileId,
    folderId,
    driveWebLink: summaryResult.webViewLink || `https://drive.google.com/drive/folders/${folderId}`,
  };
}
