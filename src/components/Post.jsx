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

const PostDetail = styled.p`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.4;
  color: #8c8c8c;
`;

const Post = ({ userObj, select }) => {
  const [description, setDescription] = useState('');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (userObj.description.length >= 30) {
      setDescription(userObj.description.substr(0, 30).concat('...'));
    } else {
      setDescription(userObj.description);
    }
  }, []);

  return (
    <PostContainer>
      <PostPhotoWrap>
        {userObj.attachmentUrl && (
          <Link
            to={{
              pathname:
                select === 'collections'
                  ? `/paint/${userObj.id}`
                  : `/goods/${userObj.id}`,
              state: userObj,
            }}
          >
            <img
              src={userObj.attachmentUrl}
              alt="attachment"
              width="50px"
              height="50px"
            />
          </Link>
        )}
      </PostPhotoWrap>
      <PostDescription themeProps={theme}>
        <PostTitle>{userObj.name}</PostTitle>
        <PostDetail>
          <span>{userObj.artist}</span>
          <span>{description}</span>
          <span>{userObj.price}원</span>
        </PostDetail>
      </PostDescription>
    </PostContainer>
  );
};

export default Post;
