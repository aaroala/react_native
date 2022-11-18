import RepositoryItem from "./RepositoryItem"
import { useParams} from "react-router-native"
import { useQuery } from "@apollo/client"
import { REPOSITORY } from "../graphql/queries"
import ReviewList from "./ReviewList"

const Repository = () => {
  const { id } = useParams()
  console.log("ID", id)
  const { data } = useQuery(REPOSITORY,{
    variables: { repositoryId: id }}, {
    fetchPolicy: 'cache-and-network'
  })
  if(!data) {return(<></>)}
  console.log("Data", data)
  return(
  <>
    <RepositoryItem item={data.repository} git_btn_visible={true} />
    <ReviewList id={id}/>
  </>
  )
}

export default Repository