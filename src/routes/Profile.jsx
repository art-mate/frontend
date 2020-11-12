import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { authService } from '../fBase';
import { Link } from 'react-router-dom';

const ProfileContainer = styled.div`
  width: 100%;
  height: 100vh;
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
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  & button {
    background: none;
    border: none;
    font-size: 1.2rem;
  }
`;

const MyPaintContainer = styled.div`
  width: 50%;
  height: 200px;
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

const Profile = ({ userObj }) => {
  // console.log(userObj);
  const history = useHistory();

  const onLogOutClick = async () => {
    const ok = window.confirm('로그아웃 하시겠습니까?');
    if (ok) {
      await authService.signOut().then(() => history.push('/'));
    }
  };
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
        <MyPaintContainer>
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
          <div>
            <span role="img" aria-labelledby="art">
              🎨
            </span>
            <button> 내 작품 보러가기</button>
          </div>
        </MyPaintContainer>
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
