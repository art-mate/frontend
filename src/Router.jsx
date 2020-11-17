import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PaintUpload from './routes/PaintUpload';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Profile from './routes/Profile';
import GoodsUpload from './routes/GoodsUpload';
import Detail from './routes/Detail';
import PaintEditing from './routes/PaintEditing';
import GoodsEditing from './routes/GoodsEditing';

export default function Router({ userObj, refreshUser }) {
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
            render={() => (
              <Profile userObj={userObj} refreshUser={refreshUser} />
            )}
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
          <Route path="/paint/:id" component={Detail} />
          <Route path="/goods/:id" component={Detail} />
          <Route path="/editp" exact component={PaintEditing} />
          <Route path="/editg" exact component={GoodsEditing} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
