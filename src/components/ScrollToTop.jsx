import React, { useContext } from 'react';
import styled from 'styled-components';
import { BiArrowToTop } from 'react-icons/bi';
import { ThemeContext } from '../App';

const ScrollToTopButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 100%;
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? props.themeProps.body : '#353535'};
  border: 1px solid
    ${(props) =>
      props.themeProps.body === '#fcfcfc' ? 'rgba(0,0,0,.01)' : '#353535'};
  color: ${(props) =>
    props.themeProps.body === '#fcfcfc' ? '#363537' : '#fcfcfc'};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 10000;

  &:hover {
    background: ${(props) =>
      props.themeProps.body === '#fcfcfc'
        ? props.themeProps.mainColor
        : '#3f3f3f'};
    svg {
      color: #fcfcfc;
    }
  }
`;

export default function ScrollToTop() {
  const handleScrollControll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const { theme } = useContext(ThemeContext);
  return (
    <ScrollToTopButton themeProps={theme} onClick={handleScrollControll}>
      <BiArrowToTop size="20" />
    </ScrollToTopButton>
  );
}
