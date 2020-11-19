import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import { GoHeart } from 'react-icons/go';
import Likes from './Likes';

const PostContainer = styled.div`
  width: 23vw;
  height: 26vw;
  min-width: 340px;
  min-height: 450px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
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
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
`;

const PostDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  line-height: 1.5;
  font-size: 13px;
`;

const SubTitle = styled.span`
  color: #8c8c8c;
`;

const Content = styled.span`
  margin-left: 10px;
`;

const Post = ({ userObj, artData, select }) => {
  const { theme } = useContext(ThemeContext);

  const [isLiked, setIsLiked] = useState(false);
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    if (userObj && artData.likes.includes(userObj.uid)) {
      setIsLiked(true);
    }
    if (userObj && artData.cart.includes(userObj.uid)) {
      setIsCart(true);
    }
  }, []);

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
              state: { artData, isLiked, select, isCart },
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
        <PostDetail>
          <div>
            <SubTitle>작품명</SubTitle>
            <Content>{artData.name}</Content>
          </div>
          <div>
            <SubTitle>작가명</SubTitle>
            <Content>{artData.artist}</Content>
          </div>
          <div>
            <SubTitle>가격</SubTitle>
            <Content>{artData.price}원</Content>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ce1818',
              }}
            >
              <GoHeart size={15} />
            </span>
            <Content>{artData.likes.length}</Content>
          </div>
        </PostDetail>
      </PostDescription>
      <Likes
        userObj={userObj}
        artData={artData}
        setIsLiked={setIsLiked}
        isLiked={isLiked}
        select={select}
      />
    </PostContainer>
  );
};

export default Post;
