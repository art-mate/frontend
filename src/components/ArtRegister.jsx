import React from 'react';
import styled from 'styled-components';

const ArtRegisterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
`;

export default function ArtRegister() {
  return <ArtRegisterContainer>작품등록</ArtRegisterContainer>;
}
