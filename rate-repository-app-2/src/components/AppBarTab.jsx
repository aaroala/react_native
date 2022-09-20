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

const AppBarTab = () => {
  return(
    <ScrollView horizontal>
      <View style={tabBarStyle.tabItemContainer}>
        <Link to="/">
          <Text color='white' >Repository</Text>
        </Link>
      </View>
      <View style={tabBarStyle.tabItemContainer}>
        <Link to="/sign-in">
          <Text color='white' >Sign in</Text>
        </Link>
      </View>
    </ScrollView>
  )
}

export default AppBarTab