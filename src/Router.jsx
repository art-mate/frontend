import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PaintUpload from './components/PaintUpload';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Menu from './components/Menu';
import Profile from './routes/Profile';
import GoodsUpload from './components/GoodsUpload';

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
          <Route path="/login" exact component={Auth}></Route>
          <Route
            path="/profile"
            exact
            render={() => <Profile userObj={userObj} />}
          ></Route>
          <Route
            path="/uploadp"
            exact
            render={() => <PaintUpload userObj={userObj} />}
          ></Route>
          <Route
            path="/uploadg"
            exact
            render={() => <GoodsUpload userObj={userObj} />}
          ></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
