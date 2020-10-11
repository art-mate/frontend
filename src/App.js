import React, { createContext } from 'react';
import Router from './Router';
import { GlobalStyle } from './global-styles';
import { useDarkMode } from './hooks/useDarkMode';
import { lightTheme, darkTheme } from './theme';

export const ThemeContext = createContext({
  theme: lightTheme,
  setTheme: () => {},
});

function App() {
  const [theme, toggleTheme] = useDarkMode();
  //console.log(theme);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <>
        <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
        <Router />
      </>
    </ThemeContext.Provider>
  );
}

export default App;
