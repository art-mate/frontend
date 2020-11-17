import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import Navigation from '../components/Navigation';
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiFillHeart,
} from 'react-icons/ai';

import { dbService } from '../fBase';

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PhotoWrap = styled.div`
  width: 50%;
  margin-top: 100px;
`;

const TitleWrap = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const InfoContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoWrap = styled.div`
  width: 50%;
  height: 100%;
  padding: 20px;
  line-height: 2;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${(props) => props.themeProps.navBar};
  margin-bottom: 60px;
`;

const SubTitle = styled.span`
  color: #8c8c8c;
  font-size: 15px;
`;

const Content = styled.span`
  margin-left: 10px;
  font-size: 15px;
`;

const Description = styled.p`
  line-height: 1.5;
  font-size: 15px;
  margin-top: 5px;
`;

const LikesStore = styled.div`
  position: fixed;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  @media screen and (max-width: 720px) {
    top: unset;
    bottom: 3%;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 70px;
    flex-direction: row;
  }
  width: 70px;
  height: 180px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? props.themeProps.body : '#353535'};
  border: 1px solid
    ${(props) =>
      props.themeProps.body === '#fcfcfc' ? 'rgba(0,0,0,.01)' : '#353535'};
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);

  & div {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
  }
`;

const Detail = ({ location }) => {
  const { theme } = useContext(ThemeContext);
  const { artData, isUser, isLiked } = location.state;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return (
    <>
      <Navigation userObj={isUser} />
      <DetailContainer>
        <PhotoWrap>
          <img src={artData.attachmentUrl} />
        </PhotoWrap>
        <TitleWrap>
          <span>{artData.name}</span>
        </TitleWrap>
        <InfoContainer>
          <InfoWrap themeProps={theme}>
            <div>
              <SubTitle>작가명</SubTitle>
              <Content>{artData.artist}</Content>
            </div>
            <div>
              <SubTitle>제작년도</SubTitle>
              <Content>{artData.year}</Content>
            </div>
            <div>
              <SubTitle>가격</SubTitle>
              <Content>{artData.price}</Content>
            </div>
            <Description>{artData.description}</Description>
          </InfoWrap>
        </InfoContainer>
      </DetailContainer>
      <LikesStore themeProps={theme}>
        <div>
          <AiOutlineShoppingCart size={37} />
        </div>
        <div>
          {isLiked ? <AiFillHeart size={37} /> : <AiOutlineHeart size={37} />}
        </div>
      </LikesStore>
    </>
  );
};

export default Detail;
