import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../App';
import styled from 'styled-components';
import { dbService } from '../fBase';
import Post from './Post';
import { FcPicture, FcLightAtTheEndOfTunnel } from 'react-icons/fc';

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuSelector = styled.div`
  width: 40%;
  max-width: 700px;
  min-width: 400px;
  height: 70px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.2);
  background: ${(props) => props.themeProps.navBar};
`;

const CollectionMenu = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? '#cf2020' : '#fafafa'};
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.themeProps.body === '#fcfcfc' ? 'rgba(0,0,0,.1)' : '#4c4c4c'};
  }
`;

const GoodsMenu = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? '#cf2020' : '#fafafa'};
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.themeProps.body === '#fcfcfc' ? 'rgba(0,0,0,.1)' : '#4c4c4c'};
  }
`;

const MenuGrid = styled.div`
  max-width: 1100px;
  display: grid;
  margin-bottom: 60px;
  margin-top: 30px;
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 1150px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 770px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MenuIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    color: #828282;
    font-size: 13px;
    margin-left: 20px;
  }
`;

export default function Menu({ userObj }) {
  const { theme } = useContext(ThemeContext);
  const [collections, setCollections] = useState([]);
  const [goods, setGoods] = useState([]);
  const [select, setSelect] = useState('collection');

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

  return (
    <>
      <MenuContainer>
        <MenuSelector themeProps={theme}>
          <CollectionMenu
            select={select}
            themeProps={theme}
            onClick={onCollectionClick}
          >
            <MenuIcon>
              <FcPicture size={40} /> <span>Collection</span>
            </MenuIcon>
          </CollectionMenu>
          <GoodsMenu select={select} themeProps={theme} onClick={onGoodsClick}>
            <MenuIcon>
              <FcLightAtTheEndOfTunnel size={40} /> <span>Goods</span>
            </MenuIcon>
          </GoodsMenu>
        </MenuSelector>
        {select === 'collection' ? (
          <MenuGrid>
            {collections.map((collection) => (
              <Post
                key={collection.id}
                userObj={userObj}
                artData={collection}
                select={select}
              ></Post>
            ))}
          </MenuGrid>
        ) : (
          <MenuGrid>
            <>
              {goods.map((good) => (
                <Post
                  key={good.id}
                  userObj={userObj}
                  artData={good}
                  select={select}
                ></Post>
              ))}
            </>
          </MenuGrid>
        )}
      </MenuContainer>
    </>
  );
}
