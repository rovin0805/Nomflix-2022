import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Search from './routes/Search';
import Tv from './routes/Tv.';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/tv' component={Tv} />
        <Route path='/search' component={Search} />
      </Switch>
    </Router>
  );
}

export default App;
