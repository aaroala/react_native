import Text from './Text';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';



const styles = StyleSheet.create({
  signInButton: {
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: '#0062ff',
    height: 50,
    paddingHorizontal: 10,
    margin: 10,
  },
  signInText: {
    color: 'white',
    marginTop: 9,
    fontSize: 20,
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username is too short!')
    .required('Username is required'),
  password: yup
    .string()
    .min(2, 'Password is too short!')
    .required('Password is required'),
});


const initialValues = {
  username: '',
  password: '',
};

export const SignInContainer = ({onSubmit}) => {
  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({handleSubmit}) => (
        <View>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" />
          <Pressable onPress={handleSubmit}>
            <View style={styles.signInButton}>
              <Text style={styles.signInText}>Sign up</Text>
            </View>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}


const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password)

    try {
      await signIn({ username, password });
      navigate('/')
    } catch (e) {
      console.log(e);
    }
  };

  return(<SignInContainer onSubmit={onSubmit}/>)
};

export default SignIn;