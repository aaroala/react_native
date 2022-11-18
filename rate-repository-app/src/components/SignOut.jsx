import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { useEffect } from 'react';
import useAuthStorage from '../hooks/useAuthStorage';
import { Text } from 'react-native';

const SignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  useEffect(() => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/')
  }, [])


  return(<Text>Signing out</Text>)
}

export default SignOut

