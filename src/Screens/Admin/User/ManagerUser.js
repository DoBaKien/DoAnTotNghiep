import { Box, Typography } from "@mui/material";
import Header from "../../../Component/Admin/Header";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useContext } from "react";
import { AuthContext } from "../../../Component/Auth/AuthContext";
import { BoxHome, StackContent } from "../Style";
import LeftAdmin from "../../../Component/Admin/Left";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import SecurityIcon from "@mui/icons-material/Security";

import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
function ManagerUser() {
  const { show, setShow } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(10);
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

  const handleRoleAdmin = (id) => {
    console.log(id);
    axios
      .post(`/account/admin/adminClaim/${id}`)
      .then(function (response) {
        axios
          .get(`/user/getAllUser`)
          .then(function (response) {
            setUsers(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleRoleUser = (id) => {
    axios
      .post(`/account/admin/userClaim/${id}`)
      .then(function (response) {
        axios
          .get(`/user/getAllUser`)
          .then(function (response) {
            setUsers(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const columns = [
    { field: "uid", headerName: "ID", width: 200 },
    {
      field: "name",
      headerName: "Tên",
      width: 280,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
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
    {
      field: "actions",
      headerName: "Action",
      type: "actions",
      width: 80,
      getActions: (params) => {
        let actions = [
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Disable User"
            showInMenu
            onClick={() => {}}
          />,
        ];

        if (params.row.role === "User") {
          actions.push(
            <GridActionsCellItem
              icon={<SecurityIcon />}
              label="Quyền Admin"
              showInMenu
              onClick={() => {
                handleRoleAdmin(params.id);
              }}
            />
          );
        } else {
          actions.push(
            <GridActionsCellItem
              icon={<SecurityIcon />}
              label="Quyền User"
              showInMenu
              onClick={() => {
                handleRoleUser(params.id);
              }}
            />
          );
        }

        return actions;
      },
    },
  ];

  function getRowId(row) {
    return row.uid;
  }

  const datatable = () => {
    if (Array.isArray(users) && users.length !== 0) {
      return (
        <Box height="80vh">
          <DataGrid
            rowHeight={150}
            rows={users}
            getRowId={getRowId}
            columns={columns}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={pageSize}
            checkboxSelection
            components={{
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                csvOptions: {
                  fields: ["uid", "name", "location", "role"],
                  utf8WithBom: true,
                  fileName: "UserData",
                },
              },
            }}
            initialState={{
              ...users.initialState,
            }}
            getRowHeight={() => "auto"}
            sx={{
              "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                py: 1,
              },
              "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                py: "15px",
              },
              "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                py: "22px",
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
