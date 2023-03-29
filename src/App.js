import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import LoginPage from './components/LoginPage';
import InnerPage from './components/InnerPage';
import './database.js';
import { loginStatus } from './auth';
import { getUserDataByEmail } from './database';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoaing] = useState(true);

  const getUserData = async () => {
    const storedUser = await loginStatus();
    if (storedUser) {
      const userData = await getUserDataByEmail(storedUser.email);
      if (!userData) return;
      setUserData(userData);
    }
  };

  useEffect(() => {
    getUserData()
      .then(() => setLoaing(false))
      .catch(e => {
        console.log('error during getUserData: ', e);
        setLoaing(false);
      });
  }, []);

  if (userData === null) {
    return loading ? null : <LoginPage />;
  }
  return loading ? null : <InnerPage userData={userData} />;
}
