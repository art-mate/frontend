import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import PaintUpload from './PaintUpload';

const UploadButton = styled.button`
  position: fixed;
  width: 200px;
  height: 50px;
  left: 50%;
  bottom: 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? props.themeProps.body : '#353535'};
  border: 1px solid
    ${(props) =>
      props.themeProps.body === '#fcfcfc' ? 'rgba(0,0,0,.01)' : '#353535'};
  color: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? '#363537' : '#fcfcfc'};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 10000;
  transform: translateX(-50%);
  font-size: 14px;

  &:hover {
    filter: brightness(
      ${(props) => (props.themeProps.body === '#fcfcfc' ? '0.9' : '1.13')}
    );
  }
`;

const UploadToggle = ({ userObj }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleClick = () => {
    alert('로그인이 필요한 서비스입니다 🙅');
  };

  return (
    <>
      {userObj ? (
        <Link to="/upload">
          <UploadButton themeProps={theme}>작품 업로드하기</UploadButton>
        </Link>
      ) : (
        <UploadButton themeProps={theme} onClick={handleClick}>
          작품 업로드하기
        </UploadButton>
      )}
    </>
  );
};

export default UploadToggle;
