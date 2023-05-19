import { Navigate } from "react-router-dom";

import ManagerUser from "../Screens/Admin/User/ManagerUser";
import ManagerQuest from "../Screens/Admin/Question/MangerQuest";
import ManagerTag from "../Screens/Admin/Tag/MangerTag";
import DashBoard from "../Screens/Admin/DashBoard/DashBoard";
import ReportA from "../Screens/Admin/Report/ReportA";
import ReportQ from "../Screens/Admin/Report/ReportQ";
import ReportC from "../Screens/Admin/Report/ReportC";

export const AdminCheck = ({ role }) => {
  if (role !== "") {
    if (role === "Admin") {
      return <DashBoard />;
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
export const ReportAPageCheck = ({ role }) => {
  if (role !== "") {
    if (role === "Admin") {
      return <ReportA />;
    } else {
      return <Navigate to="/" />;
    }
  }
};
export const ReportQPageCheck = ({ role }) => {
  if (role !== "") {
    if (role === "Admin") {
      return <ReportQ />;
    } else {
      return <Navigate to="/" />;
    }
  }
};
export const ReportCPageCheck = ({ role }) => {
  if (role !== "") {
    if (role === "Admin") {
      return <ReportC />;
    } else {
      return <Navigate to="/" />;
    }
  }
};
