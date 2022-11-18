import {FlatList, StyleSheet, View } from "react-native"
import { useQuery } from "@apollo/client";
import { REVIEWS } from "../graphql/queries";
import Review from "./Review";
import useReviews from "../hooks/useReviews";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = ({id}) => {

  console.log(id, "ID")

  const { reviews, fetchMore } = useReviews(id)

  const reviewNodes = reviews
  ? reviews.edges.map(edge => edge.node)
  : [];

  //console.log(reviewNodes, "REVIEWS", id)

  const onEndReach = () => {
    console.log("more!")
    fetchMore();
  };


  return(
  <FlatList
    data={reviewNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({item}) => <Review item={item}/> }
    keyExtractor={(item, index) => 'key'+index}
    onEndReached={onEndReach}
    onEndReachedThreshold={0.5}
    // other props
  />)
}

export default ReviewList