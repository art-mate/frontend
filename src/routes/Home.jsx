import React from 'react';
import ArtRegister from '../components/ArtRegister';
import Main from '../components/Main';
import Exhibition from '../components/Exhibition';
import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <React.Fragment>
      <Navigation />
      <Main />
      <ArtRegister />
      <Exhibition />
    </React.Fragment>
  );
}
