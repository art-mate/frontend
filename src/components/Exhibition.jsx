import React from 'react';
import styled from 'styled-components';

const ExhibitionContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
`;

export default function Exhibition() {
  return <ExhibitionContainer>3D전시관</ExhibitionContainer>;
}
