import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "../../../Component/Admin/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext } from "react";
import { AuthContext } from "../../../Component/Auth/AuthContext";
import { BoxHome, ExpandableCell, StackContent, ValueDate } from "../Style";
import LeftAdmin from "../../../Component/Admin/Left";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ManagerQuest() {
  const { show, setShow } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/question/getAllQuestionDTO")
      .then(function (response) {
        setQuestions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleOnCellClick = (params) => {
    navigate(`/post/${params.id}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      width: 280,
      editable: true,
      renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "name",
      headerName: "Người đăng",
      width: 300,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
    },
    {
      field: "date",
      headerName: "Ngày đăng",
      width: 180,
      renderCell: (params) => <ValueDate {...params} />,
    },
  ];

  const datatable = () => {
    if (Array.isArray(questions) && questions.length !== 0) {
      return (
        <Box height="80vh">
          <DataGrid
            rowHeight={50}
            rows={questions.map((item, index) => ({
              id: index,
              title: item.question.title,
              name: item.user.name,
              status: item.question.status,
              date: item.question.date,
            }))}
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            checkboxSelection
            components={{
              Toolbar: GridToolbar,
            }}
            initialState={{
              ...questions.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                csvOptions: {
                  fields: ["qid", "title", "name", "status", "date"],
                },
              },
            }}
            getRowHeight={() => "auto"}
            sx={{
              width: "98%",
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
            onCellDoubleClick={handleOnCellClick}
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
              <Typography variant="h4">Quản lý câu hỏi</Typography>
            </Box>
            {datatable()}
          </Box>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default ManagerQuest;
