import React, { useContext } from 'react';
import styled from 'styled-components';
import DarkModeToggle from './DarkModeToggle';
import { ThemeContext } from '../App';

const NavContainer = styled.nav`
  width: 100%;
  height: 10vh;
  min-height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.07);
  background: ${(props) => props.navBar};
  transition: all 0.5s ease-in-out;
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
  color: #e6328d;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Aclonica', sans-serif;
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
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 30px;
  font-size: 14px;
  color: white;
  &:hover {
    background-color: #ff0081;
  }
`;

const RegisterButton = styled.button`
  width: 90px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 30px;
  font-size: 14px;
  color: white;
  &:hover {
    background-color: #ff0081;
  }
`;

export default function Navigation() {
  const { theme } = useContext(ThemeContext);
  return (
    <NavContainer navBar={theme.navBar}>
      <NavContentContainer>
        <TitleContainer>artmate</TitleContainer>
        <DarkModeToggle />
        <InfoContainer>
          <LoginButton>로그인</LoginButton>
          <RegisterButton>회원가입</RegisterButton>
        </InfoContainer>
      </NavContentContainer>
    </NavContainer>
  );
}
