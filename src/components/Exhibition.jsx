import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import museum from '../static/images/museum.jpg';

const ExhibitionContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const IntroSection = styled.section`
  width: 100%;
  height: 90%;
`;

export default function Exhibition() {
  const { theme } = useContext(ThemeContext);
  return (
    <ExhibitionContainer>
      <IntroSection></IntroSection>
    </ExhibitionContainer>
  );
}
