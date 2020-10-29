import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import oriental from '../static/images/oriental.jpeg';
import modern from '../static/images/painting2.jpg';
import western from '../static/images/western.jpg';
import pop from '../static/images/pop_art.jpeg';
import person from '../static/images/vincent.jpg';
import piece from '../static/images/pieta.JPG';
import illustration from '../static/images/illustration.png';
import anime from '../static/images/anime.jpg';
import oil from '../static/images/oil.jpeg';

const MenuContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuIntroduction = styled.p`
  width: 100%;
  height: 250px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

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

const MenuGrid = styled.div`
  display: grid;
  margin-bottom: 80px;
  grid-column-gap: 2vw;
  grid-row-gap: 2vw;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 430px) {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 4vw;
  }
`;

const PhotoContainer = styled.figure`
  width: 23vw;
  height: 23vw;
  min-width: 255px;
  min-height: 255px;
  box-shadow: 1px 1px 15px rgba(0,0,0,.5);

  & img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  &:hover {
    transition: all 0.5s ease;
    transform: scale(1.02);
  }
  @media screen and (max-width: 430px) {
    min-width: 300px;
    min-height: 300px;
  }
`;

export default function Menu() {
  const paints = [person, illustration, oil, pop, oriental, western, modern, anime, piece];

  return (
    <>
      <Navigation />
      <MenuContainer>
        <MenuIntroduction>
          <SubHead>모든 작품들을 한 눈에</SubHead>
          <span>초상화부터 일러스트레이션, 애니메이션까지</span>
        </MenuIntroduction>
        <MenuGrid>
          {paints.map((paint) => (
            <PhotoContainer>
              <img src={paint} alt="ori" width="50px" height="50px" />
            </PhotoContainer>
          ))}
        </MenuGrid>
      </MenuContainer>
    </>
  );
}