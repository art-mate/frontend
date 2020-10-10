import React from 'react';
import styled from 'styled-components';

const ArtRegisterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff3f3;
`;

export default function ArtRegister() {
  return <ArtRegisterContainer>작품등록</ArtRegisterContainer>;
}
