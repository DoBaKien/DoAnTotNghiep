import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Header from "../../../Component/Admin/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext } from "react";
import { AuthContext } from "../../../Component/Auth/AuthContext";
import { BoxHome, ExpandableCell, StackContent } from "../Style";
import LeftAdmin from "../../../Component/Admin/Left";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ValueDate } from "../../../Assert/Style";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Swal from "sweetalert2";
function ReportQ() {
  const { show, setShow } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState([]);
  useEffect(() => {
    axios
      .get("/question/getQuestionReport")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleOnCellClick = (params) => {
    console.log(params);
  };

  const handleDone = () => {
    if (select === []) {
      axios
        .put("/answer/editReport", select)
        .then(function (response) {
          axios
            .get("/answer/getAnswerReport")
            .then(function (response) {
              Swal.fire("Thành công", "Chuyển thành công", "question");
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Swal.fire("", "Vui lòng chọn bài tố cáo", "question");
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.4,
    },
    {
      field: "detail",
      headerName: "Nội dung",
      flex: 0.6,
      renderCell: (params) => <ExpandableCell {...params} />,
    },

    {
      field: "status",
      headerName: "Trạng thái",
      flex: 0.6,
    },
    {
      field: "name",
      headerName: "Người tố cáo",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Ngày đăng",
      flex: 1,
      renderCell: (params) => <ValueDate {...params} />,
    },
  ];

  const datatable = () => {
    if (Array.isArray(data) && data.length !== 0) {
      return (
        <Box height="80vh" width="99%">
          <DataGrid
            rowHeight={50}
            rows={data.map((item) => ({
              id: item.questionReport.rqid,
              detail: item.questionReport.detail,
              name: item.user.name,
              status: item.questionReport.status,
              date: item.questionReport.date,
              qid: item.questionReport.qid,
            }))}
            checkboxSelection
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            components={{
              Toolbar: GridToolbar,
            }}
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            onRowSelectionModelChange={(id) => {
              setSelect(id);
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                csvOptions: {
                  fields: ["qid", "title", "name", "status", "vote", "date"],
                },
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
        <Box sx={{ width: "100%", minWidth: "70%" }}>
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
              <Typography variant="h4">Quản lý tố cáo câu hỏi</Typography>
            </Box>
            <Button
              size="small"
              startIcon={<CheckCircleIcon />}
              onClick={handleDone}
            >
              Chuyển trạng thái
            </Button>
            {datatable()}
          </Box>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default ReportQ;
