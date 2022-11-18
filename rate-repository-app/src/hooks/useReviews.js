import { useQuery } from '@apollo/client';
import { REVIEWS } from '../graphql/queries';

const useReviews = (id) => {

  const variables = { repositoryId: id, first: 3 }

  const {data, loading, fetchMore} = useQuery(REVIEWS,{
    variables: variables}, {
    fetchPolicy: 'cache-and-network'
  })


  if(!data || loading) { return{loading}} 

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };


  const reviews = data?.repository?.reviews


  return { reviews, loading, fetchMore: handleFetchMore, };
};

export default useReviews;