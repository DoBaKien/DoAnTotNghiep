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
import { AuthContext } from "./Component/Auth/AuthContext";
import {
  AdminCheck,
  QuestionPageCheck,
  ReportAPageCheck,
  ReportCPageCheck,
  ReportQPageCheck,
  TagPageCheck,
  UserPageCheck,
} from "./Assert/AdminCheck";
import History from "./Screens/History/History";
import EditPost from "./Screens/EditPost/EditPost";
import Setting from "./Screens/Setting/Setting";
import Report from "./Screens/Report/Report";
import Find from "./Screens/Home/Find";

function Router() {
  const context = useContext(ThemeUseContext);
  const { role } = useContext(AuthContext);

  return (
    <ThemeProvider theme={context.darkTheme}>
      <Routes basename="/DoAnTotNghiep">
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
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/post/:qid" element={<Post />} />
        <Route path="/editpf/:id" element={<EditPf />} />
        <Route path="/tagdetail/:tid" element={<TagDetails />} />
        <Route path="/history/:type/:id" element={<History />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/edit/:type/:qid" element={<EditPost />} />
        <Route path="/report" element={<Report />} />
        <Route path="/find/:text" element={<Find />} />

        <Route path="/post/:qid/:type/:id" element={<Post />} />
        <Route path="/admin" element={<AdminCheck role={role} />} />
        <Route path="/manageruser" element={<UserPageCheck role={role} />} />
        <Route path="/managertag" element={<TagPageCheck role={role} />} />
        <Route
          path="/managerreportanswer"
          element={<ReportAPageCheck role={role} />}
        />
        <Route
          path="/managerreportquestion"
          element={<ReportQPageCheck role={role} />}
        />
        <Route
          path="/managerreportcomment"
          element={<ReportCPageCheck role={role} />}
        />
        <Route
          path="/managerquestion"
          element={<QuestionPageCheck role={role} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default Router;
