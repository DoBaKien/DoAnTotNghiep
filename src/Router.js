import { useContext } from "react";
import { ThemeUseContext } from "./Component/Darkmode/ThemeUseContext";
import { ThemeProvider } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import Login from "./Screens/Login/Login";

import Home from "./Screens/Home/Home";

function Router() {
  const context = useContext(ThemeUseContext);

  return (
    <ThemeProvider theme={context.darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default Router;
