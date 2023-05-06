import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import { BoxContent, StackContent } from "./Style";
import { BoxHome } from "../../Assert/Style";
import { Box, CircularProgress, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ExpandableCell } from "../Admin/Style";

function History() {
  const { type, id } = useParams();
  const [details, setDetails] = useState("");
  useEffect(() => {
    const getQuestionDetailByQid = async () => {
      try {
        const response = await axios.get(
          `question/getQuestionActivityHistory/${id}`
        );
        setDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestionDetailByQid();
  }, [id]);
  console.log(type, id);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 2,
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
  ];
  const datatable = () => {
    if (Array.isArray(details) && details.length !== 0) {
      return (
        <Box height="80vh">
          <DataGrid
            rowHeight={50}
            // rows={details}
            rows={details.map((item, index) => ({
              id: item.questionActivityHistory.qahid,
              name: item.questionActivityHistory.action,
            }))}
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            checkboxSelection
            components={{
              Toolbar: GridToolbar,
            }}
            initialState={{
              ...details.initialState,
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
      <Header />
      <StackContent direction="row" sx={{ marginTop: 2 }}>
        <LeftSide></LeftSide>
        <BoxContent sx={{ width: { xs: "100vw", lg: "60vw" } }}>
          <Typography variant="h4">Thẻ</Typography>
          <Box sx={{ width: "100%", marginTop: 2 }}>{datatable()}</Box>
        </BoxContent>
      </StackContent>
    </BoxHome>
  );
}

export default memo(History);
