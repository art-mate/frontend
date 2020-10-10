import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './global-styles';

const Main = styled.div`
  background-color: orange;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>안녕하세요</Main>
    </>
  );
}

export default App;
