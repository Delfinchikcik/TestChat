import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const httpLink = new HttpLink({
  uri: 'https://tele-chat.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'BWMlTuFzcncd7N797qY8SWjZlrSimruPkC6iIaUn0QtUAr86IQYgJYei4uKIPmKl'
  }
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;