import React from 'react';
import Main from '../components/Main';
import Navigation from '../components/Navigation';
import Menu from '../components/Menu';

export default function Home({ userObj }) {
  return (
    <React.Fragment>
      <Navigation userObj={userObj} />
      <Main />
      <Menu />
    </React.Fragment>
  );
}
