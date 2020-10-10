import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  font-size: 40px;
  font-weight: bold;
`;

export default function Main() {
  return <MainContainer>프로젝트 소개</MainContainer>;
}
