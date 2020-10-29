import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import Menu from './routes/Menu';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/menu" exact component={Menu} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
