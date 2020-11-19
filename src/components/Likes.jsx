import React from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { dbService } from '../fBase';

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

const Likes = ({ userObj, artData, setIsLiked, isLiked, select }) => {
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
    <LikesButton onClick={onLikesClick}>
      {isLiked ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25} />}
    </LikesButton>
  );
};

export default Likes;
