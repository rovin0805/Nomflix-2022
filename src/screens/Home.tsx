import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ['movies', 'nowPlaying'],
    getMovies,
  );
  const bgPath = makeImagePath(data?.results[0].backdrop_path || '');
  const title = data?.results[0].title;
  const overview = data?.results[0].overview;
  const [rowIndex, setRowIndex] = useState(0);
  const boxPrinter = [1, 2, 3, 4, 5, 6];

  const increaseRowIndex = () => setRowIndex(prev => prev + 1);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPath={bgPath} onClick={increaseRowIndex}>
            <Title>{title}</Title>
            <Overview>{overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence>
              <Row
                key={rowIndex}
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                transition={{ type: 'tween', duration: 1 }}
                exit='exit'>
                {boxPrinter.map(i => (
                  <Box key={i}>{i}</Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
