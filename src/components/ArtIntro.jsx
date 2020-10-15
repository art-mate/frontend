import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import Pieta from '../static/images/pieta.JPG';
import Vincent from '../static/images/vincent.jpg';

const ArtIntroContainer = styled.div`
  width: 100%;
  height: 150vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroSection = styled.section`
  width: 95%;
  height: 100%;
  background: ${(props) => props.themeProps.body === '#fcfcfc' ? '#f0f3f3' :props.themeProps.body};
  transition: all 0.5s ease-in-out;
`;

const ContentContainer = styled.p`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const ImageSection = styled.section`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftImageSection = styled.figure`
  width: 48%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 0 15px rgba(0,0,0,.7)
`;

const RightImageSection = styled.figure`
  width: 48%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 15px rgba(0,0,0,.7)
`;

const DetailButtonContainer = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailButton = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 30px;
  font-size: 14px;
  margin-top: 15px;
  color: ${(props) => props.themeProps.body === '#fcfcfc' ? '#e6328d':'#fafafa'};
  background: none;
  &:hover {
    background: ${(props) => props.themeProps.body === '#fcfcfc' ? '#e6328d':'#fafafa'};
    color: ${(props) => props.themeProps.body === '#fcfcfc' ? '#fafafa':'#363537'};
    transition: all 0.1s ease-in-out;
  }
`;

export default function ArtIntro() {
  const { theme } = useContext(ThemeContext);
  return (
    <ArtIntroContainer>
      <IntroSection themeProps={theme}>
        <ContentContainer>
          <span style={{fontSize:'2.2rem', display:'flex', justifyContent:'center', marginBottom:'25px', fontWeight:'900'}}>
            모든 전공의 예술 작품
          </span>
          <span style={{display:'flex', justifyContent:'center', marginBottom:'15px'}}>동양화, 서양화 등을 비롯한 모든 그림</span>
          <span style={{display:'flex', justifyContent:'center', marginBottom:'15px'}}>조소전공을 위한 조각 작품</span>
          <span style={{display:'flex', justifyContent:'center', marginBottom:'15px'}}>찾고있는 분야의 작품을 지금 바로 구경해보세요.</span>
        </ContentContainer>
        <ImageSection>
          <LeftImageSection>
            <img src={Vincent} alt='vincent'/>
          </LeftImageSection>
          <RightImageSection>
            <img src={Pieta} alt='pieta'/>
          </RightImageSection>
        </ImageSection>
        <DetailButtonContainer>
          <Link to='/art'>
            <DetailButton themeProps={theme}>
              작품 구경하기
            </DetailButton>
          </Link>
        </DetailButtonContainer>
      </IntroSection>
    </ArtIntroContainer>
  );
}
