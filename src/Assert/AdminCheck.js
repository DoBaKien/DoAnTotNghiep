import { Navigate } from "react-router-dom";
import AdminPage from "../Screens/Admin/AdminPage";
import ManagerUser from "../Screens/Admin/User/ManagerUser";
import ManagerQuest from "../Screens/Admin/Question/MangerQuest";
import ManagerTag from "../Screens/Admin/Tag/MangerTag";

export const AdminCheck = ({ role }) => {
  if (role !== "") {
    if (role === "Admin") {
      return <AdminPage />;
    } else {
      return <Navigate to="/" />;
    }
  }
};
export const UserPageCheck = ({ role }) => {
  if (role !== "") {
    if (role === "Admin") {
      return <ManagerUser />;
    } else {
      return <Navigate to="/" />;
    }
  }
};
export const QuestionPageCheck = ({ role }) => {
  if (role !== "") {
    if (role === "Admin") {
      return <ManagerQuest />;
    } else {
      return <Navigate to="/" />;
    }
  }
};
export const TagPageCheck = ({ role }) => {
  if (role !== "") {
    if (role === "Admin") {
      return <ManagerTag />;
    } else {
      return <Navigate to="/" />;
    }
  }
};
