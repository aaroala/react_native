import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedOrder, searchText) => {
  let order = "RATING_AVERAGE"
  let direction = "DESC"
  if(selectedOrder == "latest") {
    order = "CREATED_AT"
  }
  if(selectedOrder == "lowest") {
    direction = "ASC"
  }

  const { data, error, loading} = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: order, orderDirection: direction, searchKeyword: searchText }
  },
    {
      fetchPolicy: 'cache-and-network',
  });

  if(!data || loading) { return{loading}} 

  const repositories = data.repositories


  return { repositories, loading };
};

export default useRepositories;