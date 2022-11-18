import Text from './Text';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { CREATE_USER, SIGN_IN } from '../graphql/mutations';
import { useApolloClient, useMutation } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';



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
  confirmPassword: yup.string()
  .test('passwords-match', 'Passwords must match', 
    function (value) { return this.parent.password === value })
})

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};


export const SignInContainer = ({onSubmit}) => {
  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({handleSubmit}) => (
        <View>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" />
          <FormikTextInput name="confirmPassword" placeholder="Confirm password" />
          <Pressable onPress={handleSubmit}>
            <View style={styles.signInButton}>
              <Text style={styles.signInText}>Sign in</Text>
            </View>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}


const SignUp = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_USER);
  const [mutate2, result2] = useMutation(SIGN_IN);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password)

    try {
      //await signIn({ username, password });
      const created = await mutate({ variables: { username, password }})
      const { data } = await mutate2({ variables: { username, password }})
      console.log("data", data)

      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      navigate('/')
    } catch (e) {
      console.log(e);
    }
  };

  return(<SignInContainer onSubmit={onSubmit}/>)
};

export default SignUp;