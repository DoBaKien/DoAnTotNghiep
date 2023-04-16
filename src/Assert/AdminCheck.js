import { Navigate } from "react-router-dom";
import AdminPage from "../Screens/Admin/AdminPage";


function AdminCheck({ role }) {
  if (role !== "") {
    if (role === "Admin") {
      return <AdminPage />;
    } else {
      return <Navigate to="/" />;
    }
  }
}

export default AdminCheck;
