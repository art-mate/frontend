import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Menu from './routes/Menu';
import Profile from './routes/Profile';

export default function Router({ isLoggedIn, userObj }) {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route
            path="/menu"
            exact
            render={() => <Menu userObj={userObj} />}
          ></Route>
          <Route path="/login" exact component={Auth}></Route>
          <Route
            path="/profile"
            exact
            render={() => <Profile userObj={userObj} />}
          ></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
