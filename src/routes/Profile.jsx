import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { authService, dbService } from '../fBase';
import { Link } from 'react-router-dom';

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
  }
`;

const UploadContainer = styled.div`
  width: 50%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #d0d0d0;
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
  }
`;

const MenuWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const MyArtContainer = styled.div`
  width: 100%;
  height: 430px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 50%;
  height: 30px;
  font-size: 1.1rem;
  padding: 10px;
`;

const MyArtWrap = styled.div`
  width: 90%;
  height: 320px;
  margin-top: 15px;
`;

const Profile = ({ userObj }) => {
  const [myArts, setMyArts] = useState([]);
  const history = useHistory();

  const onLogOutClick = async () => {
    const ok = window.confirm('로그아웃 하시겠습니까?');
    if (ok) {
      await authService.signOut().then(() => history.push('/'));
    }
  };
  const getMyArts = async () => {
    const paints = await dbService
      .collection('paints')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();

    const goods = await dbService
      .collection('goods')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();

    const paintData = paints.docs.map((doc) => doc.data());
    const goodsData = goods.docs.map((doc) => doc.data());

    setMyArts(paintData.concat(goodsData));
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
        <UploadContainer>
          <div>
            <span role="img" aria-labelledby="paint">
              🖼
            </span>
            <Link to="/uploadp">
              <button> 작품 등록하기</button>
            </Link>
          </div>
          <div>
            <span role="img" aria-labelledby="goods">
              🎎
            </span>
            <Link to="/uploadg">
              <button> 굿즈 등록하기</button>
            </Link>
          </div>
        </UploadContainer>
        <MyArtContainer>
          <Content>
            <span role="img" aria-labelledby="art">
              🎨
            </span>{' '}
            등록한 작품
          </Content>
          <MyArtWrap>
            {myArts.map((art) => (
              <div key={art.name}>{art.artist}</div>
            ))}
          </MyArtWrap>
        </MyArtContainer>
        <MenuContainer>
          <MenuWrap>
            <span role="img" aria-labelledby="home">
              🏡
            </span>
            <Link to="/">
              <button> 홈으로 가기</button>
            </Link>
          </MenuWrap>
          <MenuWrap>
            <span role="img" aria-labelledby="logout">
              ❌
            </span>
            <button onClick={onLogOutClick}> 로그아웃</button>
          </MenuWrap>
        </MenuContainer>
      </ProfileContainer>
    </>
  );
};
export default Profile;
