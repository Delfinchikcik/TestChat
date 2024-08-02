import { boot } from 'quasar/wrappers';
import { clerkPlugin, useClerk, useSession } from 'vue-clerk';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const httpLink = createHttpLink({
  uri: 'https://tele-chat.hasura.app/v1/graphql'
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const { session } = useSession();
    if (!session) {
      console.error("No session object found");
      return { headers };
    }

    const token = await session.getToken({ template: "HasuraTeleChat" });
    console.log("JWT Token:", token); // Логирование JWT токена


    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  } catch (error) {
    console.error("Error getting token:", error);
    return { headers };
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default boot(({ app }) => {
  console.log("Initializing Clerk plugin with key:", PUBLISHABLE_KEY); // Логирование инициализации Clerk
  app.use(clerkPlugin, {
    publishableKey: PUBLISHABLE_KEY,
  });
  app.provide('apolloClient', apolloClient);
});
