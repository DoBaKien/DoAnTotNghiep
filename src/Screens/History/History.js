import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import { BoxContent, StackContent } from "./Style";
import { BoxHome, ValueDate } from "../../Assert/Style";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

function History() {
  const { id } = useParams();
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    const getQuestionDetailByQid = async () => {
      try {
        const response = await axios.get(
          `question/getQuestionActivityHistory/${id}`
        );
        setDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestionDetailByQid();
    axios
      .get(`question/getQuestionById/${id}`)
      .then(function (response) {
        setTitle(response.data.title);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Hành động",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 2,
    },
    {
      field: "username",
      headerName: "Người chỉnh sửa",
      flex: 2,
      renderCell: (params) => {
        const parts = params.value.split("///");

        return (
          <>
            <Avatar
              alt="Avatar"
              src={parts[1]}
              sx={{ width: 32, height: 32, marginRight: 1 }}
            />
            <>{parts[0]}</>
          </>
        );
      },
    },
    {
      field: "date",
      headerName: "Ngày sửa",
      flex: 1.2,
      renderCell: (params) => <ValueDate {...params} />,
    },
  ];
  const datatable = () => {
    if (Array.isArray(details) && details.length !== 0) {
      return (
        <Box height="70vh">
          <DataGrid
            rowHeight={50}
            rows={details.map((item) => ({
              id: item.questionActivityHistory.qahid,
              name: item.questionActivityHistory.action,
              description: item.questionActivityHistory.description,
              username: item.user.name + "///" + item.user.avatar,
              date: item.questionActivityHistory.date,
            }))}
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            checkboxSelection
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
        <BoxContent sx={{ width: "60vw" }}>
          <Typography variant="h4">Lịch sử chỉnh sửa</Typography>
          <Typography sx={{ marginTop: 1 }}>Tiêu để: {title}</Typography>
          <Box sx={{ width: "100%", marginTop: 2 }}>{datatable()}</Box>
        </BoxContent>
      </StackContent>
    </BoxHome>
  );
}

export default memo(History);
