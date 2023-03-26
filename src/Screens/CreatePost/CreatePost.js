import { Box, Typography } from "@mui/material";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { BoxHome } from "../../Assert/Style";
import Header from "../../Component/Header/Header";
import { BoxContent, BoxNav } from "../CreatePost/Style";

function CreatePost() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const parse = require("html-react-parser");
  return (
    <BoxHome sx={{ height: "100vh" }}>
      <Header />
      <BoxNav>
        <Typography variant="h3">ASK A QUESTION</Typography>
      </BoxNav>
      <BoxContent
        sx={{
          margin: { lg: "10px 100px 0px 100px", xs: "10px 10px 0px 10px" },
        }}
      >
        <Box>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => setContent(newContent)}
          />
        </Box>
      </BoxContent>
      {/* <Typography variant="body1">{content}</Typography>
      <Typography variant="body1">{parse(content)}</Typography> */}
    </BoxHome>
  );
}

export default CreatePost;
