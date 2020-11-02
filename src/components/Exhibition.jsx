import React from 'react';
import styled from 'styled-components';
import museum from '../static/images/museum.jpg';

const ExhibitionContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const IntroSection = styled.section`
  width: 100%;
  height: 92%;
  position: relative;
`;

const ContentContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const MainContent = styled.div`
  color: white;
  font-size: 1.2rem;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);

  span {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
`;

const SubHead = styled.h3`
  font-size: 2.2rem;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  font-weight: 900;
`;

const DetailButton = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 30px;
  font-size: 14px;
  margin-top: 15px;
  color: white;
  background: none;
  border: 1px solid #fcfcfc;
  &:hover {
    background: white;
    color: #363537;
    transition: all 0.1s ease-in-out;
  }
`;

export default function Exhibition() {
  return (
    <ExhibitionContainer>
      <IntroSection>
        <div
          style={{
            backgroundImage: `url('${museum}')`,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center, center",
            backgroundRepeat: "no-repeat",
            filter: 'brightness(0.5)',
          }}
        ></div>
        <ContentContainer>
          <MainContent>
            <SubHead>
              3D 전시관
            </SubHead>
            <span>실제 전시된 것 같은 기분</span>
            <span>미술관에서 보는 느낌을 느껴보세요.</span>
            <DetailButton>3D 전시관 보러가기</DetailButton>
          </MainContent>
        </ContentContainer>
      </IntroSection>
    </ExhibitionContainer>
  );
}
