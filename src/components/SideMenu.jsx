import React from 'react';
import styled from 'styled-components';

const SideContainer = styled.aside`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background: red;
  z-index: 10001;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 60px;
`;

const SideMenu = () => {
  return <SideContainer></SideContainer>;
};

export default SideMenu;
