import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import { BoxContent, StackContent } from "./Style";
import { BoxHome, ValueDate } from "../../Assert/Style";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";

import { Link, useParams } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { BoxUserPost } from "../Post/Style";

function History() {
  const { type, id } = useParams();
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
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
    const getAnswerActivityHistory = async () => {
      try {
        const response = await axios.get(
          `answer/getAnswerActivityHistory/${id}`
        );
        setDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const findByUid = async (uid) => {
      try {
        const response = await axios.get(`user/findByUid/${uid}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getQuestionById = async () => {
      try {
        const response = await axios.get(`question/getQuestionById/${id}`);
        setTitle(response.data.title);
        findByUid(response.data.uid);
      } catch (error) {
        console.log(error);
      }
    };
    if (type === "question") {
      getQuestionDetailByQid();
      getQuestionById();
    } else if (type === "answer") {
      getAnswerActivityHistory();
    }
  }, [id, type]);
  console.log(details);
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
  const datatableQuestion = () => {
    if (Array.isArray(details) && details.length !== 0) {
      return (
        <Box height="70vh">
          <DataGrid
            rowHeight={50}
            rows={details.map((item, index) => ({
              id: index,
              name: item.questionActivityHistory.action,
              description: item.questionActivityHistory.description,
              username: item.user.name + "///" + item.user.avatar,
              date: item.questionActivityHistory.date,
            }))}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
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
  const datatableAnswer = () => {
    if (Array.isArray(details) && details.length !== 0) {
      return (
        <Box height="70vh">
          <DataGrid
            rowHeight={50}
            rows={details.map((item, index) => ({
              id: index,
              name: item.answerActivityHistory.action,
              description: item.answerActivityHistory.description,
              username: item.user.name + "///" + item.user.avatar,
              date: item.answerActivityHistory.date,
            }))}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
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
            height: "90vh",
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
  console.log(details);
  const checkType = () => {
    if (type === "question") {
      return (
        <BoxContent sx={{ width: "60vw" }}>
          <Typography variant="h4">Lịch sử chỉnh sửa</Typography>
          <Typography sx={{ marginTop: 1 }}>Tiêu để: {title}</Typography>
          <BoxUserPost direction="row" gap={1} sx={{ marginTop: 1 }}>
            <Typography variant="subtitle1">Người đăng:</Typography>
            <Link
              to={`/profile/${user.uid}`}
              style={{ textDecoration: "none" }}
            >
              <BoxUserPost direction="row" gap={1} sx={{ cursor: "pointer" }}>
                <Avatar
                  alt="Avatar"
                  src={user.avatar || user.name}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="subtitle1" color={"text.primary"}>
                  {user.name}
                </Typography>
              </BoxUserPost>
            </Link>
          </BoxUserPost>
          <Box sx={{ width: "100%", marginTop: 2 }}>{datatableQuestion()}</Box>
        </BoxContent>
      );
    } else if (type === "answer") {
      return (
        <BoxContent sx={{ width: "60vw" }}>
          <Typography variant="h4">Lịch sử chỉnh sửa câu trả lời</Typography>

          <Box sx={{ width: "100%", marginTop: 2 }}>{datatableAnswer()}</Box>
        </BoxContent>
      );
    }
  };

  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <StackContent direction="row" sx={{ marginTop: 2 }}>
        <LeftSide></LeftSide>
        {checkType()}
      </StackContent>
    </BoxHome>
  );
}

export default memo(History);
