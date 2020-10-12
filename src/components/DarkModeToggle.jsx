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
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Emoji = styled.figure`
  width: 33px;
  height: 33px;
  border-radius: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const ModeContent = styled.p`
  font-size: 0.8rem;
  color: white;
  margin-left: 5px;
  transition: all 0.5s ease-in-out;
`;

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButton onClick={toggleTheme}>
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
