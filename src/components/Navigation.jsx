import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  width: 100%;
  height: 10vh;
  min-height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.07);
`;

const NavContentContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  height: 100%;
  font-size: 40px;
  font-weight: 900;
  color: #2c49ec;
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
  color: white;
  background-color: #2c49ec;
  font-size: 14px;

  &:hover {
    background-color: #3d56e2;
  }
`;

const RegisterButton = styled.button`
  width: 90px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 30px;
  color: white;
  background-color: #2c49ec;
  font-size: 14px;

  &:hover {
    background-color: #3d56e2;
  }
`;

export default function Navigation() {
  return (
    <NavContainer>
      <NavContentContainer>
        <TitleContainer>artmate</TitleContainer>
        <InfoContainer>
          <LoginButton>로그인</LoginButton>
          <RegisterButton>회원가입</RegisterButton>
        </InfoContainer>
      </NavContentContainer>
    </NavContainer>
  );
}
