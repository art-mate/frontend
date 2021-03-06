import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';

const SideContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.sideMenuToggle ? 'block' : 'none')};
`;

const SideWrap = styled.aside`
  position: absolute;
  right: ${(props) => (props.sideMenuToggle ? '0px' : '-270px')};
  top: 0px;
  width: 300px;
  height: 100vh;
  background: ${(props) => props.themeProps.navBar};
  z-index: 10005;
  padding: 2rem;
`;

const SideNavContainer = styled.nav`
  width: 100%;
  height: 70%;
`;

const SideToggle = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10004;
  display: ${(props) => (props.sideMenuToggle ? 'block' : 'none')};
`;

const SideMenuList = styled.ul`
  width: 100%;
  height: 80%;

  & li {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: black;
  }
`;

const SideMenu = ({ userObj, sideMenuToggle, onSideMenuClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <SideContainer sideMenuToggle={sideMenuToggle}>
      <SideToggle sideMenuToggle={sideMenuToggle} onClick={onSideMenuClick} />
      <SideWrap themeProps={theme} sideMenuToggle={sideMenuToggle}>
        <SideNavContainer>
          <SideMenuList></SideMenuList>
        </SideNavContainer>
      </SideWrap>
    </SideContainer>
  );
};

export default SideMenu;
