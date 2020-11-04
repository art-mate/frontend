import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../App';

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

const MenuIntroduction = styled.div`
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
  grid-row-gap: 4vw;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 430px) {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 4vw;
  }
`;

const PhotoContainer = styled.figure`
  width: 23vw;
  height: 23vw;
  min-width: 170px;
  min-height: 170px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.5);
  position: relative;

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

const PaintKind = styled.figcaption`
  width: 50%;
  height: 50px;
  background: ${(props) => props.themeProps.navBar};
  position: absolute;
  left: 50%;
  bottom: -7%;
  transform: translateX(-50%);
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
`;

export default function Menu({ userObj }) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paints = [
    person,
    illustration,
    oil,
    pop,
    oriental,
    western,
    modern,
    anime,
    piece,
  ];
  const paintKinds = [
    '인물화',
    '일러스트',
    '유화',
    '팝아트',
    '동양화',
    '서양화',
    '현대미술',
    '애니메이션',
    '조각',
  ];

  return (
    <>
      <Navigation isLoggedIn={Boolean(userObj)} />
      <MenuContainer>
        <MenuIntroduction>
          <SubHead>모든 작품들을 한 눈에</SubHead>
          <span>초상화부터 일러스트레이션, 애니메이션까지</span>
        </MenuIntroduction>
        <MenuGrid>
          {paints.map((paint, index) => (
            <PhotoContainer key={index}>
              <img src={paint} alt="ori" width="50px" height="50px" />
              <PaintKind themeProps={theme}>
                <span>{paintKinds[index]}</span>
              </PaintKind>
            </PhotoContainer>
          ))}
        </MenuGrid>
      </MenuContainer>
    </>
  );
}
