import React from 'react';
import styled from 'styled-components';

const SideContainer = styled.aside`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 260px;
  height: 100vh;
  background: red;
  z-index: 10001;
`;

const SideMenu = () => {
  return <SideContainer></SideContainer>;
};

export default SideMenu;
