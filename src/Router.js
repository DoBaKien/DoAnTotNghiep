import { useContext } from "react";
import { ThemeUseContext } from "./Component/Darkmode/ThemeUseContext";
import { ThemeProvider } from "@mui/system";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Screens/Login/Login";
import Home from "./Screens/Home/Home";
import SignUp from "./Screens/SignUp/SignUp";
import CreatePost from "./Screens/CreatePost/CreatePost";
import Tags from "./Screens/Tags/Tags";
import User from "./Screens/User/User";
import Profile from "./Screens/Profile/Profile";
import Follow from "./Screens/Follow/Follow";
import Post from "./Screens/Post/Post";
import EditPf from "./Screens/EditPf/EditPf";
import TagDetails from "./Screens/TagDetails/TagDetails";
import NotFound from "./Component/NotFound/NotFound";

import Cookies from "js-cookie";

function Router() {
  const context = useContext(ThemeUseContext);

  return (
    <ThemeProvider theme={context.darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            Cookies.get("sessionCookie") !== undefined ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/users" element={<User />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/post/:qid" element={<Post />} />
        <Route path="/editpf" element={<EditPf />} />
        <Route path="/tagdetail" element={<TagDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default Router;
