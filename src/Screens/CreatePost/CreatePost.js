import {
  Box,
  Button,
  IconButton,
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
  const [content, setContent] = useState("");
  // const parse = require("html-react-parser");
  const [val, setVal] = useState([]);

  const handleAdd = (e) => {
    setVal([...val, { id: val.length + 1, type: e }]);
  };

  const handle = (e, id) => {
    console.log(e, id);
  };

  const handleCre = () => {
    console.log(val);
  };

  const Suit = (e, id) => {
    if (e === "code") {
      return (
        <Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography variant="h6">Code </Typography>
            <IconButton color="error" onClick={() => handleDelete(id)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Enter code"
            onChange={(e) => handle(e.target.value, id)}
          />
        </Box>
      );
    } else {
      return (
        <Box sx={{ color: "black" }}>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography variant="h6" color={"text.primary"}>
              Text
            </Typography>
            <IconButton color="error" onClick={() => handleDelete(id)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <JoditEditor
            ref={editor}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(e) => handle(e, id)}
          />
        </Box>
      );
    }
  };

  const handleDelete = (i) => {
    if (val.length > 0) {
      // check if array is not empty
      const newArray = [...val]; // create a copy of the original array
      newArray.pop(); // remove the last element from the new array
      if (newArray.length === 0) {
        // check if the new array is empty
        setVal([]); // set the state to a new array with a default value
      } else {
        setVal(newArray); // update the state with the new array
      }
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
        />
      </BoxContent>
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
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => setContent(newContent)}
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
          />
        </Box>
      </BoxContent>
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
          Text
        </Button>
        <Button variant="contained" onClick={() => handleAdd("code")}>
          Code
        </Button>
      </BoxContent>

      {val.map((data) => {
        return (
          <BoxContent
            key={data.id}
            sx={{
              margin: {
                lg: "10px 200px 0px 200px",
                xs: "10px 10px 0px 10px",
              },
            }}
          >
            {Suit(data.type, data.id)}
          </BoxContent>
        );
      })}

      <BoxContent
        sx={{
          margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
        }}
      >
        <Typography variant="h6">Tags</Typography>
        <TextField variant="outlined" fullWidth placeholder="Tags" />
      </BoxContent>
      <BoxContent
        sx={{
          margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Button variant="contained" onClick={handleCre}>
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
