import React from 'react';
import ArtRegister from '../components/ArtRegister';
import Main from '../components/Main';
import Exhibition from '../components/Exhibition';

export default function Home() {
  return (
    <React.Fragment>
      <Main />
      <ArtRegister />
      <Exhibition />
    </React.Fragment>
  );
}
