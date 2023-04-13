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

function CreatePost() {
  const [tags, setTags] = useState("");
  const [post, setPost] = useState([{ id: 1, type: "text", content: "" }]);
  const editor = useRef(null);
  const [title, setTitle] = useState("");
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
    console.log(post);
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
          })
          .catch(function (error) {
            console.log(error);
          });
        axios
          .post(`/question/createActivityHistory/${response.data}`, {
            action: "Đặt câu hỏi",
            description:"Khởi tạo câu hỏi"
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

  function CaseDel(id) {
    if (id !== 1) {
      return (
        <IconButton color="error" onClick={() => deleteUser(id)}>
          <CloseIcon />
        </IconButton>
      );
    }
  }

  const handleAdd = (e) => {
    setPost([...post, { id: post.length + 1, type: e, content: "" }]);
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

  function deleteUser(id) {
    const newPost = post.filter((user) => user.id !== id);
    setPost(newPost);
  }

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
            {Suit(data.type, data.id, i)}
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
