import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
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
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ModalEdit from "./ModalEdit";

function ManagerUser() {
  const { show, setShow } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [id, setId] = useState("");
  const [modal, setModal] = useState(false);

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
    axios
      .post(`/account/admin/adminClaim/${id}`)
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
  };
  const handleRoleUser = (id) => {
    axios
      .post(`/account/admin/userClaim/${id}`)
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
  };
  const handleEdit = (value) => {
    setId(value);
    setModal(!modal);
  };

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
            <Tooltip title="Sửa ngươi dùng" placement="left">
              <IconButton onClick={() => handleEdit(params.id)}>
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Tooltip>
          </>,
          <GridActionsCellItem
            icon={<PersonOffIcon />}
            label="Vô hiệu quá"
            showInMenu
            onClick={() => {}}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Xóa người dùng"
            showInMenu
            onClick={() => {}}
          />,
        ];

        if (params.row.role === "User") {
          actions.push(
            <GridActionsCellItem
              icon={<SecurityIcon />}
              label="Cấp Quyền Admin"
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
              label="Cấp Quyền User"
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
  const navigate = useNavigate();
  const handleOnCellClick = (params) => {
    navigate(`/profile/${params.id}`);
  };
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
            <ModalEdit setModal={setModal} modal={modal} id={id} />
            {datatable()}
          </Box>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default ManagerUser;
