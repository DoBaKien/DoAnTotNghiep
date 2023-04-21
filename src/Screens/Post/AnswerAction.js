import { useState } from "react";
import { useRef } from "react";
import { ProLanguage } from "../../Assert/DataProLanguage";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import JoditEditor from "jodit-react";
import { BoxContent } from "./Style";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Component/Auth/AuthContext";

export const AnswerAction = (qid, setAnswer) => {
  const { currentUser } = useContext(AuthContext);
  const editor = useRef(null);
  const [post, setPost] = useState([{ id: 1, type: "text", content: "" }]);

  const handleAdd = (e) => {
    setPost([...post, { id: post.length + 1, type: e, content: "" }]);
    window.scrollTo(0, document.body.scrollHeight);
  };
  function handleInputChange(event, index, key) {
    const updatedUsers = [...post];
    updatedUsers[index][key] = event;
    setPost(updatedUsers);
  }
  function deleteUser(id) {
    const newPost = post.filter((user) => user.id !== id);
    setPost(newPost);
  }
  function CaseDel(id) {
    if (id !== 1) {
      return (
        <IconButton color="error" onClick={() => deleteUser(id)}>
          <CloseIcon />
        </IconButton>
      );
    }
  }
  const handleAnswer = () => {
    console.log(post);
    axios
      .post(`/answer/create/${qid}`, {})
      .then(function (response) {
        axios
          .post(`/answer/createDetail/${response.data}`, post)
          .then(function (response) {
            console.log(response);
            axios
              .post(`/answer/createActivityHistory/${response.data}`, {
                action: "Trả lời",
                description: "Khởi tạo câu trả lời",
              })
              .then(function (response) {
                console.log(response);
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
          })
          .catch(function (error) {
            console.log(error);
          });
        axios
          .post(`/question/createActivityHistory/${qid}`, {
            action: "Trả lời",
            description: "Khởi tạo câu trả lời",
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Suit = (e, id, i) => {
    if (e === "code") {
      return (
        <Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <IconButton color="error" onClick={() => deleteUser(id)}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Code</Typography>
            <Autocomplete
              disablePortal
              options={ProLanguage}
              sx={{ width: 200, marginLeft: 5, marginBottom: 1 }}
              onChange={(event, newValue) => {
                handleInputChange(newValue.label, i, "programLanguage");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Language" />
              )}
            />
          </Stack>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            fullWidth
            placeholder="Enter code"
            onChange={(e) => handleInputChange(e.target.value, i, "content")}
          />
        </Box>
      );
    } else {
      return (
        <Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            {CaseDel(id)}
            <Typography variant="h6">Text</Typography>
          </Stack>
          <Box sx={{ color: "black" }}>
            <JoditEditor
              ref={editor}
              tabIndex={1}
              onBlur={(newContent) =>
                handleInputChange(newContent, i, "content")
              }
              onChange={(newContent) =>
                handleInputChange(newContent, i, "content")
              }
            />
          </Box>
        </Box>
      );
    }
  };
  return (
    <Box>
      <Typography variant="h5" sx={{ marginTop: 2 }}>
        Nhập câu trả lời
      </Typography>
      <>
        {post.map((data, i) => {
          return (
            <BoxContent key={i} sx={{ marginTop: 2 }}>
              {Suit(data.type, data.id, i)}
            </BoxContent>
          );
        })}
      </>
      <BoxContent sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          sx={{ marginRight: 1 }}
          onClick={() => handleAdd("text")}
        >
          Add Text
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: 1 }}
          onClick={() => handleAdd("code")}
        >
          Add code
        </Button>
      </BoxContent>
      <BoxContent
        sx={{
          marginTop: 2,
          justifyContent: "center",
          display: "flex",
          marginBottom: 2,
        }}
      >
        <Button variant="contained" onClick={handleAnswer}>
          Trả lời
        </Button>
      </BoxContent>
    </Box>
  );
};
