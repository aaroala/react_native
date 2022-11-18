import { border } from '@mui/system';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import moment from 'moment/moment';

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



const Card = ({ item }) => {
  const date = moment(item.createdAt).calendar()
  return(
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.ratingContainer}>
        <Text style={cardHeaderStyles.rating}>{item.rating}</Text>
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{item.user.username}</Text>
        <Text color="textSecondary">{date}</Text>
        <Text>{item.text}</Text>
      </View>
    </View> 
  )
}



const Review = ({item}) => {
  //console.log(item, "review")
  return(
    <View style={cardStyles.container}>
      <Card item={item} />
    </View>
  )
}

export default Review