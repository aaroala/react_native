import { FlatList, View, StyleSheet } from "react-native"
import { useQuery } from "@apollo/client"
import { CURRENT_USER } from "../graphql/queries"
import MyReview from "./MyReview";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewList = () => {

  const {data, loading, refetch} = useQuery(CURRENT_USER, {
    variables: {includeReviews: true}}, {
    fetchPolicy: 'cache-and-network'
  })

  if(!data || loading) { return(<></>) } 

  const reviews = data.me.reviews

  const reviewNodes = reviews
  ? reviews.edges.map(edge => edge.node)
  : [];


  return(
    <FlatList
    data={reviewNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({item}) => <MyReview item={item} refetch={refetch}/> }
    keyExtractor={(item, index) => 'key'+index}
    // other props
  />)
}
export default MyReviewList