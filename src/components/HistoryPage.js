import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { getHistory } from '../database.js';

export default function HistoryPage({ userData }) {
  const [history, setHistory] = useState([]);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.historyItemContainer,
        styles.shadow,
        item.state === 'in' ? styles.containerIn : styles.containerOut,
      ]}>
      <View style={styles.historyTextContainer}>
        <Text style={styles.currentStateText}>{item.date.toDate().toLocaleString('fa-IR')}</Text>
        <Text style={styles.currentStateText}>{item.state}</Text>
      </View>
    </View>
  );

  useEffect(() => {
    getHistory(userData.email).then(setHistory);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList data={history} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'stretch',
  },
  historyItemContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTextContainer: {},
  currentStateText: {
    fontSize: 17,
    color: 'white',
  },
  containerIn: {
    backgroundColor: '#165BAA',
  },
  containerOut: {
    backgroundColor: '#173F5F',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
