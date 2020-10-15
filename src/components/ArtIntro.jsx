import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';

const ArtIntroContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
`;

export default function ArtIntro() {
  const { theme } = useContext(ThemeContext);
  return <ArtIntroContainer></ArtIntroContainer>;
}
