import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';

import HistoryPage from './HistoryPage';
import StatusPage from './StatusPage';

const Stack = createNativeStackNavigator();

export default function InnerPage({ userData, setUserData }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Status Page">
          {navigationProps => (
            <StatusPage {...navigationProps} userData={userData} setUserData={setUserData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="History Page">
          {navigationProps => <HistoryPage {...navigationProps} userData={userData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 30,
    marginVertical: 30,
  },
});
