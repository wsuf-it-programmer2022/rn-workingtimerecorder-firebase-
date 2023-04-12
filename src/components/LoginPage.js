import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  Button,
} from 'react-native';

import { signUp, signIn } from '../auth';
import { createUserData, getUserDataByEmail } from '../database';

export default function LoginPage(props) {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');

  const login = async () => {
    console.log('loggin in: ' + email + ' ' + password);
    const user = await signIn(email, password);
    console.log('logged in: ', user.email);
    const userDataFromFirebase = await getUserDataByEmail(user.email);
    props.setUserData(userDataFromFirebase);
  };

  const register = async () => {
    await signUp(email, password);
    const initialUserData = {
      name: userName,
      email: email.toLowerCase(),
      currentState: 'out',
    };
    // create the user data in the database
    createUserData(initialUserData);
    console.log('initialUserData: ', initialUserData);
    console.log('registered: ' + email + ' ' + password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setIsSignUpActive(false)}
          style={[styles.togglebuttonLeft, !isSignUpActive && styles.active]}>
          <Text style={[styles.toggleButtonText, !isSignUpActive && styles.activeText]}>
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsSignUpActive(true)}
          style={[styles.togglebuttonRight, isSignUpActive && styles.active]}>
          <Text style={[styles.toggleButtonText, isSignUpActive && styles.activeText]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        {isSignUpActive ? (
          <Text style={styles.title}>Sign Up Form</Text>
        ) : (
          <Text style={styles.title}>Sign In Form</Text>
        )}
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        {isSignUpActive && (
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={userName}
            onChangeText={setUserName}
          />
        )}
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        {isSignUpActive && (
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        )}
        {isSignUpActive ? (
          <Button title="Sign Up" onPress={register} />
        ) : (
          <Button title="Sign In" onPress={login} />
        )}
      </View>
    </View>
  );
}

// check if we are running on iOS or on Android:
// import { Platform } from 'react-native';

// if (Platform.OS === 'ios') {
//   // do something
// } else {
//   // do something else
// }

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: 'center',
    // flex: 1 means that the container will take up the entire screen
    flex: 1,
    // stech the container to the entire screen
    alignSelf: 'stretch',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 20 : 25,
  },
  togglebuttonLeft: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  togglebuttonRight: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  active: {
    backgroundColor: '#0851c7',
  },
  activeText: {
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 20,
    color: '#000',
  },
  formContainer: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
});
