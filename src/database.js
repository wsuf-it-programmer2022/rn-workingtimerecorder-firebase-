import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  limit,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

import config from './db_config';

console.log('config: ', JSON.stringify(config));
// https://docs.expo.dev/guides/using-firebase/#using-expo-with-firestore
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

export async function updateUserState(email, newState) {
  try {
    await updateDoc(doc(db, 'users', email), {
      currentState: newState,
    });
  } catch (_e) {
    window.alert('Error updating user state on remote database');
  }
}

export async function addHistory(email, newState) {
  try {
    await addDoc(collection(db, 'users', email, 'history'), {
      state: newState,
      date: serverTimestamp(),
    });
  } catch (_e) {
    window.alert('Error saving user history on remote database');
  }
}

export async function getHistory(email) {
  try {
    const q = query(collection(db, 'users', email, 'history'), orderBy('date', 'desc'), limit(40));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach(doc => {
      const data = {
        ...doc.data(),
        id: doc.id,
      };
      result.push(data);
    });
    return result;
  } catch (_e) {
    window.alert('Error getting user history from remote database');
    return [];
  }
}
