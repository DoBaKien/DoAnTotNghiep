import { useContext } from "react";
import { ThemeUseContext } from "./Component/Darkmode/ThemeUseContext";
import { ThemeProvider } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import Login from "./Screens/Login/Login";

import Home from "./Screens/Home/Home";
import SignUp from "./Screens/SignUp/SignUp";
import CreatePost from "./Screens/CreatePost/CreatePost";

function Router() {
  const context = useContext(ThemeUseContext);

  return (
    <ThemeProvider theme={context.darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </ThemeProvider>
  );
}

export default Router;
