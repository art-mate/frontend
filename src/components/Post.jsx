import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';

const PostContainer = styled.div`
  width: 26vw;
  height: 36vw;
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
  height: 80%;
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
  height: 20%;
  background: ${(props) => props.themeProps.navBar};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
`;

const PostTitle = styled.h4`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const PostDetail = styled.p`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 14px;
`;

const Post = ({ userObj }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <PostContainer>
      <PostPhotoWrap>
        {userObj.attachmentUrl && (
          <img
            src={userObj.attachmentUrl}
            alt="attachment"
            width="50px"
            height="50px"
          />
        )}
      </PostPhotoWrap>
      <PostDescription themeProps={theme}>
        <PostTitle>{userObj.paintName}</PostTitle>
        <PostDetail>
          <span>{userObj.artist}</span>
          <span>{userObj.description}</span>
          <span>{userObj.price}</span>
        </PostDetail>
      </PostDescription>
    </PostContainer>
  );
};

export default Post;
