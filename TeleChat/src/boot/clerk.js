// import { boot } from 'quasar/wrappers';
// import { clerkPlugin } from 'vue-clerk'

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Publishable Key')
// }

// export default boot(({ app }) => {
//     app.use(clerkPlugin, {
//         publishableKey: PUBLISHABLE_KEY
//       })
//   });
  
// boot/clerk.js
import { boot } from 'quasar/wrappers';
import { clerkPlugin, useClerk } from 'vue-clerk'; 
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';


const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.');
}

const httpLink = createHttpLink({
  uri: 'https://tele-chat.hasura.app/v1/graphql'
});


const authLink = setContext(async (_, { headers }) => {
  const clerk = useClerk();
  const token = await clerk.session.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});


const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default boot(({ app }) => {
  app.use(clerkPlugin, {
    publishableKey: publishableKey
  });


  app.provide('apolloClient', apolloClient);
});
