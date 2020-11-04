import React from 'react';
import ArtIntro from '../components/ArtIntro';
import Main from '../components/Main';
import Exhibition from '../components/Exhibition';
import Navigation from '../components/Navigation';

export default function Home({ isLoggedIn }) {
  return (
    <React.Fragment>
      <Navigation isLoggedIn={isLoggedIn} />
      <Main />
      <ArtIntro />
      <Exhibition />
    </React.Fragment>
  );
}
