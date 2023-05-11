import { BoxContent, BoxUser, DateV } from "./Style";
import {
  Avatar,
  Box,
  CardMedia,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import parse from "html-react-parser";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import HistoryIcon from "@mui/icons-material/History";
import ReportIcon from "@mui/icons-material/Report";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { memo, useState } from "react";
import "../../Assert/index.css";
import ModalReport from "../../Assert/ModalReport";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import CheckIcon from "@mui/icons-material/Check";

import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function AnswerDetails(props) {
  const [modal, setModal] = useState(false);
  const [aid, setAid] = useState("");

  const handleEdit = (id) => {};

  const handleReport = (id) => {
    if (Cookies.get("sessionCookie") !== undefined) {
      setModal(!modal);
      setAid(id);
    } else {
      Swal.fire({
        title: "Lỗi",
        text: "Bạn phải đăng nhập trước",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          return <Navigate to="/" />;
        }
      });
    }
  };

  const handleApt = (id) => {
    axios
      .put(`/answer/acceptAnswer/${id}`)
      .then(function (response) {
        Swal.fire("", "Bạn đã chấp nhận câu trả lời này", "success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkAcpt = (aid, stt) => {
    if (stt === "Accepted") {
      return (
        <Tooltip title="Chấp nhận câu trả lởi" placement="left">
          <CheckIcon color="success" fontSize="large" />
        </Tooltip>
      );
    } else if (props.uid === props.currentUser) {
      return (
        <Tooltip title="Chấp nhận câu trả lởi" placement="left">
          <IconButton onClick={() => handleApt(aid)}>
            <CheckIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    }
  };

  const ad = () => {
    if (props.answer && props.answer.length > 0) {
      return (
        <Box>
          {props.answer.map((item, i) => (
            <BoxContent sx={{ marginTop: 2 }} key={i}>
              <Stack direction="row">
                <Box
                  sx={{
                    width: 40,
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton color={item.voteValue === "Up" ? "primary" : ""}>
                    <NorthIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="subtitle1">{item.answerVote}</Typography>
                  <IconButton
                    color={item.voteValue === "Down" ? "primary" : ""}
                  >
                    <SouthIcon fontSize="small" />
                  </IconButton>
                  <Link to={`/history/answer/${item.answer.aid}`}>
                    <Tooltip title="Lịch sử chỉnh sửa" placement="left">
                      <IconButton>
                        <HistoryIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  {props.currentUser !== item.answer.uid ? (
                    <Tooltip title="Báo cáo" placement="left">
                      <IconButton onClick={() => handleReport(item.answer.aid)}>
                        <ReportIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Chỉnh sửa" placement="left">
                      <Link to={`/edit/answer/${item.answer.aid}`}>
                        <IconButton onClick={() => handleEdit()}>
                          <ModeEditIcon fontSize="small" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  )}
                  {checkAcpt(item.answer.aid, item.answer.status)}
                </Box>
                <Box sx={{ marginTop: 0.5 }}>
                  <Link
                    to={`/profile/${item.user.uid}`}
                    style={{ textDecoration: "none" }}
                  >
                    <BoxUser
                      direction="row"
                      spacing={2}
                      sx={{ marginBottom: 1, width: { xs: 150, md: 300 } }}
                    >
                      <Avatar
                        alt="Avatar"
                        src={item.user.avatar || item.user.name}
                      />
                      <Typography className="title" color={"text.primary"}>
                        {item.user.name}
                      </Typography>
                      <Typography variant="caption" color={"text.primary"}>
                        {DateV(item.answer.date)}
                      </Typography>
                    </BoxUser>
                  </Link>
                  <Box>
                    {item.answerDetails.map((subItem, i) => {
                      if (subItem.type === "text") {
                        return (
                          <Box key={i}>
                            <div>{parse(subItem.content)}</div>
                          </Box>
                        );
                      } else if (subItem.type === "code") {
                        return (
                          <Box
                            key={i}
                            sx={{ width: { xs: "40vw", md: "50vw" } }}
                          >
                            <SyntaxHighlighter
                              language={subItem.programLanguage}
                              style={atomOneDark}
                            >
                              {subItem.content}
                            </SyntaxHighlighter>
                          </Box>
                        );
                      } else if (subItem.type === "image") {
                        return (
                          <Box key={i} sx={{ marginBottom: 2 }}>
                            <CardMedia
                              sx={{ width: { xs: "40vw", md: "50vw" } }}
                              alt=""
                              component="img"
                              src={subItem.content}
                            ></CardMedia>
                          </Box>
                        );
                      }
                      return null;
                    })}
                  </Box>
                </Box>
              </Stack>
            </BoxContent>
          ))}
        </Box>
      );
    } else if (props.answer === "") {
      return (
        <BoxContent>
          <CircularProgress />
        </BoxContent>
      );
    } else if (props.answer.length === 0) {
      return (
        <BoxContent>
          <Typography variant="h6">Không có câu trả lời</Typography>
        </BoxContent>
      );
    }
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <ModalReport
        setModal={setModal}
        modal={modal}
        qid={aid}
        type="câu trả lời"
      />
      <Typography variant="h5">Câu trả lời</Typography>
      {ad()}
    </Box>
  );
}
export default memo(AnswerDetails);
