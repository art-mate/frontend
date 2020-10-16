import React, { useContext } from 'react';
import styled from 'styled-components';
import DarkModeToggle from './DarkModeToggle';
import { ThemeContext } from '../App';
import ScrollToTop from './ScrollToTop';

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
  height: 100%;
  font-size: 2rem;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Dancing Script', cursive;
  color: ${(props) => props.themeProps.body === '#fcfcfc' ? '#e6328d':'#fafafa'};
  transition: all 0.5s ease-in-out;
`;

const InfoContainer = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const LoginButton = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 30px;
  font-size: 14px;
  color: ${(props) => props.themeProps.body === '#fcfcfc' ? '#363537':'#fafafa'};
  border: 1px solid #fafafa;
  &:hover {
    background: #fafafa;
    color: ${(props) => props.themeProps.body === '#fcfcfc' ? '#e6328d':'#363537'};
    transition: all 0.1s ease-in-out;
  }
`;

const RegisterButton = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 30px;
  font-size: 14px;
  color: ${(props) => props.themeProps.body === '#fcfcfc' ? '#363537':'#fafafa'};
  border: 1px solid #fafafa;
  &:hover {
    background: #fafafa;
    color: ${(props) => props.themeProps.body === '#fcfcfc' ? '#e6328d':'#363537'};
    transition: all 0.1s ease-in-out;
  }
`;

export default function Navigation() {
  const { theme } = useContext(ThemeContext);
  return (
    <NavContainer navBar={theme.navBar}>
      <NavContentContainer>
        <TitleContainer themeProps={theme}>artmate</TitleContainer>
        <DarkModeToggle />
        <InfoContainer>
          <LoginButton themeProps={theme}>로그인</LoginButton>
          <RegisterButton themeProps={theme}>회원가입</RegisterButton>
        </InfoContainer>
        <ScrollToTop />
      </NavContentContainer>
    </NavContainer>
  );
}
