import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../App';
import styled from 'styled-components';
import { dbService } from '../fBase';

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuSelector = styled.div`
  width: 85%;
  height: 150px;
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

  div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const UploadContainer = styled.div`
  width: 85%;
  height: 100px;
  background: aliceblue;
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

const PostContainer = styled.div`
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

  return (
    <>
      <MenuContainer>
        <MenuSelector>
          <div>Collections</div>
          <div>Goods</div>
        </MenuSelector>
        <UploadContainer>
          <div>작품 등록하기</div>
        </UploadContainer>
        <MenuGrid>
          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <h4>{post.paintName}</h4>
                <h4>{post.artist}</h4>
                <h4>{post.description}</h4>
                <h4>{post.price}</h4>
                {post.attachmentUrl && (
                  <img
                    src={post.attachmentUrl}
                    alt="attachment"
                    width="50px"
                    height="50px"
                  />
                )}
              </div>
            ))}
          </div>
        </MenuGrid>
      </MenuContainer>
    </>
  );
}
