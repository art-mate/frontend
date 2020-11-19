import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import { dbService } from '../fBase';
import { useHistory } from 'react-router-dom';

const CardWrap = styled.div`
  width: 700px;
  height: 200px;
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const CardCheckWrap = styled.div`
  width: 100px;
  height: 200px;
  color: #ce1818;
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CardPhotoWrap = styled.div`
  width: 200px;
  height: 200px;
  & img {
    border-radius: 100%;
  }
`;

const CardInfoWrap = styled.div`
  width: 400px;
  height: 200px;
  padding: 20px;
`;

const CardDetail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  font-size: 13px;
  background: ${(props) => props.themeProps.navBar};
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.2);
`;

const SubTitle = styled.span`
  color: #8c8c8c;
`;

const Content = styled.span`
  margin-left: 10px;
`;

const DetailWrap = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

const CartCard = ({ artData, artId, isPaint, userObj, getArts }) => {
  const { theme } = useContext(ThemeContext);
  const history = useHistory();

  const onCancelClick = async () => {
    const carts = artData.cart;
    const idx = carts.indexOf(userObj.uid);
    if (idx > -1) carts.splice(idx, 1);

    if (isPaint) {
      await dbService
        .doc(`paints/${artId}`)
        .update({ cart: carts })
        .then(() => getArts());
    } else {
      await dbService.doc(`goods/${artId}`).update({ cart: carts });
    }
  };

  return (
    <CardWrap>
      <CardPhotoWrap>
        <img src={artData.attachmentUrl} />
      </CardPhotoWrap>
      <CardInfoWrap>
        <CardDetail themeProps={theme}>
          <DetailWrap>
            <SubTitle>작품명</SubTitle>
            <Content>{artData.name}</Content>
          </DetailWrap>
          <DetailWrap>
            <SubTitle>작가명</SubTitle>
            <Content>{artData.artist}</Content>
          </DetailWrap>
          <DetailWrap>
            <SubTitle>제작년도</SubTitle>
            <Content>{artData.year}</Content>
          </DetailWrap>
          <DetailWrap>
            <SubTitle>가격</SubTitle>
            <Content>{artData.price}원</Content>
          </DetailWrap>
        </CardDetail>
      </CardInfoWrap>
      <CardCheckWrap>
        <span onClick={onCancelClick}>취소</span>
      </CardCheckWrap>
    </CardWrap>
  );
};

export default CartCard;
