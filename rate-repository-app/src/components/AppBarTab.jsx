import Constants from 'expo-constants';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const tabBarStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    alignContent: 'center',
  },
  tabItemContainer: {
    flexDirection: "column",
    paddingRight: 20,

  }
});

const AppBarTab = ({name, to}) => {
  return(
      <View style={tabBarStyle.tabItemContainer}>
        <Link to={to}>
          <Text color='white'>{name}</Text>
        </Link>
      </View>
  )
}

export default AppBarTab