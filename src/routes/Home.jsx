import React from 'react';
import ArtIntro from '../components/ArtIntro';
import Main from '../components/Main';
import Exhibition from '../components/Exhibition';
import Navigation from '../components/Navigation';

export default function Home({ userObj }) {
  return (
    <React.Fragment>
      <Navigation userObj={userObj}/>
      <Main />
      <ArtIntro />
      <Exhibition />
    </React.Fragment>
  );
}
