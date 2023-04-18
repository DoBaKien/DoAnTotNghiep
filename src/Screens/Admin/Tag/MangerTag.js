import { Box, Typography } from "@mui/material";
import Header from "../../../Component/Admin/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext } from "react";
import { AuthContext } from "../../../Component/Auth/AuthContext";
import { BoxHome, ExpandableCell, StackContent } from "../Style";
import LeftAdmin from "../../../Component/Admin/Left";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function ManagerTag() {
  const { show, setShow } = useContext(AuthContext);

  const [tags, setTags] = useState("");

  useEffect(() => {
    axios
      .get("/tag/getAllTag")
      .then(function (response) {
        setTags(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const columns = [
    { field: "tid", headerName: "ID", width: 280 },
    {
      field: "name",
      headerName: "Tên",
      width: 300,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 450,
      renderCell: (params) => <ExpandableCell {...params} />,
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
