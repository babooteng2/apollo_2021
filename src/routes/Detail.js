import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  console.log(loading, data);
  if (loading) {
    return "loading...";
  }
  if (data && data.movie) {
    const { title, medium_cover_image, description_intro } = data.movie;
    return (
      <>
        <div>{title}</div>
        <img src={medium_cover_image} alt="" />
        <p>{description_intro}</p>
      </>
    );
  }
};
export default Detail;
