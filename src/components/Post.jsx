import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { GoHeart } from 'react-icons/go';

import { dbService } from '../fBase';

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

const LikesButton = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
  width: 25px;
  height: 25px;

  & svg {
    color: #da0000;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Post = ({ userObj, artData, select }) => {
  const { theme } = useContext(ThemeContext);
  const isUser = Boolean(userObj);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (userObj && artData.likes.includes(userObj.uid)) {
      setIsLiked(true);
    }
  }, []);

  const onLikesClick = async () => {
    if (userObj) {
      if (Array.isArray(artData.likes) && artData.likes.length) {
        const likes = artData.likes;
        if (artData.likes.includes(userObj.uid)) {
          const idx = likes.indexOf(userObj.uid);
          if (idx > -1) likes.splice(idx, 1);
        } else {
          likes.push(userObj.uid);
        }
        if (select === 'collection') {
          await dbService.doc(`paints/${artData.id}`).update({ likes: likes });
        } else {
          await dbService.doc(`goods/${artData.id}`).update({ likes: likes });
        }
      } else {
        if (select === 'collection') {
          await dbService
            .doc(`paints/${artData.id}`)
            .update({ likes: [`${userObj.uid}`] });
        } else {
          await dbService
            .doc(`goods/${artData.id}`)
            .update({ likes: [`${userObj.uid}`] });
        }
      }
      setIsLiked((prev) => !prev);
    } else {
      alert('로그인이 필요합니다.');
    }
  };

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
              state: { artData, isUser, isLiked },
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
        {/* <PostTitle>{artData.name}</PostTitle> */}
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
            <SubTitle>제작년도</SubTitle>
            <Content>{artData.year}</Content>
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
      <LikesButton onClick={onLikesClick}>
        {isLiked ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25} />}
      </LikesButton>
    </PostContainer>
  );
};

export default Post;
