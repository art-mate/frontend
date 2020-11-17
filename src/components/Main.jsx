import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';

const MainContainer = styled.main`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
`;

const IntroSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  background: linear-gradient(45deg, #ce1818, #49b941);
`;

const ContentContainer = styled.section`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.div`
  color: white;
  font-size: 1.2rem;
  width: 80%;

  span {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
`;

const DetailButton = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 30px;
  font-size: 14px;
  margin-top: 15px;
  color: #fafafa;
  background: none;
  border: 1px solid #fafafa;
  &:hover {
    background: #fafafa;
    color: #363537;
    transition: all 0.1s ease-in-out;
  }
`;

const SubHead = styled.h3`
  font-size: 2.6rem;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  font-weight: 900;
`;

export default function Main() {
  const { theme } = useContext(ThemeContext);

  return (
    <MainContainer>
      <IntroSection>
        <ContentContainer>
          <MainContent>
            <SubHead>모든 예술가를 위한 플랫폼</SubHead>
            <span>보고싶은 작품을 간편하게</span>
            <span>작품을 자유롭게 거래</span>
            <span>당신만의 아이디어를 굿즈로 만들어보세요</span>
          </MainContent>
          <DetailButton themeProps={theme}>더 알아보기</DetailButton>
        </ContentContainer>
      </IntroSection>
    </MainContainer>
  );
}
