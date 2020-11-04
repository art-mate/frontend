import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import Parel_girl from '../static/images/Parel_girl.jpg';

const MainContainer = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroSection = styled.section`
  width: 95%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a0a0d;
`;

const ContentContainer = styled.section`
  width: 50%;
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

const ImageSection = styled.figure`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: brightness(0.5);
  position: relative;
`;

const DetailButton = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 30px;
  font-size: 14px;
  margin-top: 15px;
  color: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? '#e6328d' : '#fafafa'};
  background: none;
  &:hover {
    background: ${(props) =>
      props.themeProps.body === '#fcfcfc' ? '#e6328d' : '#fafafa'};
    color: ${(props) =>
      props.themeProps.body === '#fcfcfc' ? '#fafafa' : '#363537'};
    transition: all 0.1s ease-in-out;
  }
`;

const SubHead = styled.h3`
  font-size: 2.2rem;
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
            <span>당신의 작품과 새로운 영감을 위해</span>
            <span>보관하고 싶은 작품을 영구적으로 마음껏</span>
            <span>보고싶은 작품을 간편하게</span>
          </MainContent>
          <DetailButton themeProps={theme}>더 알아보기</DetailButton>
        </ContentContainer>
        <ImageSection>
          <img src={Parel_girl} alt="parel" />
          {/* <figcaption style={{position:'absolute', left:'50%', bottom:'10px', color: 'white', fontSize:'10px'}}>진주 귀걸이를 한 소녀</figcaption> */}
        </ImageSection>
      </IntroSection>
    </MainContainer>
  );
}
