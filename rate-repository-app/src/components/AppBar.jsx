import { View, StyleSheet, ScrollView } from 'react-native';
import AppBarTab from './AppBarTab'
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';

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
  const { data } = useQuery(CURRENT_USER, {
    fetchPolicy: "cache-and-network",
  })

  let user = null;

  if (data?.me?.username) {
    user = data.me.username
  }


  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab name="Repository" to="/"/>
      {user ? 
        <>
          <AppBarTab name="Write a review" to="write-review" />
          <AppBarTab name="My reviews" to="my-reviews" />
          <AppBarTab name="Sign out" to="sign-out"/>
        </>
      :
        <>
          <AppBarTab name="Sign up" to="sign-up"/>
          <AppBarTab name="Sign in" to="sign-in"/>
        </>
      }
    </ScrollView>
  </View>;
};

export default AppBar;