import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './routes/Home';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
