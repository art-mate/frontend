import React, { createContext } from 'react';
import Router from './Router';
import { GlobalStyle } from './global-styles';
import { useDarkMode } from './hooks/useDarkMode';
import { lightTheme, darkTheme } from './theme';

export const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
});

function App() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <>
        <GlobalStyle theme={theme === 'light' ? lightTheme : darkTheme} />
        <Router />
      </>
    </ThemeContext.Provider>
  );
}

export default App;
