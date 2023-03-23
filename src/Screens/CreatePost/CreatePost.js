import { Box, Typography } from "@mui/material";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

function CreatePost() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const parse = require("html-react-parser");
  return (
    <Box>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => setContent(newContent)}
      />
      <Typography variant="body1">{parse(content)}</Typography>
    </Box>
  );
}

export default CreatePost;
