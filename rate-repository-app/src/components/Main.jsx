import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import Text from './Text';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Repository from './Repository';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviewList';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <>
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="write-review" element={<ReviewForm/>} exact/>
          <Route path="my-reviews" element={<MyReviews/>} exact />
          <Route path="/sign-in" element={<SignIn />} exact/>
          <Route path="/sign-out" element={<SignOut />} exact/>
          <Route path="/sign-up" element={<SignUp />} exact/>
          <Route path="/repository/:id" element={<Repository />}/>
        </Routes>
      </View>
    </>
  );
};

export default Main;