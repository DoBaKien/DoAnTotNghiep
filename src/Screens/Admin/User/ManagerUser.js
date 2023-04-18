import { Box, Typography } from "@mui/material";
import Header from "../../../Component/Admin/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext } from "react";
import { AuthContext } from "../../../Component/Auth/AuthContext";
import { BoxHome, StackContent } from "../Style";
import LeftAdmin from "../../../Component/Admin/Left";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function ManagerUser() {
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
  const rows = [
    {
      uid: "ZyyMhGnI9iXIMxUJRXjGEKQskqs2",
      name: "Snow",
      location: "Jon",
      role: "Admin",
    },
    {
      uid: "ayyMhGnI9iXIMxUJRXjGEKQskqs2",
      name: "Lannister",
      role: "User",
      location: "Cersei",
    },
    {
      uid: "syyMhGnI9iXIMxUJRXjGEKQskqs2",
      name: "Lannister",
      role: "User",
      location: "Jaime",
    },
    {
      uid: "cyyMhGnI9iXIMxUJRXjGEKQskqs2",
      name: "Stark",
      role: "User",
      location: "Arya",
    },
    {
      uid: "s2yMhGnI9iXIMxUJRXjGEKQskqs2",
      name: "Targaryen",
      role: "User",
      location: "Bà Rịa - Vùng Tàu",
      email: "kiendoba1905@gmail.com",
    },
  ];
  const columns = [
    { field: "uid", headerName: "ID", width: 280 },
    {
      field: "name",
      headerName: "Tên",
      width: 280,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "location",
      headerName: "Địa chỉ",
      width: 180,
    },
    {
      field: "role",
      headerName: "Quyền",
      width: 120,
    },
  ];
  function getRowId(row) {
    return row.uid;
  }

  const datatable = () => {
    if (Array.isArray(users) && users.length !== 0) {
      return (
        <Box
          height="80vh"
          // sx={{ maxWidth: 1200, minWidth: 500, margin: "0 auto" }}
        >
          <DataGrid
            rowHeight={50}
            getRowId={getRowId}
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            checkboxSelection
            components={{
              Toolbar: GridToolbar,
            }}
            initialState={{
              ...users.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                csvOptions: { fields: ["name", "location", "role", "uid"] },
              },
            }}
            getRowHeight={() => "auto"}
            sx={{
              "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                py: 1,
              },
              "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                py: "8px",
              },
              "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                py: "10px",
              },
            }}
          />
        </Box>
      );
    }
  };

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
            {datatable()}
          </Box>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default ManagerUser;
