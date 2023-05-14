import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Header from "../../../Component/Admin/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { AuthContext } from "../../../Component/Auth/AuthContext";
import { BoxHome, ExpandableCell, StackContent } from "../Style";
import LeftAdmin from "../../../Component/Admin/Left";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalBox from "./ModalBox";
import ModalEdit from "./ModalEdit";

function ManagerTag() {
  const { show, setShow } = useContext(AuthContext);
  const [tags, setTags] = useState("");
  const [modal, setModal] = useState(false);
  const [modalE, setModalE] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    axios
      .get("/tag/getAllTag")
      .then(function (response) {
        setTags(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleEdit = (value) => {
    setId(value);
    setModalE(!modalE);
  };

  const columns = [
    { field: "tid", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 2,
      renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "actions",
      headerName: "Action",
      type: "actions",
      flex: 0.6,
      getActions: (params) => {
        let actions = [
          <>
            <Tooltip title="Xóa thẻ" placement="left">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa thẻ" placement="right">
              <IconButton onClick={() => handleEdit(params.id)}>
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Tooltip>
          </>,
        ];

        return actions;
      },
    },
  ];

  function getRowId(row) {
    return row.tid;
  }

  const datatable = () => {
    if (Array.isArray(tags) && tags.length !== 0) {
      return (
        <Box height="80vh" width="99%">
          <DataGrid
            rowHeight={50}
            getRowId={getRowId}
            rows={tags}
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            checkboxSelection
            onRowSelectionModelChange={(id) => {
              console.log(id);
            }}
            components={{
              Toolbar: GridToolbar,
            }}
            initialState={{
              ...tags.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                csvOptions: { fields: ["tid", "name", "description"] },
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
              <Typography variant="h4">Quản lý thẻ</Typography>
            </Box>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setModal(!modal)}
            >
              Thêm thẻ
            </Button>
            <ModalBox setModal={setModal} modal={modal} />
            <ModalEdit setModalE={setModalE} modalE={modalE} id={id} />
            {datatable()}
          </Box>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default ManagerTag;
