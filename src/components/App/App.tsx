import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { loadData } from '../../redux/actions';
import { IState } from '../../types';
import FactionCard from '../FactionCard/FactionCard';
import PopUp from '../PopUp/PopUp';
import SearchDashboard from '../Search/SearchDashboard';
import '../../scss/main.scss';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../Header';

function App() {
  const dispatch = useDispatch();
  const factions = useSelector((state: IState) => state.factions);
  let popUp = useSelector((state: IState) => state.popUp);

  useEffect(() => {
    dispatch(loadData('factions'));
    dispatch(loadData('race'));
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <main className="wrapper">
        <Switch>
          <Route path="/search" component={SearchDashboard}></Route>
          <Route path="/">
            <>
              {factions.map((data) => {
                return <FactionCard key={data.faction_id} data={data}></FactionCard>;
              })}
            </>
            <CSSTransition in={popUp.isOpen} timeout={300} classNames="pop-up__animation" unmountOnExit>
              <PopUp />
            </CSSTransition>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
