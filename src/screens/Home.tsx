import { useQuery } from 'react-query';
import { getMovies } from '../api';

function Home() {
  const { data, isLoading } = useQuery(['movies', 'nowPlaying'], getMovies);

  return (
    <div
      style={{
        backgroundColor: 'whitesmoke',
        height: '200vh',
        paddingTop: 100,
      }}>
      {isLoading ? <span>isLoading...</span> : <span>Data is loaded</span>}
    </div>
  );
}

export default Home;
