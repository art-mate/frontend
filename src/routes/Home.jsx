import React from 'react';
import Main from '../components/Main';
import Navigation from '../components/Navigation';
import Menu from './Menu';
import PaintUpload from '../components/PaintUpload';

export default function Home({ isLoggedIn }) {
  return (
    <React.Fragment>
      <Navigation isLoggedIn={isLoggedIn} />
      <Main />
      <Menu />
      <PaintUpload />
    </React.Fragment>
  );
}
