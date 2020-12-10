import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

const CommentBox = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const UserPhoto = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 10px;
  display: flex;
  jusfity-content: center;
  align-items: center;

  & img {
    border-radius: 100%;
  }
`;

const ContentWrap = styled.div`
  width: 300px;
  padding: 15px;
`;

const InfoWrap = styled.div`
  width: 100%;
  font-size: 13px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & span {
    color: #8c8c8c;
    margin-right: 5px;
  }
  & svg {
    cursor: pointer;
  }
`;

const CommentContent = styled.div`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.themeProps.body === '#fcfcfc' ? 'rgba(0,0,0,.1)' : '#929292'};
  font-size: 14px;
`;

export default function Comment({ commentObj }) {
  const { theme } = useContext(ThemeContext);

  return (
    <CommentBox>
      <UserPhoto>
        {commentObj.userPhoto ? (
          <img src={commentObj.userPhoto} alt="user" />
        ) : (
          <FaUserCircle size={44} />
        )}
      </UserPhoto>
      <ContentWrap>
        <InfoWrap>
          {commentObj.userName ? (
            <span>{commentObj.userName}</span>
          ) : (
            <span>{commentObj.userEmail}</span>
          )}
          <AiOutlineEllipsis size={23} />
        </InfoWrap>
        <CommentContent themeProps={theme}>{commentObj.comment}</CommentContent>
      </ContentWrap>
    </CommentBox>
  );
}
