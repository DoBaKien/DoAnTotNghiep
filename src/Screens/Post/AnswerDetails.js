import { BoxContent, BoxUser } from "./Style";
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
import { Navigate, useNavigate } from "react-router-dom";
function AnswerDetails(props) {
  const [modal, setModal] = useState(false);
  const [aid, setAid] = useState("");
  const navigate = useNavigate();

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
                  <Tooltip title="Lịch sử chỉnh sửa" placement="left">
                    <IconButton>
                      <HistoryIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {props.currentUser !== item.answer.uid ? (
                    <Tooltip title="Báo cáo" placement="left">
                      <IconButton onClick={() => handleReport(item.answer.aid)}>
                        <ReportIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                  {props.currentUser === item.answer.uid ? (
                    <Tooltip title="Chỉnh sửa" placement="left">
                      <IconButton onClick={() => handleEdit(item.answer.aid)}>
                        <ModeEditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                </Box>
                <Box sx={{ marginTop: 0.5 }}>
                  <BoxUser
                    direction="row"
                    spacing={2}
                    onClick={() => navigate(`/profile/${item.user.uid}`)}
                    sx={{ marginBottom: 1, width: { xs: 150, md: 300 } }}
                  >
                    <Avatar
                      alt="Avatar"
                      src={item.user.avatar || item.user.name}
                    />
                    <Typography className="title">{item.user.name}</Typography>
                  </BoxUser>
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
