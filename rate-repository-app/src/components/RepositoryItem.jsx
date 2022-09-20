import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';


const cardFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    alignContent: 'center',
  },
  infoContainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
  }
});

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
    paddingLeft: 15,
  },
  infoContainer: {
    flexGrow: 1,
    flexDirection: "column",
    marginRight: 10

  },
  languageText: {
    backgroundColor: 'blue',
    alignSelf: "flex-start",
    padding: 3,
    borderRadius: 4,
    color: 'white',
    marginTop: 5
  }
});



const cardStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: 'white'
  },
});



const CardHeader = ({ item }) => {
  return(
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image style={cardHeaderStyles.avatar} source={{uri: item.ownerAvatarUrl}} />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
        <Text color="textSecondary">{item.description}</Text>
        <Text style={cardHeaderStyles.languageText}>{item.language}</Text>
      </View>
    </View> 
  )
}

const CardFooter = ({ item }) => {
  
  const convertToK = (number) => {
    if (number >= 1000) {
      return ((number/1000).toFixed(1) + 'k')
    } else {
      return number
    }
  }
  return(
    <View style={cardFooterStyles.container}>
        <View style={cardFooterStyles.infoContainer}>
          <Text fontWeight="bold">{convertToK(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={cardFooterStyles.infoContainer}>
          <Text fontWeight="bold">{convertToK(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={cardFooterStyles.infoContainer}>
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={cardFooterStyles.infoContainer}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
  )
}



const RepositoryItem = ({ item }) => {
  return(
    <View style={cardStyles.container}>
        <CardHeader  item={item} />
      <CardFooter item={item} />
    </View>
  )
}

/**
 *       Full name: {item.fullName} <br />
      Description: {item.description} <br />
      Language: {item.language} <br />
      Stars: {item.stargazersCount} <br />
      Forks: {item.forksCount} <br />
      Reviews: {item.reviewCount} <br />
      Rating: {item.ratingAverage} <br />
      <View style={styles.flexContainer}>
        <View style={styles.flexItemA}>
          <Text>Flex item A</Text>
          <Text>Flex item C</Text>
        </View>
        <View style={styles.flexItemB}>
          <Text>Flex item B</Text>
        </View>
      </View>
 */

export default RepositoryItem