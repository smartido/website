import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import type { FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db };
