import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import config from './db_config';

console.log('config: ', JSON.stringify(config));
initializeApp(config);
export const db = getFirestore();

export async function createUserData(userData) {
  try {
    await setDoc(doc(db, 'users', userData.email), userData);
  } catch (error) {
    window.alert('error during createUserData: ' + error.message);
  }
}

export async function getUserDataByEmail(email) {
  try {
    const docRef = doc(db, 'users', email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    window.alert('error during getUserDataByEmail: ' + error.message);
    return null;
  }
}
