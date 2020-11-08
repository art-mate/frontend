import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../App';
import styled from 'styled-components';
import { dbService } from '../fBase';
import Post from './Post';
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuSelector = styled.div`
  width: 50%;
  height: 70px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.4);
  background: ${(props) => props.themeProps.navBar};
`;

const CollectionMenu = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  color: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? '#e6328d' : '#fafafa'};

  & span {
    cursor: pointer;
  }
`;

const GoodsMenu = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  color: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? '#e6328d' : '#fafafa'};
  & span {
    cursor: pointer;
  }
`;

const UploadContainer = styled.div`
  width: 85%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuGrid = styled.div`
  width: 80%;
  display: grid;
  margin-bottom: 60px;
  margin-top: 30px;
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (max-width: 430px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const UploadMenu = styled.div`
  width: 30%;
  height: 100%;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? '#e6328d' : '#fafafa'};
`;

const SelectModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 60%;
  height: 80%;
  background: white;
  transform: translateX(-50%) translateY(-50%);
`;

export default function Menu({ userObj }) {
  const { theme } = useContext(ThemeContext);
  const [collections, setCollections] = useState([]);
  const [goods, setGoods] = useState([]);
  const [select, setSelect] = useState('collection');
  const [selectModal, setSelectModal] = useState(false);

  useEffect(() => {
    dbService.collection('paints').onSnapshot((snapshot) => {
      const postArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCollections(postArray);
    });
    dbService.collection('goods').onSnapshot((snapshot) => {
      const postArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoods(postArray);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onCollectionClick = () => {
    setSelect('collection');
  };

  const onGoodsClick = () => {
    setSelect('goods');
  };

  const handleClick = () => {
    alert('로그인이 필요한 서비스입니다 🙅');
  };

  const uploadSelect = () => {
    setSelectModal((prev) => !prev);
  };

  return (
    <>
      <MenuContainer>
        <MenuSelector themeProps={theme}>
          <CollectionMenu
            select={select}
            themeProps={theme}
            onClick={onCollectionClick}
          >
            <span>Collection</span>
          </CollectionMenu>
          <GoodsMenu select={select} themeProps={theme} onClick={onGoodsClick}>
            <span>Goods</span>
          </GoodsMenu>
        </MenuSelector>
        {select === 'collection' ? (
          <MenuGrid>
            {collections.map((collection) => (
              <Post key={collection.id} userObj={collection}></Post>
            ))}
          </MenuGrid>
        ) : (
          <MenuGrid>
            {goods.map((good) => (
              <Post key={good.id} userObj={good}></Post>
            ))}
          </MenuGrid>
        )}
      </MenuContainer>
    </>
  );
}
