import { Formik } from "formik"
import FormikTextInput from './FormikTextInput';
import { StyleSheet, View } from "react-native";
import { Pressable, Text } from "react-native";
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

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
  ownerName: yup
    .string()
    .min(2, 'Repository owner name is too short!')
    .required('Repository owner name is required'),
    repositoryName: yup
    .string()
    .min(2, 'Repository name is too short!')
    .required('Repository name is required'),
    rating: yup
    .number()
    .min(0, 'Minium is 0')
    .max(100, 'Maximum is 100')
    .required('Rating is required'),
    text: yup
    .string()
});


const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

export const WriteReviewContainer = ({onSubmit}) => {
  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({handleSubmit}) => (
        <View>
          <FormikTextInput name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="text" placeholder="Review"/>
          <Pressable onPress={handleSubmit}>
            <View style={styles.signInButton}>
              <Text style={styles.signInText}>Create a review</Text>
            </View>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

const ReviewForm = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, text } = values;
    const rating = parseInt(values.rating)
    
    console.log(ownerName, repositoryName, rating, text)

    try {
      const { data } = await mutate({ variables: { ownerName, repositoryName, rating, text }})
      const id = data.createReview.repositoryId
      navigate('/repository/' + id)
    } catch (e) {
      console.log(e);
    }
  };

  return(
    <WriteReviewContainer onSubmit={onSubmit}/>
  )
}
export default ReviewForm