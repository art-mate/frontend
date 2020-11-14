import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../App';

const PostContainer = styled.div`
  width: 26vw;
  height: 28vw;
  min-width: 260px;
  min-height: 490px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 430px) {
    min-width: 300px;
    min-height: 300px;
  }
`;

const PostPhotoWrap = styled.figure`
  width: 100%;
  height: 75%;
  & img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  &:hover {
    transition: all 0.3s ease;
  }
`;

const PostDescription = styled.figcaption`
  width: 100%;
  height: 25%;
  background: ${(props) => props.themeProps.navBar};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
`;

const PostTitle = styled.h4`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
`;

const PostDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  line-height: 1.4;
  font-size: 14px;
`;

const SubTitle = styled.span`
  color: #8c8c8c;
`;

const Content = styled.span`
  margin-left: 10px;
`;

const Post = ({ userObj, artData, select }) => {
  const { theme } = useContext(ThemeContext);
  const isUser = Boolean(userObj);

  return (
    <PostContainer>
      <PostPhotoWrap>
        {artData.attachmentUrl && (
          <Link
            to={{
              pathname:
                select === 'collections'
                  ? `/paint/${artData.id}`
                  : `/goods/${artData.id}`,
              state: { artData, isUser },
            }}
          >
            <img
              src={artData.attachmentUrl}
              alt="attachment"
              width="50px"
              height="50px"
            />
          </Link>
        )}
      </PostPhotoWrap>
      <PostDescription themeProps={theme}>
        <PostTitle>{artData.name}</PostTitle>
        <PostDetail>
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
            <Content>{artData.price}원</Content>
          </div>
        </PostDetail>
      </PostDescription>
    </PostContainer>
  );
};

export default Post;
