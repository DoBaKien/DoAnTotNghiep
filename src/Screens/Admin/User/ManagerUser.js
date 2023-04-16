import { Box, Typography } from "@mui/material";
import Header from "../../../Component/Admin/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../../Assert/data";
import { useContext } from "react";
import { AuthContext } from "../../../Component/Auth/AuthContext";
import { BoxHome, StackContent } from "../Style";
import LeftAdmin from "../../../Component/Admin/Left";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function ManagerUser({ role }) {
  const { show, setShow } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`/user/getAllUser`)
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const columns = [
    { field: "uid", headerName: "ID", flex: 0.5 },

    {
      field: "name",
      headerName: "Tên",
      flex: 1,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "location",
      headerName: "Địa chỉ",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Quyền",
      flex: 1,
    },
  ];
  function getRowId(row) {
    return row.uid;
  }
  return (
    <BoxHome color={"text.primary"}>
      <StackContent direction="row">
        {show && <LeftAdmin />}
        <Box sx={{ width: "100%" }}>
          <Header show={show} setShow={setShow} />
          <Box
            bgcolor={"background.default"}
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
              transition: "all 0.5 ease",
            }}
          >
            <Box sx={{ padding: "5px 5px 5px" }}>
              <Typography variant="h4">Quản lý người dùng</Typography>
            </Box>

            <Box
              height="80vh"
              sx={{ maxWidth: 1200, minWidth: 500, margin: "0 auto" }}
            >
              <DataGrid
                rows={users}
                getRowId={getRowId}
                columns={columns}
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
                experimentalFeatures={{ columnGrouping: true }}
              />
            </Box>
          </Box>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default ManagerUser;
