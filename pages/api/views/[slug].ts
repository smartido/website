import { db } from '../../../lib/firebase';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query?.slug as string;

  if (!slug) {
    return res.status(400).json({ message: 'Slug is required' });
  }

  const docRef = doc(db, "posts", slug);
  const docSnap = await getDoc(docRef);
  
  if (req.method === 'POST') {
    if (docSnap.exists()) {
      await updateDoc(docRef, { count: increment(1) });
      return res.status(200).json({ count: docSnap.data().count });
    } else {
      return res.status(400).json({ message: 'Unknown document' });
    }
  }
 
  if (req.method === 'GET') {
    if (docSnap.exists()) {
      return res.status(200).json({ count: docSnap.data().count });
    } else {
      return res.status(400).json({ message: 'Unknown document' });
    }
  }
}