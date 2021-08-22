import { ApolloClient, InMemoryCache } from "@apollo/client";

const BASE_URL = "http://localhost:4000";
const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMoive: (_, { id }, { cache }) => {
        cache.modify({
          id: `Movie:${id}`,
          data: {
            isLiked: (isLiked) => !isLiked,
          },
        });
      },
    },
  },
});

export default client;
