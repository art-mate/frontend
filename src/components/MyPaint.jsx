import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { dbService } from '../fBase';

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
  const onDeleteClick = async () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?');
    if (ok) {
      await dbService
        .doc(`paints/${paintId}`)
        .delete()
        .then(() => alert('삭제가 완료되었습니다.'));
    }
  };
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
          <span onClick={onDeleteClick}>삭제</span>
        </MyPaintContent>
      </MyPaintWrap>
    </>
  );
};

export default MyPaint;
