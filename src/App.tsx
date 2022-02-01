import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './screens/Home';
import Search from './screens/Search';
import Tv from './screens/Tv';
import routes from './routes';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={routes.tv} component={Tv} />
        <Route path={routes.search} component={Search} />
        <Route path={[routes.home, routes.movieDetail]} component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
