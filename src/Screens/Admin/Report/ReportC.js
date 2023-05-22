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

function ReportC() {
  const { show, setShow } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState([]);
  const cookie = Cookies.get("sessionCookie");
  useEffect(() => {
    axios
      .get(`/comment/getCommentReport/${cookie}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [cookie]);
  const handleOnCellClick = (params) => {
    if (params.row.cid !== "Bình luận đã bị xoá") {
      window.open(
        `/DoAnTotNghiep/post/${params.row.qid}/comment/${params.row.cid}`,
        "_blank"
      );
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
            .put(`/comment/deleteListReport/${cookie}`, select)
            .then(function (response) {
              axios
                .get(`/comment/getCommentReport/${cookie}`)
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
          .delete(`/comment/deleteReport/${id}/${cookie}`)
          .then(function (response) {
            axios
              .get(`/comment/getCommentReport/${cookie}`)
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
        .put(`/comment/editReport/${cookie}`, select)
        .then(function (response) {
          axios
            .get(`/comment/getCommentReport/${cookie}`)
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
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Người tố cáo",
      flex: 0.6,
    },
    {
      field: "content",
      headerName: "Nội dung",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.value !== undefined ? (
              <ExpandableCell {...params} />
            ) : (
              <>Đã bị xóa</>
            )}
          </>
        );
      },
    },
    {
      field: "date",
      headerName: "Ngày đăng",
      flex: 0.6,
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
                id: item.commentReport.rcid,
                name: item.user.name,
                status: item.commentReport.status,
                date: item.commentReport.date,
                detail: item.commentReport.detail,
                cid: item.commentReport.cid,
              };
              if (item.commentReport.cid !== "Bình luận đã bị xoá") {
                row.qid = item.question.qid;
                row.content = item.comment.detail;
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
                  fileName: "TableReportComment",
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
              <Typography variant="h4">Quản lý tố cáo bình luận</Typography>
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

export default ReportC;
