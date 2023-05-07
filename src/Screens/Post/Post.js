import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import { BoxContent, BoxUserPost, DateV, StackContent } from "./Style";
import { BoxHome, BoxTag } from "../../Assert/Style";
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Component/Auth/AuthContext";
import HistoryIcon from "@mui/icons-material/History";
import ReportIcon from "@mui/icons-material/Report";

import AnswerDetails from "./AnswerDetails";
import parse from "html-react-parser";
import AnswerAction from "./AnswerAction";
import Cookies from "js-cookie";
import ModalReport from "../../Assert/ModalReport";

function Post() {
  const { qid } = useParams();
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [user, setUser] = useState("");
  const [vote, setVote] = useState(0);
  const [check, setCheck] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [answer, setAnswer] = useState("");
  const [modal, setModal] = useState(false);
  const [checkUser, setCheckUser] = useState("");

  useEffect(() => {
    const getQuestionDetailByQid = async () => {
      try {
        const response = await axios.get(
          `question/getQuestionDetailByQid/${qid}`
        );
        setDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestionDetailByQid();

    const checkUserAnswer = async () => {
      try {
        const response = await axios.get(`question/checkUserAnswer/${qid}`);
        setCheckUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    checkUserAnswer();

    axios
      .get(`question/getQuestionById/${qid}`)
      .then(function (response) {
        setTitle(response.data);

        axios
          .get(`user/findByUid/${response.data.uid}`)
          .then(function (response) {
            setUser(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });

    const getQuestionTagByQid = async () => {
      try {
        const response = await axios.get(`question/getQuestionTagByQid/${qid}`);
        setTags(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getQuestionTagByQid();

    if (currentUser !== "") {
      const getUserVoteValue = async () => {
        try {
          const response = await axios.get(`question/getUserVoteValue/${qid}`);
          setCheck(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      getUserVoteValue();
    }

    const GetTotalVoteValue = async () => {
      try {
        const response = await axios.get(`question/getTotalVoteValue/${qid}`);
        setVote(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    GetTotalVoteValue();
    if (currentUser === "") {
      const GetAnswer = async () => {
        try {
          const response = await axios.get(`answer/getAnswerDTOByQid/${qid}`);
          setAnswer(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      GetAnswer();
    } else {
      const GetAnswer = async () => {
        try {
          const response = await axios.get(`answer/getAnswerDTOByQidCk/${qid}`);
          setAnswer(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      GetAnswer();
    }
  }, [qid, currentUser]);

  const VoteAction = (value) => {
    if (Cookies.get("sessionCookie") !== undefined) {
      axios
        .post(`question/castQuestionVoteUD/${qid}`, { value })
        .then(function (response) {
          Swal.fire("Thành công", `Bạn vote thành công`, "success");
          axios
            .get(`question/getTotalVoteValue/${qid}`)
            .then(function (response) {
              setVote(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          axios
            .get(`question/getUserVoteValue/${qid}`)
            .then(function (response) {
              setCheck(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
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

  const handleReport = () => {
    if (Cookies.get("sessionCookie") !== undefined) {
      setModal(!modal);
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

  const checkAnswer = () => {
    if (Cookies.get("sessionCookie") === undefined) {
      return (
        <BoxContent
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
          }}
        >
          <Button variant="contained" color="error">
            Đăng nhập để bình luận
          </Button>
        </BoxContent>
      );
    } else if (checkUser !== "None") {
      return (
        <BoxContent
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
          }}
        >
          <Button variant="contained" color="success" sx={{ color: "white" }}>
            Đã trả lời
          </Button>
        </BoxContent>
      );
    } else {
      return <AnswerAction qid={qid} setAnswer={setAnswer} />;
    }
  };

  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <ModalReport setModal={setModal} modal={modal} qid={qid} type="câu hỏi" />
      <StackContent direction="row" sx={{ marginTop: 2 }}>
        <LeftSide></LeftSide>
        <Box>
          <BoxContent>
            <Typography variant="h5">{title.title}</Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 1, md: 4 }}
              sx={{
                textAlign: { xs: "center", md: "" },
                marginTop: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              {DateV(title.date)}
              <Typography variant="subtitle1">
                Trạng thái: {title.status}
              </Typography>
              <BoxUserPost direction="row" gap={1}>
                <Typography variant="subtitle1">Người đăng:</Typography>
                <Link
                  to={`/profile/${user.uid}`}
                  style={{ textDecoration: "none" }}
                >
                  <BoxUserPost
                    direction="row"
                    gap={1}
                    sx={{ cursor: "pointer" }}
                  >
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
            </Stack>
          </BoxContent>

          <BoxContent sx={{ marginTop: 2 }}>
            {user.uid === currentUser ? (
              <Stack
                gap={1}
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                direction={{ xs: "column", md: "row" }}
              >
                <Link to={`/editpost/${qid}`}>
                  <Button
                    variant="contained"
                    sx={{ marginRight: 1, width: 200 }}
                  >
                    Sửa bài viết
                  </Button>
                </Link>
                <Button variant="contained" sx={{ marginRight: 1, width: 200 }}>
                  Chấp nhận
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginRight: 1, width: 200 }}
                >
                  Xóa bài viết
                </Button>
              </Stack>
            ) : (
              <></>
            )}
          </BoxContent>

          <BoxContent sx={{ marginTop: 2 }}>
            <Stack direction="row">
              <Box
                sx={{
                  width: 50,
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onClick={() => VoteAction("Up")}
                  color={check === "Up" ? "primary" : ""}
                >
                  <NorthIcon />
                </IconButton>

                <Typography variant="h6" sx={{ marginBottom: 0.6 }}>
                  {vote}
                </Typography>
                <IconButton
                  onClick={() => VoteAction("Down")}
                  color={check === "Down" ? "primary" : ""}
                >
                  <SouthIcon />
                </IconButton>

                <Tooltip title="Lịch sử chỉnh sửa" placement="left">
                  <Link to={`/history/question/${qid}`}>
                    <IconButton>
                      <HistoryIcon />
                    </IconButton>
                  </Link>
                </Tooltip>

                {currentUser !== user.uid ? (
                  <Tooltip title="Báo cáo" placement="left">
                    <IconButton onClick={handleReport}>
                      <ReportIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </Box>
              <Box sx={{ marginLeft: 3 }}>
                {Array.from(details).map((detail, i) => {
                  if (detail.type === "text") {
                    return (
                      <Box sx={{ marginBottom: 2 }} key={i}>
                        <div>{parse(detail.content)}</div>
                      </Box>
                    );
                  } else if (detail.type === "code") {
                    return (
                      <Box
                        key={i}
                        sx={{ width: { xs: "40vw", md: "50vw" }, marginTop: 2 }}
                      >
                        <SyntaxHighlighter language={"jsx"} style={atomOneDark}>
                          {detail.content}
                        </SyntaxHighlighter>
                      </Box>
                    );
                  } else if (detail.type === "image") {
                    return (
                      <Box key={i} sx={{ marginBottom: 2 }}>
                        <CardMedia
                          alt=""
                          component="img"
                          src={detail.content}
                          sx={{ width: { xs: "40vw", md: "50vw" } }}
                        ></CardMedia>
                      </Box>
                    );
                  }
                  return null;
                })}
              </Box>
            </Stack>
          </BoxContent>

          <BoxContent sx={{ marginTop: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: "100%", alignItems: "center", padding: 2 }}
            >
              {Array.from(tags).map((tag, i) => (
                <BoxTag key={i} sx={{ padding: "1 0.5" }}>
                  <Typography variant="body2">{tag.name}</Typography>
                </BoxTag>
              ))}
            </Stack>
          </BoxContent>
          <Typography sx={{ marginTop: 1 }} variant="h5">
            Bình luận
          </Typography>
          <BoxContent sx={{ marginTop: 1 }}>
            <Stack direction="row" gap={2} sx={{ padding: 1 }}>
              <Box>
                <Avatar alt="Avatar">V</Avatar>
              </Box>
              <Box>
                <Typography variant="body1">Đỗ Bá Kiên</Typography>
                <Typography variant="body2">
                  I am the Flutter maintainer who fixed both of the issues that
                  are being confused in these SO answers, both caused by changes
                  of behavior in Xcode 14.3. The originally reported missing
                  libarclite_iphoneos was fixed in Flutter 3.7.11
                  github.com/flutter/flutter/issues/124340. The other unrelated
                  issue is the failure to archive, which was tracked in
                  github.com/flutter/flutter/issues/123890 and fixed in Flutter
                  3.7.10. In either case, remove any changes you've made to your
                  Podfile and run flutter upgrade
                </Typography>
              </Box>
            </Stack>
          </BoxContent>

          <BoxContent>
            <Box sx={{ marginLeft: 8 }}>
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="Viết bình luận"
              />
            </Box>
          </BoxContent>

          <AnswerDetails
            answer={answer}
            uid={user.uid}
            currentUser={currentUser}
          />
          {checkAnswer()}
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default Post;
