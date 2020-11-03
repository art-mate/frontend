import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { authService } from '../fBase';

const ProfileContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & span {
    font-size: 2rem;
  }
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & span {
    margin: 5px;
    font-size: 1rem;
  }
  & img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    margin-right: 20px;
  }
`;

const MenuContainer = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const MenuWrap = styled.div`
  width: 350px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: tomato;
  margin: 10px;
`;

const Profile = ({ userObj }) => {
  console.log(userObj);
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut().then(
      history.push('/')
    );
  }

  return (
    <>
      <ProfileContainer>
        <InfoContainer>
          <span>안녕하세요</span>
          <span role='img' aria-labelledby='art' style={{fontWeight:'bold'}}>{userObj.displayName}님 🧑‍🎨</span>
          <InfoWrap>
            <img src={userObj.photoURL} alt='profile' />
            <span>{userObj.email}</span>
          </InfoWrap>
        </InfoContainer>
        <MenuContainer>
          <MenuWrap>
            <button onClick={onLogOutClick}>로그아웃</button>
          </MenuWrap>
        </MenuContainer>
      </ProfileContainer>
    </>
  )
};

export default Profile;