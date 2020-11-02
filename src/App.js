import React, { createContext, useState, useEffect } from 'react';
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
  const [init, setInit] = useState(false);
  const [theme, toggleTheme] = useDarkMode();
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
    // console.log(authService.currentUser);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <>
        <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
        {init && <Router isLoggedIn={Boolean(userObj)} userObj={userObj}/>}
      </>
    </ThemeContext.Provider>
  );
}

export default App;
