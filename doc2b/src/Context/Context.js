import { React, createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') ? localStorage.getItem('darkMode') : false;
  });
  const [popUpOpen, setPopUpOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.getItem('darkMode') === 'false' ? setDarkMode(false) : setDarkMode(true);
  }, [darkMode]);
  return (
    <AppContext.Provider
      value={{ darkMode, setDarkMode, popUpOpen, setPopUpOpen }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };