import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Header from "../../../Component/Admin/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext } from "react";
import { AuthContext } from "../../../Component/Auth/AuthContext";
import { BoxHome, StackContent } from "../Style";
import LeftAdmin from "../../../Component/Admin/Left";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import SecurityIcon from "@mui/icons-material/Security";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function ManagerUser() {
  const { show, setShow } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const cookies = Cookies.get("sessionCookie");
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

  const handleRoleAdmin = (id, role) => {
    Swal.fire({
      text: `Chắc chắn muốn cấp quyền cho người này không`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Chuyển",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (role === "User") {
          axios
            .post(`/account/admin/adminClaim/${id}/${cookies}`)
            .then(function (response) {
              Swal.fire("Thành công", "Cấp quyền Admin thành công", "success");
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
        } else {
          axios
            .post(`/account/admin/userClaim/${id}/${cookies}`)
            .then(function (response) {
              Swal.fire("Thành công", "Cấp quyền User thành công", "success");
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
        }
      }
    });
  };

  const columns = [
    { field: "uid", headerName: "ID", flex: 0.5 },
    {
      field: "avatar",
      headerName: "Ảnh",
      flex: 0.3,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            <Avatar>V</Avatar>
          ) : (
            <img src={params.value} alt="" height={50} width={50} />
          )}
        </>
      ),
    },
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
      flex: 0.8,
    },
    {
      field: "role",
      headerName: "Quyền",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Action",
      type: "actions",
      flex: 0.5,
      getActions: (params) => {
        let actions = [
          <>
            <Tooltip title="Chuyển quyền" placement="left">
              <IconButton
                onClick={() => handleRoleAdmin(params.id, params.row.role)}
              >
                <SecurityIcon />
              </IconButton>
            </Tooltip>
          </>,
        ];

        return actions;
      },
    },
  ];

  function getRowId(row) {
    return row.uid;
  }

  const handleOnCellClick = (params) => {
    window.open(`/DoAnTotNghiep/#/profile/${params.id}`, "_blank");
  };
  const datatable = () => {
    if (Array.isArray(users) && users.length !== 0) {
      return (
        <Box height="80vh" width="99%">
          <DataGrid
            rowHeight={150}
            rows={users}
            getRowId={getRowId}
            columns={columns}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={pageSize}
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
                  fileName: "TableUserData",
                },
              },
            }}
            initialState={{
              ...users.initialState,
            }}
            onCellDoubleClick={handleOnCellClick}
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
    } else {
      return (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
  };

  return (
    <BoxHome color={"text.primary"}>
      <StackContent direction="row">
        {show && <LeftAdmin />}
        <Box sx={{ width: "100%", minWidth: "70%" }}>
          <Header show={show} setShow={setShow} />
          <Box
            bgcolor={"background.default"}
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
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
