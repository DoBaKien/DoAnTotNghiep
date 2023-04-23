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
import { PhotoCamera } from "@mui/icons-material";
import { storage } from "../../Assert/Config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { memo } from "react";

function AnswerAction(qid, setAnswer) {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const editor = useRef(null);
  const [post, setPost] = useState([{ id: 1, type: "text", content: "" }]);
  const [fileImage, setFileImage] = useState("");
  var hours = new Date().getHours();

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
  function deleteImage(id) {
    const newPost = post.filter((user) => user.id !== id);
    setPost(newPost);
    const desertRef = ref(storage, "images/" + fileImage);
    deleteObject(desertRef)
      .then(() => {
        console.log("asd");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const metadata = {
    contentType: "image/jpeg",
  };

  const uploadImage = async (file, index, key) => {
    const storageRef = ref(
      storage,
      "images/" + file.name + hours + currentUser
    );
    setFileImage(file.name + hours + currentUser);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const updatedUsers = [...post];
          updatedUsers[index][key] = downloadURL;
          setPost(updatedUsers);
        });
      }
    );
  };
  const handleImageUpload = async (e, index, key) => {
    const file = e.target.files[0];
    await uploadImage(file, index, key);
  };
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
  const checkLog = () => {
    if (currentUser === "") {
      console.log("asd");
    } else {
      console.log("dang nhap");
    }
  };

  const Suit = (e, id, i, da) => {
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
    } else if (e === "text") {
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
    } else if (e === "image") {
      return (
        <Box>
          <IconButton color="error" onClick={() => deleteImage(id)}>
            <CloseIcon />
          </IconButton>
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
            sx={{ marginLeft: 5 }}
          >
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => handleImageUpload(e, i, "content")}
            />
          </Button>

          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            {da && <img src={da} alt="Selected" style={{ width: "50%" }} />}
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
              {Suit(data.type, data.id, i, data.content)}
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
        <Button
          variant="contained"
          sx={{ marginRight: 1 }}
          onClick={() => handleAdd("image")}
        >
          Add image
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
        <Button variant="contained" onClick={checkLog}>
          Trả lời
        </Button>
      </BoxContent>
    </Box>
  );
}
export default memo(AnswerAction);
