import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  Profile,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  SocialLink,
  Testimonial,
} from '../types/portfolio';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific database ID if present
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  socialLinks: SocialLink[];
  testimonials: Testimonial[];
}

const PORTFOLIO_DOC_REF = doc(db, 'portfolio', 'content');

/**
 * Subscribe to real-time portfolio updates from Firebase Firestore.
 */
export function subscribeToPortfolio(onData: (data: PortfolioData) => void, onError?: (err: Error) => void) {
  return onSnapshot(
    PORTFOLIO_DOC_REF,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as PortfolioData;
        onData(data);
      }
    },
    (err) => {
      console.error('Firestore subscription error:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Save complete portfolio data to Firebase Firestore (persist across all devices).
 */
export async function savePortfolioToFirestore(data: PortfolioData): Promise<void> {
  await setDoc(PORTFOLIO_DOC_REF, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Fetch portfolio data once from Firestore
 */
export async function fetchPortfolioFromFirestore(): Promise<PortfolioData | null> {
  try {
    const snapshot = await getDoc(PORTFOLIO_DOC_REF);
    if (snapshot.exists()) {
      return snapshot.data() as PortfolioData;
    }
  } catch (err) {
    console.error('Failed fetching from Firestore:', err);
  }
  return null;
}
