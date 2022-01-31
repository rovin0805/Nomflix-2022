import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMovieResult } from '../api';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPath?: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.bgPath});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ['movies', 'nowPlaying'],
    getMovies,
  );
  const bgPath = makeImagePath(data?.results[0].backdrop_path || '');
  const title = data?.results[0].title;
  const overview = data?.results[0].overview;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPath={bgPath}>
            <Title>{title}</Title>
            <Overview>{overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
