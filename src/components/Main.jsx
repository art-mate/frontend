import React, { useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../App';

const MainContainer = styled.main`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
`;

export default function Main() {
  //const { theme, toggleTheme } = useContext(ThemeContext);

  return <MainContainer>프로젝트 소개</MainContainer>;
}
