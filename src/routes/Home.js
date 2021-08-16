import { gql, useQuery } from "@apollo/client";
const GET_MOVIES = gql`
  {
    movies {
      id
      title
      medium_cover_image
    }
  }
`;
const Home = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (error) return error.message;
  if (loading) {
    return "loading...";
  }
  if (data && data.movies) {
    return data.movies.map((m) => <h1>{m.title}</h1>);
  }
};
export default Home;
