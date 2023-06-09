import {
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
import { BoxHome, ExpandableCell, StackContent } from "../Style";
import LeftAdmin from "../../../Component/Admin/Left";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ValueDate } from "../../../Assert/Style";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function ManagerQuest() {
  const { show, setShow } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const cookie = Cookies.get("sessionCookie");
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
    window.open(`/DoAnTotNghiep/#/post/${params.id}`, "_blank");
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Một khi đã xóa thì không thể hoàn tác",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: "true",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/question/delete/${id}/${cookie}`)
          .then(function (response) {
            Swal.fire("Đã xóa!", "Bài viết đã xóa", "success");
            axios
              .get("/question/getAllQuestionDTO")
              .then(function (response) {
                setQuestions(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.4,
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      flex: 2,
      renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "name",
      headerName: "Người đăng",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 0.6,
    },
    {
      field: "accept",
      headerName: "Trả lời",
      type: "boolean",
      flex: 0.6,
    },
    {
      field: "vote",
      headerName: "Số vote",
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Ngày đăng",
      flex: 1,
      renderCell: (params) => <ValueDate {...params} />,
    },
    {
      field: "actions",
      headerName: "Action",
      type: "actions",
      flex: 0.4,
      getActions: (params) => {
        let actions = [
          <>
            <Tooltip title="Xóa" placement="left">
              <IconButton onClick={() => handleDelete(params.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>,
        ];

        return actions;
      },
    },
  ];

  const datatable = () => {
    if (Array.isArray(questions) && questions.length !== 0) {
      return (
        <Box height="80vh" width="99%">
          <DataGrid
            rowHeight={50}
            rows={questions.map((item) => ({
              id: item.question.qid,
              title: item.question.title,
              name: item.user.name,
              status: item.question.status,
              date: item.question.date,
              vote: item.questionVote,
              accept: item.acceptAnswerAvailable,
            }))}
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
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
                  fields: ["qid", "title", "name", "status", "vote", "date"],
                  utf8WithBom: true,
                  fileName: "TableQuestionData",
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
