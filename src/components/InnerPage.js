import { View, Text, StyleSheet } from 'react-native';

export default function StatusPage({ userData }) {
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Hello {userData.name}!</Text>
    </View>
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
