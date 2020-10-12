import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';

const ArtRegisterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
`;

export default function ArtRegister() {
  const { theme } = useContext(ThemeContext);
  return <ArtRegisterContainer>작품등록</ArtRegisterContainer>;
}
