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

const handleOnCellClick = (params) => {
  window.open(`/post/${params.row.qid}`, "_blank");
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
        .delete(`/${value}/deleteReport/${id}`)
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
    renderCell: (params) => <ExpandableCell {...params} />,
  },
  {
    field: "detail",
    headerName: "Nội dung",
    flex: 1,
    renderCell: (params) => <ExpandableCell {...params} />,
  },

  {
    field: "id",
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
          rows={data.map((item) => ({
            id: item.questionReport.rqid,
            title: item.question.title,
            detail: item.questionReport.detail,
            status: item.questionReport.status,
            date: item.questionReport.date,
            qid: item.question.qid,
          }))}
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
    renderCell: (params) => <ExpandableCell {...params} />,
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
          rows={data.map((item) => ({
            id: item.answerReport.raid,
            title: item.question.title,
            detail: item.answerReport.detail,

            status: item.answerReport.status,
            date: item.answerReport.date,
            qid: item.question.qid,
          }))}
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
    renderCell: (params) => <ExpandableCell {...params} />,
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
          rows={data.map((item) => ({
            id: item.commentReport.rcid,
            title: item.question.title,
            detail: item.commentReport.detail,

            status: item.commentReport.status,
            date: item.commentReport.date,
            qid: item.question.qid,
          }))}
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
