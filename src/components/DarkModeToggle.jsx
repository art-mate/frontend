import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
`;

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button onClick={toggleTheme}>{theme === 'light' ? '🌚' : '🌞'}</Button>
  );
}
