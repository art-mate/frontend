import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyPaintWrap = styled.div`
  margin: 5px;
`;

const MyPaintPhoto = styled.div`
  width: 250px;
  height: 250px;
`;

const MyPaintContent = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & span {
    color: #8c8c8c;
    cursor: pointer;

    &:hover {
      color: #363537;
    }
  }
`;

const MyPaint = ({ myPaint, paintId }) => {
  return (
    <>
      <MyPaintWrap>
        <MyPaintPhoto>
          <img src={myPaint.attachmentUrl} alt="mypaint" />
        </MyPaintPhoto>
        <MyPaintContent>
          <Link
            to={{
              pathname: '/editp',
              state: { myPaint, paintId },
            }}
          >
            <span>수정</span>
          </Link>
          <span>삭제</span>
        </MyPaintContent>
      </MyPaintWrap>
    </>
  );
};

export default MyPaint;
