import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import Navigation from '../components/Navigation';
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiFillHeart,
} from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';

import { authService } from '../fBase';
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
  max-width: 800px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
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
  max-width: 800px;
  height: 100%;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  line-height: 2;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${(props) => props.themeProps.navBar};
  margin-bottom: 60px;
`;

const CommentContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentWrap = styled.div`
  width: 50%;
  max-width: 800px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  line-height: 2;
  background: ${(props) => props.themeProps.navBar};
  margin-bottom: 60px;
  & label {
    display: block;
    font-size: 0.8rem;
  }
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
    cursor: pointer;
  }
`;

const CommentUserInputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    padding: 15px;
    width: 100%;
    margin-top: 3px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const CommentSubmitButton = styled.button`
  width: 10%;
  height: 60px;
  cursor: pointer;
  color: #ce1818;
  border: none;
  background: none;
`;

const Detail = ({ location }) => {
  const { theme } = useContext(ThemeContext);
  const { artData, isLiked, isCart, select } = location.state;
  const [userObj, setUserObj] = useState(null);
  const [detailLikes, setDetailLikes] = useState(isLiked);
  const [detailCart, setDetailCart] = useState(isCart);
  const [comment, setComment] = useState('');

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
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
      setDetailLikes((prev) => !prev);
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const onCartClick = async () => {
    if (userObj) {
      if (Array.isArray(artData.cart) && artData.cart.length) {
        const carts = artData.cart;
        if (artData.cart.includes(userObj.uid)) {
          const idx = carts.indexOf(userObj.uid);
          if (idx > -1) carts.splice(idx, 1);
        } else {
          carts.push(userObj.uid);
        }
        if (select === 'collection') {
          await dbService.doc(`paints/${artData.id}`).update({ cart: carts });
        } else {
          await dbService.doc(`goods/${artData.id}`).update({ cart: carts });
        }
      } else {
        if (select === 'collection') {
          await dbService
            .doc(`paints/${artData.id}`)
            .update({ cart: [`${userObj.uid}`] });
        } else {
          await dbService
            .doc(`goods/${artData.id}`)
            .update({ cart: [`${userObj.uid}`] });
        }
      }
      setDetailCart((prev) => !prev);
      if (detailCart) {
        alert('해당 작품을 장바구니에서 삭제하였습니다.');
      } else {
        alert('해당 작품을 장바구니에 추가하였습니다.');
      }
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'comment') {
      setComment(value);
    }
  };

  return (
    <>
      <Navigation userObj={userObj} />
      <DetailContainer>
        <PhotoWrap>
          <img src={artData.attachmentUrl} alt="attachment" />
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
        <CommentContainer>
          <CommentWrap themeProps={theme}>
            <label htmlFor="comment">댓글</label>
            <CommentUserInputWrap>
              <input
                name="comment"
                value={comment}
                onChange={onChange}
                placeholder="댓글 달기"
                type="text"
                maxLength={200}
              />
              <CommentSubmitButton>등록</CommentSubmitButton>
            </CommentUserInputWrap>
          </CommentWrap>
        </CommentContainer>
      </DetailContainer>
      <LikesStore themeProps={theme}>
        <div>
          {detailCart ? (
            <FaCartPlus size={37} onClick={onCartClick} />
          ) : (
            <AiOutlineShoppingCart size={37} onClick={onCartClick} />
          )}
        </div>
        <div>
          {detailLikes ? (
            <AiFillHeart size={37} onClick={onLikesClick} />
          ) : (
            <AiOutlineHeart size={37} onClick={onLikesClick} />
          )}
        </div>
      </LikesStore>
    </>
  );
};

export default Detail;
