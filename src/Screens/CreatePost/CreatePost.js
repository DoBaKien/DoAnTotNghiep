import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { BoxHome } from "../../Assert/Style";
import Header from "../../Component/Header/Header";
import { BoxContent, BoxNav } from "../CreatePost/Style";
import CloseIcon from "@mui/icons-material/Close";
import { ProLanguage } from "../../Assert/DataProLanguage";
import axios from "axios";
import { PhotoCamera } from "@mui/icons-material";
import { storage } from "../../Assert/Config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Swal from "sweetalert2";

function CreatePost() {
  const [tags, setTags] = useState("");
  const [post, setPost] = useState([{ id: 1, type: "text", content: "" }]);
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [fileImage, setFileImage] = useState("");

  useEffect(() => {
    axios
      .get("/tag/getAllTag")
      .then(function (response) {
        setTags(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [personName, setPersonName] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  function handleInputChange(event, index, key) {
    const updatedUsers = [...post];
    updatedUsers[index][key] = event;
    setPost(updatedUsers);
  }

  const handleP = () => {
    axios
      .post("/question/create", {
        title: title,
      })
      .then(function (response) {
        axios
          .post(`/question/modifyTagPost/${response.data}`, personName)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        axios
          .post(`/question/createDetail/${response.data}`, post)
          .then(function (response) {
            console.log(response);
            Swal.fire("Thành công", `Bạn đăng bài thành công`, "success");
          })
          .catch(function (error) {
            console.log(error);
          });
        axios
          .post(`/question/createActivityHistory/${response.data}`, {
            action: "Đặt câu hỏi",
            description: "Khởi tạo câu hỏi",
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

  const metadata = {
    contentType: "image/jpeg",
  };

  function deleteImage(id) {
    const newPost = post.filter((user) => user.id !== id);
    setPost(newPost);
    const desertRef = ref(storage, "images/" + fileImage);
    deleteObject(desertRef)
      .then(() => {
        console.log("asd");
        setFileImage("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const uploadImage = async (file, index, key) => {
    const storageRef = ref(storage, "images/" + file.name);
    setFileImage(file.name);
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
  const handleAdd = (e) => {
    setPost([...post, { id: post.length + 1, type: e, content: "" }]);
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

  const TagBox = () => {
    if (tags && tags.length > 0) {
      return (
        <Select multiple value={personName} onChange={handleChange}>
          {tags.map((tag) => (
            <MenuItem key={tag.tid} value={tag.tid}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      );
    }
  };

  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <BoxNav>
        <Typography variant="h3">ASK A QUESTION</Typography>
      </BoxNav>
      <BoxContent
        sx={{
          margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
        }}
      >
        <Typography variant="h6">Title</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </BoxContent>

      {post.map((data, i) => {
        return (
          <BoxContent
            key={i}
            sx={{
              margin: {
                lg: "10px 200px 0px 200px",
                xs: "10px 10px 0px 10px",
              },
            }}
          >
            {Suit(data.type, data.id, i, data.content)}
          </BoxContent>
        );
      })}
      <BoxContent
        sx={{
          margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
        }}
      >
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
          margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
        }}
      >
        <Typography variant="h6">Tags</Typography>
        <FormControl fullWidth>{TagBox()}</FormControl>
      </BoxContent>
      <BoxContent
        sx={{
          margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Button variant="contained" onClick={handleP}>
          Create Post
        </Button>
      </BoxContent>
      <Box sx={{ height: 30, width: "100%" }}></Box>
    </BoxHome>
  );
}

export default CreatePost;
