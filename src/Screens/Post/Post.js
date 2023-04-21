import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import { BoxContent, DateV, StackContent } from "./Style";
import { BoxHome, BoxTag } from "../../Assert/Style";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Component/Auth/AuthContext";
import HistoryIcon from "@mui/icons-material/History";
import ReportIcon from "@mui/icons-material/Report";
import { AnswerAction } from "./AnswerAction";
import { AnswerDetails } from "./AnswerDetails";
import parse from "html-react-parser";
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

  useEffect(() => {
    axios
      .get(`question/getQuestionDetailByQid/${qid}`)
      .then(function (response) {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    axios
      .get(`question/getQuestionTagByQid/${qid}`)
      .then(function (response) {
        setTags(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (currentUser !== "") {
      axios
        .get(`question/getUserVoteValue/${qid}`)
        .then(function (response) {
          setCheck(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    axios
      .get(`question/getTotalVoteValue/${qid}`)
      .then(function (response) {
        setVote(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (currentUser === "") {
      axios
        .get(`answer/getAnswerDTOByQid/${qid}`)
        .then(function (response) {
          setAnswer(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .get(`answer/getAnswerDTOByQidCk/${qid}`)
        .then(function (response) {
          setAnswer(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [qid, currentUser]);

  const VoteAction = (value) => {
    if (currentUser !== "") {
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

  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <StackContent direction="row" sx={{ marginTop: 2 }}>
        <LeftSide></LeftSide>
        <Box>
          <BoxContent sx={{ width: "60vw" }}>
            <Typography variant="h5">{title.title}</Typography>
            <Stack direction="row" sx={{ marginTop: 2 }}>
              {DateV(title.date)}
              <Typography variant="subtitle1" sx={{ marginLeft: 8 }}>
                Trạng thái: {title.status}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginLeft: 8 }}>
                Người đăng: {user.name}
              </Typography>
            </Stack>
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
                <IconButton>
                  <HistoryIcon />
                </IconButton>
                <IconButton>
                  <ReportIcon />
                </IconButton>
              </Box>
              <Box sx={{ marginLeft: 3 }}>
                {Array.from(details).map((detail, i) => {
                  if (detail.type === "text") {
                    return (
                      <Box sx={{ marginBottom: 2 }} key={i}>
                        <div>{parse(detail.content)}</div>
                      </Box>
                    );
                  } else {
                    return (
                      <Box key={i} sx={{ marginBottom: 2 }}>
                        <SyntaxHighlighter
                          language={detail.programLanguage}
                          style={atomOneDark}
                        >
                          {detail.content}
                        </SyntaxHighlighter>
                      </Box>
                    );
                  }
                })}
              </Box>
            </Stack>
          </BoxContent>

          <BoxContent sx={{ marginTop: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: "100%", alignItems: "center" }}
            >
              {Array.from(tags).map((tag, i) => (
                <BoxTag key={i}>
                  <Typography variant="body2">{tag.name}</Typography>
                </BoxTag>
              ))}
            </Stack>
          </BoxContent>
          {AnswerDetails(qid, answer)}
          {AnswerAction(qid, setAnswer)}
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default Post;
