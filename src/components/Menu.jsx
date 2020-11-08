import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../App';
import styled from 'styled-components';
import { dbService } from '../fBase';
import Post from './Post';

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuSelector = styled.div`
  width: 60%;
  height: 75px;
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

export default function Menu({ userObj }) {
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);
  const [select, setSelect] = useState('collection');

  useEffect(() => {
    dbService.collection('paints').onSnapshot((snapshot) => {
      const postArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArray);
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
            <span>Collection</span>
          </CollectionMenu>
          <GoodsMenu select={select} themeProps={theme} onClick={onGoodsClick}>
            <span>Goods</span>
          </GoodsMenu>
          <UploadMenu themeProps={theme}>작품 등록하기</UploadMenu>
        </MenuSelector>
        {/*<UploadContainer>
           
        </UploadContainer> */}
        <MenuGrid>
          {posts.map((post) => (
            <Post key={post.id} userObj={post}></Post>
          ))}
        </MenuGrid>
      </MenuContainer>
    </>
  );
}
