import Text from './Text';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable } from 'react-native';
import * as yup from 'yup';


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

const SignIn = () => {

  const onSubmit = (values) => {
    const {username, password} = values
    console.log(username, password)
  }

  return(
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({handleSubmit}) => (
          <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" />
            <Pressable onPress={handleSubmit}>
              <View style={styles.signInButton}>
                <Text style={styles.signInText}>Sign in</Text>
              </View>
            </Pressable>
          </View>
        )}
      </Formik>
  )
};

export default SignIn;