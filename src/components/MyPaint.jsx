import React, { useState } from 'react';
import styled from 'styled-components';
import { dbService, storageService } from '../fBase';

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

const MyPaint = ({ myPaint }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <MyPaintWrap>
        <MyPaintPhoto>
          <img src={myPaint.attachmentUrl} alt="mypaint" />
        </MyPaintPhoto>
        <MyPaintContent>
          <span>수정</span>
          <span>삭제</span>
        </MyPaintContent>
      </MyPaintWrap>
    </>
  );
};

export default MyPaint;
