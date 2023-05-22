import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ValueDate } from "../../Assert/Style";
import { ExpandableCell } from "../Admin/Style";
import { BoxContent } from "./Style";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const handleOnCellClick = (params) => {
  if (params.row.ii === undefined) {
    window.open(`/post/${params.row.qid}`, "_blank");
  } else if (params.row.iz === "answer") {
    window.open(`/post/${params.row.qid}/answer/${params.row.ii}`, "_blank");
  } else if (params.row.iz === "comment") {
    window.open(`/post/${params.row.qid}/comment/${params.row.ii}`, "_blank");
  }
};
const handleDelete = (id, value) => {
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
        .delete(`/${value}/deleteReport/${id}/${Cookies.get("sessionCookie")}`)
        .then(function (response) {
          Swal.fire("Đã xóa!", "Tố cáo của bạn đã xóa", "success");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
};
const columns = [
  {
    field: "title",
    headerName: "Câu hỏi",
    flex: 1.5,
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
            <IconButton onClick={() => handleDelete(params.id, "question")}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>,
      ];

      return actions;
    },
  },
];

export const datatable = (data) => {
  if (Array.isArray(data) && data.length !== 0) {
    return (
      <Box height={400} width="100%">
        <DataGrid
          rowHeight={50}
          rows={data.map((item) => {
            const row = {
              id: item.questionReport.rqid,
              detail: item.questionReport.detail,
              status: item.questionReport.status,
              date: item.questionReport.date,
              qid: item.question.qid,
            };
            if (item.questionReport.qid !== "Câu hỏi đã bị xoá") {
              row.title = item.question.title;
            }

            return row;
          })}
          columns={columns}
          pageSizeOptions={[5, 10, 15]}
          components={{
            Toolbar: GridToolbar,
          }}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              csvOptions: {
                fields: ["id", "qid", "detail", "status", "date"],
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
  } else if (data === "") {
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
  } else if (data === "List report empty") {
    return (
      <BoxContent>
        <Typography variant="h5">Không có dữ liệu</Typography>
      </BoxContent>
    );
  }
};

const columnAnswer = [
  {
    field: "title",
    headerName: "Câu hỏi",
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
            <IconButton onClick={() => handleDelete(params.id, "answer")}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>,
      ];

      return actions;
    },
  },
];

export const datatableanswer = (data) => {
  if (Array.isArray(data) && data.length !== 0) {
    return (
      <Box height={400} width="100%">
        <DataGrid
          rowHeight={50}
          rows={data.map((item) => {
            const row = {
              id: item.answerReport.raid,
              detail: item.answerReport.detail,
              ii: item.answerReport.aid,
              status: item.answerReport.status,
              date: item.answerReport.date,
              iz: "answer",
            };
            if (item.answerReport.aid !== "Câu trả lời đã bị xoá") {
              row.qid = item.question.qid;
              row.title = item.question.title;
            }

            return row;
          })}
          columns={columnAnswer}
          pageSizeOptions={[5, 10, 15]}
          components={{
            Toolbar: GridToolbar,
          }}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              csvOptions: {
                fields: ["id", "qid", "detail", "status", "date"],
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
  } else if (data === "") {
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
  } else if (data === "List report empty") {
    return (
      <BoxContent>
        <Typography variant="h5">Không có dữ liệu</Typography>
      </BoxContent>
    );
  }
};

const columnComment = [
  {
    field: "title",
    headerName: "Câu hỏi",
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
            <IconButton onClick={() => handleDelete(params.id, "comment")}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>,
      ];

      return actions;
    },
  },
];

export const datatablecomment = (data) => {
  if (Array.isArray(data) && data.length !== 0) {
    return (
      <Box height={400} width="100%">
        <DataGrid
          rowHeight={50}
          rows={data.map((item) => {
            const row = {
              id: item.commentReport.rcid,
              detail: item.commentReport.detail,
              ii: item.commentReport.cid,
              status: item.commentReport.status,
              date: item.commentReport.date,
              iz: "comment",
            };
            if (item.commentReport.cid !== "Bình luận đã bị xoá") {
              row.qid = item.question.qid;
              row.title = item.question.title;
            }

            return row;
          })}
          columns={columnComment}
          pageSizeOptions={[5, 10, 15]}
          components={{
            Toolbar: GridToolbar,
          }}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              csvOptions: {
                fields: ["id", "qid", "detail", "status", "date"],
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
  } else if (data === "") {
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
  } else if (data === "List report empty") {
    return (
      <BoxContent>
        <Typography variant="h5">Không có dữ liệu</Typography>
      </BoxContent>
    );
  }
};
