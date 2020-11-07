import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../App';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { dbService } from '../fBase';

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuIntroduction = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

  span {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
`;

const SubHead = styled.h3`
  font-size: 2.2rem;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  font-weight: 900;
`;

const MenuGrid = styled.div`
  display: grid;
  margin-bottom: 80px;
  grid-column-gap: 2vw;
  grid-row-gap: 4vw;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 430px) {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 4vw;
  }
`;

const PhotoContainer = styled.figure`
  width: 23vw;
  height: 23vw;
  min-width: 170px;
  min-height: 170px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.5);
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  &:hover {
    transition: all 0.5s ease;
    transform: scale(1.02);
  }
  @media screen and (max-width: 430px) {
    min-width: 300px;
    min-height: 300px;
  }
`;

const PaintKind = styled.figcaption`
  width: 50%;
  height: 50px;
  background: ${(props) => props.themeProps.navBar};
  position: absolute;
  left: 50%;
  bottom: -7%;
  transform: translateX(-50%);
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
`;

export default function Menu({ userObj }) {
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const dbPosts = await dbService.collection('paints').get();
    dbPosts.forEach((document) => {
      const postObject = {
        ...document.data(),
        id: document.id,
      };
      setPosts((prev) => [document.data(), ...prev]);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navigation isLoggedIn={Boolean(userObj)} />
      <MenuContainer>
        <MenuIntroduction>
          <div>Collections Goods</div>
        </MenuIntroduction>
        <MenuGrid>
          <div>
            {posts.map((post) => (
              <div>
                <h4>{post.paint}</h4>
              </div>
            ))}
          </div>
        </MenuGrid>
      </MenuContainer>
    </>
  );
}
