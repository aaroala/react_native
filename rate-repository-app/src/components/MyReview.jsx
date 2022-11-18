import { border } from '@mui/system';
import { View, StyleSheet, Alert } from 'react-native';
import Text from './Text';
import moment from 'moment/moment';
import { Button } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  rating: {
    color: "blue",
    fontWeight: "bold"
  },
  ratingContainer: {
    width: 45,
    height: 45,
    marginRight: 5,
    borderRadius: 22,
    borderColor: 'blue',
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    flexGrow: 1,
    flexDirection: "column",
    marginRight: 10
  },
  textContainer: {
    alignContent: "flex-start"
  }
});



const cardStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: 'white'
  },
});

const buttonStyle = StyleSheet.create({
  container: {
    alignContent: "center",
    flexDirection: "row"
  }
})


const Card = ({ item }) => {
  const date = moment(item.createdAt).calendar()
  return(
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.ratingContainer}>
        <Text style={cardHeaderStyles.rating}>{item.rating}</Text>
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{item.repository.fullName}</Text>
        <Text color="textSecondary">{date}</Text>
        <Text>{item.text}</Text>
      </View>
    </View> 
  )
}



const MyReview = ({item, refetch}) => {
  const natigate = useNavigate()
  const [mutate, result] = useMutation(DELETE_REVIEW)
  //console.log(item, "review")

  const deleteReview = () => {
    console.log('Pressed' + item.repository.fullName)
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "DELETE", onPress: async () => {
          const response = await mutate({ variables: { deleteReviewId: item.id }})
          refetch({ id: item.repositoryId})
          console.log(response)
        } }
      ]
    );
  }

  return(
    <View style={cardStyles.container}>
      <Card item={item} />
      <View style={buttonStyle.container}>
        <Button mode="contained" color='blue' onPress={() => natigate('/repository/' + item.repositoryId )}>
          View repository
        </Button>
        <Button mode="contained" color='red' onPress={() => deleteReview()}>
          Delete review
        </Button>
      </View>
    </View>
  )
}

export default MyReview