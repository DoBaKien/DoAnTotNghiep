import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";

function ReportA() {
  const { show, setShow } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState([]);
  const cookie = Cookies.get("sessionCookie");
  useEffect(() => {
    axios
      .get(`/answer/getAnswerReport/${cookie}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [cookie]);
  const handleOnCellClick = (params) => {
    if (params.row.aid !== "Câu trả lời đã bị xoá") {
      window.open(`/post/${params.row.qid}/answer/${params.row.aid}`, "_blank");
    }
  };

  const handleDeleteList = () => {
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
        if (select !== []) {
          axios
            .put(`/answer/deleteListReport/${cookie}`, select)
            .then(function (response) {
              axios
                .get(`/answer/getAnswerReport/${cookie}`)
                .then(function (response) {
                  setData(response.data);
                  Swal.fire("Thành công", "Xóa thành công", "question");
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
      }
    });
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
          .delete(`/answer/deleteReport/${id}/${cookie}`)
          .then(function (response) {
            axios
              .get(`/answer/getAnswerReport/${cookie}`)
              .then(function (response) {
                setData(response.data);
                Swal.fire("Đã xóa!", "Tố cáo đã xóa", "success");
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

  const handleDone = () => {
    if (select !== []) {
      axios
        .put(`/answer/editReport/${cookie}`, select)
        .then(function (response) {
          axios
            .get(`/answer/getAnswerReport/${cookie}`)
            .then(function (response) {
              setData(response.data);
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
      headerName: "Mã tố cáo",
      flex: 0.4,
    },
    {
      field: "aid",
      headerName: "Mã trả lời",
      flex: 0.4,
    },

    {
      field: "detail",
      headerName: "Nội dung",
      flex: 1,
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
      flex: 0.6,
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
    if (Array.isArray(data) && data.length !== 0) {
      return (
        <Box height="80vh" width="99%">
          <DataGrid
            rowHeight={50}
            rows={data.map((item) => {
              const row = {
                id: item.answerReport.raid,
                detail: item.answerReport.detail,
                name: item.user.name,
                status: item.answerReport.status,
                date: item.answerReport.date,
                aid: item.answerReport.aid,
              };

              if (item.answerReport.aid !== "Câu trả lời đã bị xoá") {
                row.qid = item.question.qid;
              }

              return row;
            })}
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
                  fields: ["id", "qid", "detail", "status", "name", "date"],
                  utf8WithBom: true,
                  fileName: "TableReportAnswer",
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
              <Typography variant="h4">Quản lý tố cáo câu trả lời</Typography>
            </Box>
            <Stack direction="row" gap={5}>
              <Button
                size="small"
                startIcon={<CheckCircleIcon />}
                onClick={handleDone}
              >
                Chuyển trạng thái
              </Button>
              <Button
                size="small"
                startIcon={<CheckCircleIcon />}
                onClick={handleDeleteList}
                color="error"
              >
                Xóa
              </Button>
            </Stack>
            {datatable()}
          </Box>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default ReportA;
