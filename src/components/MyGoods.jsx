import React, { useState } from 'react';
import styled from 'styled-components';
import { dbService, storageService } from '../fBase';

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

    &:hover {
      color: #363537;
    }
  }
`;

const MyGoods = ({ myGoods }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <MyGoodsWrap>
        <MyGoodsPhoto>
          <img src={myGoods.attachmentUrl} alt="myGoods" />
        </MyGoodsPhoto>
        <MyGoodsContent>
          <span>수정</span>
          <span>삭제</span>
        </MyGoodsContent>
      </MyGoodsWrap>
    </>
  );
};

export default MyGoods;
