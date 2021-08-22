import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Suggestions = styled.div`
  position: fixed;
  bottom: 40px;
  padding-top: 5px;
  height: 100px;
  width: 100vh;
`;
const Cards = styled.div`
  display: flex;
  & a {
    text-decoration: none;
  }
  margin-top: 10px;
`;
const Thumb = styled.div`
  color: white;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  const {
    title,
    language,
    rating,
    description_intro,
    medium_cover_image,
    isLiked,
  } = !loading && data ? data.movie : "";
  const upper_lang = language?.toUpperCase();
  const restricted_description_intro =
    description_intro?.length > 650
      ? description_intro?.substr(0, 650) + " ..."
      : description_intro;
  return (
    <Container>
      <Column>
        <Title>
          {loading ? "Loading..." : `${title} ${isLiked ? "💖" : "💔"}`}
        </Title>
        {!loading && data.movie && (
          <>
            <Subtitle>
              {upper_lang} · {rating}
            </Subtitle>
            <Description>{restricted_description_intro}</Description>
          </>
        )}
      </Column>
      <Poster bg={data && data.movie ? medium_cover_image : ""}></Poster>
      <Suggestions>
        {!loading && "Suggestions"}
        <Cards>
          {data?.suggestions?.map((m) => (
            <Link to={`/${m.id}`} key={m.id}>
              <Thumb bg={m.medium_cover_image}>
                {loading ? "Loading..." : m.title}
              </Thumb>
            </Link>
          ))}
        </Cards>
      </Suggestions>
    </Container>
  );
};

export default Detail;

/* install chrome extension - Apollo Client Devtools  */
