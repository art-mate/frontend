import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PaintUpload from './components/PaintUpload';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Menu from './components/Menu';
import Profile from './routes/Profile';

export default function Router({ isLoggedIn, userObj }) {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home userObj={userObj} />}
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
          <Route
            path="/upload"
            exact
            render={() => <PaintUpload userObj={userObj} />}
          ></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
