import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { dbService } from '../fBase';

const MyGoodsWrap = styled.div`
  margin: 5px;
`;

const MyGoodsPhoto = styled.div`
  width: 250px;
  height: 250px;
`;

const MyGoodsContent = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & span {
    color: #8c8c8c;
    cursor: pointer;
  }
`;

const MyGoods = ({ myGoods, goodsId }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?');
    if (ok) {
      await dbService
        .doc(`goods/${goodsId}`)
        .delete()
        .then(() => alert('삭제가 완료되었습니다.'));
    }
  };

  return (
    <>
      <MyGoodsWrap>
        <MyGoodsPhoto>
          <img src={myGoods.attachmentUrl} alt="myGoods" />
        </MyGoodsPhoto>
        <MyGoodsContent>
          <Link
            to={{
              pathname: '/editg',
              state: { myGoods, goodsId },
            }}
          >
            <span>수정</span>
          </Link>
          <span onClick={onDeleteClick} style={{ color: '#bd3333' }}>
            삭제
          </span>
        </MyGoodsContent>
      </MyGoodsWrap>
    </>
  );
};

export default MyGoods;
