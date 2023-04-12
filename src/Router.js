import { useContext } from "react";
import { ThemeUseContext } from "./Component/Darkmode/ThemeUseContext";
import { ThemeProvider } from "@mui/system";
import { Route, Routes } from "react-router-dom";
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

function Router() {
  const context = useContext(ThemeUseContext);

  return (
    <ThemeProvider theme={context.darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/users" element={<User />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/post" element={<Post />} />
        <Route path="/editpf" element={<EditPf />} />
        <Route path="/tagdetail" element={<TagDetails />} />
      </Routes>
    </ThemeProvider>
  );
}

export default Router;
