import React, { useContext } from 'react';
import styled from 'styled-components';
import DarkModeToggle from './DarkModeToggle';
import { ThemeContext } from '../App';
import ScrollToTop from './ScrollToTop';
import { Link } from 'react-router-dom';

import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineEllipsis } from 'react-icons/ai';
import SideMenu from './SideMenu';

const NavContainer = styled.nav`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.07);
  background: ${(props) => props.navBar};
  transition: all 0.5s ease-in-out;
  position: fixed;
  z-index: 100;
`;

const NavContentContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.header`
  & a {
    height: 100%;
    font-size: 2rem;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Dancing Script', cursive;
    color: ${(props) =>
      props.themeProps.body === '#fcfcfc' ? '#e6328d' : '#fafafa'};
    transition: all 0.5s ease-in-out;
  }
`;

const InfoContainer = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.button`
  width: 90px;
  height: 40px;
  font-size: 14px;
  color: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? '#363537' : '#fafafa'};
  background: none;
  border: none;
  &:hover {
    color: ${(props) =>
      props.themeProps.body === '#fcfcfc' ? '#e6328d' : '#fafafa'};
    transition: all 0.1s ease-in-out;
  }
`;

const ProfileWrap = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    color: ${(props) => props.text};
  }
`;

export default function Navigation({ userObj }) {
  const { theme } = useContext(ThemeContext);
  return (
    <NavContainer navBar={theme.navBar}>
      <NavContentContainer>
        <TitleContainer themeProps={theme}>
          <Link to="/">artmate</Link>
        </TitleContainer>
        <DarkModeToggle />
        <InfoContainer>
          {userObj ? (
            <>
              <Link to="/profile">
                <ProfileWrap text={theme.text}>
                  <FaUserCircle size={25} />
                </ProfileWrap>
              </Link>
              <ProfileWrap text={theme.text}>
                <AiOutlineEllipsis size={33} />
              </ProfileWrap>
            </>
          ) : (
            <Link to="/login">
              <LoginButton themeProps={theme}>로그인</LoginButton>
            </Link>
          )}
        </InfoContainer>
        <ScrollToTop />
      </NavContentContainer>
      {/* <SideMenu /> */}
    </NavContainer>
  );
}
