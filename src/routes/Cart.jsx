import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import CartCard from '../components/CartCard';
import { ThemeContext } from '../App';
import { dbService } from '../fBase';

const CartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CartWrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  margin: 100px 30px 30px 30px;
`;

const PriceWrap = styled.div`
  width: 700px;
  height: 200px;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 80px;
  margin-top: 40px;
  border-top: 1px solid;
`;

const PayButton = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 30px;
  font-size: 14px;
  color: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? '#ce1818' : '#fcfcfc'};
  background: none;
  border: 1px solid
    ${(props) => (props.themeProps.body === '#fcfcfc' ? '#ce1818' : '#fcfcfc')};
  &:hover {
    background: ${(props) =>
      props.themeProps.body === '#fcfcfc' ? '#ce1818' : '#fcfcfc'};
    color: ${(props) =>
      props.themeProps.body === '#fcfcfc' ? '#fcfcfc' : '#363537'};
    transition: all 0.1s ease-in-out;
  }
`;

const Price = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotImage = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Cart = ({ userObj }) => {
  const [paintsCart, setPaintsCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getArts();
  }, []);

  useEffect(() => {
    getTotalPrice();
  }, [paintsCart]);

  const getArts = async () => {
    const paintRef = await dbService
      .collection('paints')
      .get()
      .then((snapshot) => snapshot.docs);

    const goodsRef = await dbService
      .collection('goods')
      .get()
      .then((snapshot) => snapshot.docs);

    const paintData = paintRef
      .map((doc) => [doc.id, true].concat(doc.data()))
      .filter((paint) => paint[2].cart.includes(userObj.uid));
    const goodsData = goodsRef
      .map((doc) => [doc.id, false].concat(doc.data()))
      .filter((goods) => goods[2].cart.includes(userObj.uid));

    setPaintsCart(paintData.concat(goodsData));
  };

  const getTotalPrice = () => {
    let price = 0;
    if (paintsCart) {
      for (let i = 0; i < paintsCart.length; i++) {
        price += parseInt(paintsCart[i][2].price);
      }
    }
    setTotalPrice(price);
  };

  return (
    <>
      <Navigation userObj={userObj} />
      <CartContainer>
        <Head>
          장바구니
          <span role="img" aria-label="cart" style={{ marginLeft: '20px' }}>
            🛒
          </span>
        </Head>
        <CartWrap>
          {paintsCart ? (
            paintsCart.map((paint) => (
              <CartCard
                key={paint[0]}
                artData={paint[2]}
                artId={paint[0]}
                isPaint={paint[1]}
                userObj={userObj}
                getArts={getArts}
              />
            ))
          ) : (
            <NotImage>
              <span style={{ fontSize: '1.5rem' }}>
                아직 등록한 작품이 없습니다 🙅
              </span>
            </NotImage>
          )}
        </CartWrap>
        <PriceWrap>
          <Price>{totalPrice} 원</Price>
          <PayButton themeProps={theme}>결제하기</PayButton>
        </PriceWrap>
      </CartContainer>
    </>
  );
};

export default Cart;
