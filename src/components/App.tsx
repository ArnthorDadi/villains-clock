import React from 'react';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import { Route, Switch, NavLink } from 'react-router-dom'
import { CreateGame } from '../screens/CreateGame';
import { Game } from '../screens/Game';
import { Home } from '../screens/Home'

const now = 80

function App() {
  return (
    <>
      <ProgressBar animated now={now} label={`Progress on the site: ${now}%`} />
      <Switch>
        <Route exact path="/villains-clock" component={Home} />
        <Route exact path="/villains-clock/create-game" component={CreateGame} />
        <Route exact path="/villains-clock/game" component={Game} />
        <Route
          render={({ location }) => (
            <div>
              <div>404</div>
              <div>{location.pathname} page was not found!</div>
              <NavLink to="/villains-clock">Go to homepage</NavLink>
            </div>
          )} />
      </Switch>
    </>
  );
}

export default App;
