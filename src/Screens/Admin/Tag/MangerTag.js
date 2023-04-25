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
import { BoxHome, ExpandableCell, StackContent } from "../Style";
import LeftAdmin from "../../../Component/Admin/Left";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
function ManagerTag() {
  const { show, setShow } = useContext(AuthContext);

  const [tags, setTags] = useState("");

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

  const columns = [
    { field: "tid", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Tên",
      width: 300,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 500,
      renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "actions",
      headerName: "Action",
      type: "actions",
      width: 100,
      getActions: (params) => {
        let actions = [
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Vô hiệu quá"
            showInMenu
            onClick={() => {}}
          />,
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
        <Box height="80vh">
          <DataGrid
            rowHeight={50}
            getRowId={getRowId}
            rows={tags}
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            checkboxSelection
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
              <Typography variant="h4">Quản lý thẻ</Typography>
            </Box>
            {datatable()}
          </Box>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default ManagerTag;
