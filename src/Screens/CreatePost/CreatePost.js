import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { BoxHome } from "../../Assert/Style";
import Header from "../../Component/Header/Header";
import { BoxContent, BoxNav } from "../CreatePost/Style";
import CloseIcon from "@mui/icons-material/Close";

function CreatePost() {
  const editor = useRef(null);
  const [post, setPost] = useState([{ text: "", code: "", id: 1 }]);
  const [newPost, setNewPost] = useState({ text: "", code: "" });
  // const parse = require("html-react-parser");

  const [content, setContent] = useState("");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const [personName, setPersonName] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function handleInputChange(event, index, key) {
    const updatedUsers = [...post];
    updatedUsers[index][key] = event;
    setPost(updatedUsers);
  }
  function addPost() {
    const user = { ...newPost, id: post.length + 1 };
    setPost([...post, user]);
    setNewPost({ text: "", code: "" });
  }

  const handleP = () => {
    console.log(post);
  };
  function deleteUser(id) {
    const newUsers = post.filter((user) => user.id !== id);
    setPost(newUsers);
  }
  function CaseDel(id) {
    if (id !== 1) {
      return (
        <BoxContent
          sx={{
            margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
          }}
        >
          <Button variant="contained" onClick={() => deleteUser(id)}>
            DElete Box
          </Button>
        </BoxContent>
      );
    }
  }
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
        />
      </BoxContent>

      {post.map((p, index) => (
        <Box key={index}>
          {CaseDel(p.id)}
          <BoxContent
            sx={{
              margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
            }}
          >
            <Box color={"black"}>
              <Typography variant="h6" color={"text.primary"}>
                What are the details of your problem?
              </Typography>
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1}
                onBlur={(newContent) =>
                  handleInputChange(newContent, index, "text")
                }
                onChange={(newContent) =>
                  handleInputChange(newContent, index, "text")
                }
              />
            </Box>
          </BoxContent>
          <BoxContent
            sx={{
              margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
            }}
          >
            <Box>
              <Typography variant="h6">Code Example</Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                fullWidth
                placeholder="Enter code"
                onChange={(e) =>
                  handleInputChange(e.target.value, index, "code")
                }
              />
            </Box>
          </BoxContent>
        </Box>
      ))}
      <BoxContent
        sx={{
          margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
        }}
      >
        <Button variant="contained" sx={{ marginRight: 1 }} onClick={addPost}>
          Add more
        </Button>
      </BoxContent>
      <BoxContent
        sx={{
          margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
        }}
      >
        <Typography variant="h6">Tags</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
      {/* <Typography variant="body1">{content}</Typography>
      <Typography variant="body1">{parse(content)}</Typography> */}
    </BoxHome>
  );
}

export default CreatePost;
