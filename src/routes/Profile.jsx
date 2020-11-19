import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import MyPaint from '../components/MyPaint';
import { BiPaint } from 'react-icons/bi';
import {
  AiOutlineShopping,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineShoppingCart,
} from 'react-icons/ai';

import { authService, dbService } from '../fBase';
import { Link } from 'react-router-dom';
import MyGoods from '../components/MyGoods';

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: 50%;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #d0d0d0;
  padding: 20px;
  margin-top: 60px;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & span {
    font-size: 2rem;
  }
`;

const MenuContainer = styled.div`
  width: 50%;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  margin-bottom: 60px;
  border-top: 1px solid #d0d0d0;
  & button {
    background: none;
    border: none;
    font-size: 1.2rem;
    margin-left: 10px;
  }
`;

const LinkContainer = styled.div`
  width: 50%;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-top: 1px solid #d0d0d0;
  font-size: 1.5rem;
  padding: 10px;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }
  & button {
    background: none;
    border: none;
    font-size: 1.2rem;
    margin-left: 10px;
  }
`;

const MenuWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const MyArtContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 50%;
  height: 30px;
  font-size: 20px;
  padding: 10px;
`;

const MyPaintContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  overflow: auto;
`;

const MyGoodsContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  overflow: auto;
`;

const MyArtMenu = styled.div`
  width: 58%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #8f8f8f;
  padding: 8px;
  margin-top: 20px;
`;

const NotImage = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Profile = ({ userObj, refreshUser }) => {
  const [myPaints, setMyPaints] = useState([]);
  const [myGoods, setMyGoods] = useState([]);
  const history = useHistory();

  const onLogOutClick = async () => {
    const ok = window.confirm('로그아웃 하시겠습니까?');
    if (ok) {
      await authService.signOut();
      history.push('/');
    }
    refreshUser();
  };
  const getMyArts = async () => {
    const paints = await dbService
      .collection('paints')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get()
      .then((querySnapshot) => querySnapshot.docs);

    const goods = await dbService
      .collection('goods')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get()
      .then((querySnapshot) => querySnapshot.docs);

    const paintData = paints.map((doc) => [doc.id].concat(doc.data()));
    const goodsData = goods.map((doc) => [doc.id].concat(doc.data()));

    setMyPaints(paintData);
    setMyGoods(goodsData);

    // console.log(paintData);
    // console.log(goodsData);
  };

  useEffect(() => {
    getMyArts();
  }, []);

  return (
    <>
      <ProfileContainer>
        <InfoContainer>
          <InfoWrap>
            <span>안녕하세요</span>
            {userObj.displayName ? (
              <span
                role="img"
                aria-labelledby="art"
                style={{ fontWeight: 'bold', marginTop: '15px' }}
              >
                {userObj.displayName}님 🧑‍🎨
              </span>
            ) : (
              <span
                role="img"
                aria-labelledby="art"
                style={{ fontWeight: 'bold', marginTop: '15px' }}
              >
                {userObj.email}님 🧑‍🎨
              </span>
            )}
          </InfoWrap>
        </InfoContainer>
        <MyArtContainer>
          <MyArtMenu>
            {userObj.displayName ? userObj.displayName : userObj.email}님의 그림
          </MyArtMenu>
          <MyPaintContainer>
            {myPaints.length ? (
              myPaints.map((art) => (
                <MyPaint key={art[0]} myPaint={art[1]} paintId={art[0]} />
              ))
            ) : (
              <NotImage>
                <span style={{ fontSize: '1.5rem' }}>
                  아직 등록한 작품이 없습니다 🙅
                </span>
              </NotImage>
            )}
          </MyPaintContainer>
          <MyArtMenu>
            {userObj.displayName ? userObj.displayName : userObj.email}님의 굿즈
          </MyArtMenu>
          <MyGoodsContainer>
            {myGoods.length ? (
              myGoods.map((art) => (
                <MyGoods key={art[0]} myGoods={art[1]} goodsId={art[0]} />
              ))
            ) : (
              <NotImage>
                <span style={{ fontSize: '1.5rem' }}>
                  아직 등록한 작품이 없습니다 🙅
                </span>
              </NotImage>
            )}
          </MyGoodsContainer>
        </MyArtContainer>
        <LinkContainer>
          <div>
            <BiPaint size={25} />
            <Link to="/uploadp">
              <button> 작품 등록하기</button>
            </Link>
          </div>
          <div>
            <AiOutlineShopping size={25} />
            <Link to="/uploadg">
              <button> 굿즈 등록하기</button>
            </Link>
          </div>
          <div>
            <AiOutlineShoppingCart size={25} />
            <Link to="/uploadg">
              <button> 장바구니</button>
            </Link>
          </div>
        </LinkContainer>
        <MenuContainer>
          <MenuWrap>
            <AiOutlineHome size={25} />
            <Link to="/">
              <button> 홈으로 가기</button>
            </Link>
          </MenuWrap>
          <MenuWrap>
            <AiOutlineLogout size={25} />
            <button onClick={onLogOutClick}> 로그아웃</button>
          </MenuWrap>
        </MenuContainer>
      </ProfileContainer>
    </>
  );
};
export default Profile;
