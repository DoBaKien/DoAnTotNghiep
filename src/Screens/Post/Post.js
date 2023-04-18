import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";

import { BoxContent, DateV, StackContent } from "./Style";
import { BoxHome, BoxTag } from "../../Assert/Style";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

function Post() {
  const editor = useRef(null);
  const { qid } = useParams();
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [user, setUser] = useState("");
  const [vote, setVote] = useState(0);
  const [check, setCheck] = useState("");
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

    axios
      .get(`question/getUserVoteValue/${qid}`)
      .then(function (response) {
        setCheck(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`question/getTotalVoteValue/${qid}`)
      .then(function (response) {
        setVote(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [qid]);

  const VoteAction = (value) => {
    axios
      .post(`question/castQuestionVoteUD/${qid}`, { value })
      .then(function (response) {
        Swal.fire("Thành công", `Bạn vote thành công`, "success");
        if (check === 0 && value === "Up") {
          setVote((prevState) => prevState + 1);
          setCheck("Up");
        } else if (check === "Up" && value === "Up") {
          setVote((prevState) => prevState - 1);
          setCheck(0);
        } else if (check === "Down" && value === "Up") {
          setVote((prevState) => prevState + 2);
          setCheck("Up");
        } else if (check === 0 && value === "Down") {
          setVote((prevState) => prevState - 1);
          setCheck("Down");
        } else if (check === "Down" && value === "Down") {
          setVote((prevState) => prevState + 1);
          setCheck(0);
        } else if (check === "Up" && value === "Down") {
          setVote((prevState) => prevState - 2);
          setCheck("Down");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
                <IconButton onClick={() => VoteAction("Up")}>
                  <NorthIcon />
                </IconButton>

                <Typography variant="h6" sx={{ marginBottom: 0.6 }}>
                  {vote}
                </Typography>
                <IconButton onClick={() => VoteAction("Down")}>
                  <SouthIcon />
                </IconButton>
              </Box>
              <Box sx={{ marginLeft: 3 }}>
                {Array.from(details).map((detail, i) => {
                  if (detail.type === "text") {
                    return (
                      <Box sx={{ marginBottom: 2 }} key={i}>
                        <Typography>{detail.content}</Typography>
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

          <BoxContent color={"black"} sx={{ marginTop: 2 }}>
            <Typography variant="h6" color={"text.primary"}>
              Your Answer
            </Typography>
            <JoditEditor ref={editor} tabIndex={1} />
          </BoxContent>

          <BoxContent sx={{ marginTop: 2 }}>
            <Typography variant="h6">Code Example</Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              fullWidth
              placeholder="Enter code"
            />
          </BoxContent>

          <BoxContent
            sx={{
              marginTop: 2,
              justifyContent: "center",
              display: "flex",
              marginBottom: 2,
            }}
          >
            <Button variant="contained">Answer</Button>
          </BoxContent>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default Post;
