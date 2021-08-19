import { ApolloClient, InMemoryCache } from "@apollo/client";

//const BASE_URL = "http://localhost:4000";
const ALTER_URL = "http://172.31.89.177:4000";
const client = new ApolloClient({
  uri: ALTER_URL,
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
  },
});

export default client;
