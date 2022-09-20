import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 10,
    color: 'red',
  },
  blueText: {
    backgroundColor: 'blue',
  },
  form: {
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 2,
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 10,
    margin: 10,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <View style={styles.form}>
        <TextInput
          onChangeText={value => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
        />
      </View>
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;