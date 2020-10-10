import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;

export default function Main() {
  return <MainContainer>프로젝트 소개</MainContainer>;
}
