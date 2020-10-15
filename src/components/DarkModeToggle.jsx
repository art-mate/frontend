import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import { lightTheme } from '../theme';

const ToggleButton = styled.button`
  position: fixed;
  width: 115px;
  height: 45px;
  right: 1.5rem;
  bottom: 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: ${(props) => props.themeProps.body === '#fcfcfc' ? props.themeProps.body:'#353535'};
  border: 1px solid ${(props) => props.themeProps.body === '#fcfcfc' ? 'rgba(0,0,0,.01)':'#353535'};
  color: ${(props) => props.themeProps.body === '#fcfcfc' ? '#363537':'#fcfcfc'};
  box-shadow: 2px 2px 10px rgba(0,0,0,.3);
  z-index: 10000;

  &:hover {
    filter: brightness(1.18);
    transform: translateY(-3px);
  }
`;

const Emoji = styled.figure`
  width: 33px;
  height: 33px;
  border-radius: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModeContent = styled.p`
  font-size: 0.8rem;
  margin-left: 5px;
`;

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButton onClick={toggleTheme} themeProps={theme}>
      {theme === lightTheme ? (
        <>
          <Emoji>
            <span role="img" aria-label="darkMoon">
              🌚
            </span>
          </Emoji>
          <ModeContent>다크 모드</ModeContent>
        </>
      ) : (
        <>
          <Emoji>
            <span role="img" aria-label="lightSun">
              🌞
            </span>
          </Emoji>
          <ModeContent>라이트 모드</ModeContent>
        </>
      )}
    </ToggleButton>
  );
}
