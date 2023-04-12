import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

import { signOutUser } from '../auth';
import { updateUserState, addHistory } from '../database';

export default function StatusPage({ navigation: { navigate }, userData, setUserData }) {
  const handleLogout = async () => {
    await signOutUser();
    setUserData(null);
  };

  const toggleSwitch = () => {
    let newState = '';
    if (userData.currentState === 'in') {
      newState = 'out';
    } else {
      newState = 'in';
    }
    setUserData({ ...userData, currentState: newState });
    updateUserState(userData.email, newState);
    return newState;
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.appTitle}>Hello {userData.name}!</Text>
      <Text style={styles.statusText}>Your current status: {userData.currentState}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={userData.currentState === 'in' ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        value={userData.currentState === 'in'}
        onValueChange={() => {
          const newState = toggleSwitch();
          addHistory(userData.email, newState);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigate('History Page')}>
        <Text style={[styles.buttonText, styles.shadow]}>Visit History Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  logoutSection: {
    alignSelf: 'stretch',
  },
  logoutButton: {
    alignSelf: 'stretch',
  },
  logoutButtonText: {
    marginRight: 'auto',
    fontStyle: 'italic',
    color: 'blue',
  },
  appTitle: {
    fontSize: 30,
    marginVertical: 30,
  },
  statusText: {
    fontSize: 18,
    marginVertical: 15,
  },
  button: {
    margin: 50,
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '7%',
    borderRadius: 20,
    color: 'blue',
    backgroundColor: '#0091ff',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
