import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMovieResult } from '../api';
import { makeImagePath } from '../utils';

const NEXFLIX_LOGO_URL =
  'https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4';

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
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

const GAP = 5;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${GAP}px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPath: string }>`
  background-color: white;
  background-image: url(${props => props.bgPath});
  background-size: cover;
  background-position: center center;
  height: 200px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const BoxInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + GAP,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - GAP,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: 'tween',
    },
  },
};

const boxInfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: 'tween',
    },
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
  const [isRowExiting, setIsRowExiting] = useState(false); // row animation flag

  const offset = 6; // 한 row에 표시할 영화 수
  const sliceBegin = offset * rowIndex;
  const sliceEnd = offset * rowIndex + offset;
  const rowMovies = data?.results.slice(1).slice(sliceBegin, sliceEnd); // banner 영화 제외

  const increaseRowIndex = () => {
    if (data) {
      if (isRowExiting) return;
      toggleRowExiting();
      const allSliderMoviesLength = data.results.length - 1; // banner 영화 제외
      const maxRowIndex = Math.floor(allSliderMoviesLength / offset) - 1; // page는 0부터 시작
      setRowIndex(prev => (prev === maxRowIndex ? 0 : prev + 1));
    }
  };

  const toggleRowExiting = () => setIsRowExiting(prev => !prev);

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
            <AnimatePresence initial={false} onExitComplete={toggleRowExiting}>
              <Row
                key={rowIndex}
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                transition={{ type: 'tween', duration: 1 }}
                exit='exit'>
                {rowMovies?.map(movie => {
                  const backdropPath = movie.backdrop_path
                    ? makeImagePath(movie.backdrop_path, 'w500')
                    : NEXFLIX_LOGO_URL;
                  return (
                    <Box
                      key={movie.id}
                      bgPath={backdropPath}
                      variants={boxVariants}
                      initial='normal'
                      whileHover='hover'
                      transition={{ type: 'tween' }}>
                      <BoxInfo variants={boxInfoVariants}>
                        <h4>{movie.title}</h4>
                      </BoxInfo>
                    </Box>
                  );
                })}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
