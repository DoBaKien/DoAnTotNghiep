import { useState, createContext, useEffect } from "react";
import { createTheme } from "@mui/material";

const ThemeUseContext = createContext();

function ThemeProvider({ children }) {
  if (localStorage.getItem("mode") === null) {
    localStorage.setItem("mode", "light");
  }


  const [theme, setTheme] = useState(localStorage.getItem("mode"));

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    localStorage.setItem("mode", theme);
  }, [theme])

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });



  const value = {
    toggle,
    darkTheme,
  }


  return (
    <ThemeUseContext.Provider value={value}>{children}</ThemeUseContext.Provider>
  );
}

export { ThemeUseContext, ThemeProvider };
