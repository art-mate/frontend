import React, { createContext, useState } from 'react';
import Router from './Router';
import { GlobalStyle } from './global-styles';
import { useDarkMode } from './hooks/useDarkMode';
import { lightTheme, darkTheme } from './theme';

import { authService } from './fBase';

export const ThemeContext = createContext({
  theme: lightTheme,
  setTheme: () => {},
});

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <>
        <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
        <Router isLoggedIn={isLoggedIn}/>
      </>
    </ThemeContext.Provider>
  );
}

export default App;
