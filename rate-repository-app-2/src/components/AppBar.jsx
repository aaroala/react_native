import { View, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#24292e',
    alignItems: 'center',
    // ...
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <AppBarTab />
  </View>;
};

export default AppBar;